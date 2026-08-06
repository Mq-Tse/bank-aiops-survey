const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub Token 用于提高 Rate Limit（可选）
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// 缓存配置
const CACHE_TTL = 10 * 60 * 1000; // 10 分钟缓存
const AUTO_SYNC_INTERVAL = 60 * 60 * 1000; // 1 小时自动同步
let starsCache = {};

// 同步状态
let syncStatus = {
  lastSync: null,
  nextSync: null,
  syncing: false,
  totalRepos: 0,
  successCount: 0,
  failCount: 0
};

app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname)));

/**
 * 构建 GitHub API 请求 URL
 */
function buildGitHubUrl(repoFullName) {
  return `https://api.github.com/repos/${repoFullName}`;
}

/**
 * 请求 GitHub API 并获取 Stars
 */
async function fetchRepoStars(repoFullName) {
  const url = buildGitHubUrl(repoFullName);

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Bank-AIOps-Survey'
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });

    if (response.status === 429) {
      console.warn(`Rate limit exceeded for ${repoFullName}`);
      return null;
    }

    if (!response.ok) {
      console.warn(`Failed to fetch ${repoFullName}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      updatedAt: data.updated_at,
      license: data.license ? data.license.spdx_id : null,
      description: data.description
    };
  } catch (error) {
    console.error(`Error fetching ${repoFullName}:`, error.message);
    return null;
  }
}

/**
 * 从缓存获取或获取新数据
 */
async function getStarsWithCache(repoFullName) {
  const now = Date.now();
  const cached = starsCache[repoFullName];

  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchRepoStars(repoFullName);
  if (data) {
    starsCache[repoFullName] = {
      data,
      timestamp: now
    };
  }

  return data;
}

/**
 * POST /api/stars - 批量获取项目 Stars
 * 请求体: { repos: ["owner/repo", ...] }
 * 响应: { results: { "owner/repo": { stars, forks, ... } } }
 */
app.post('/api/stars', async (req, res) => {
  try {
    const { repos } = req.body;

    if (!Array.isArray(repos) || repos.length === 0) {
      return res.status(400).json({ error: 'repos must be a non-empty array' });
    }

    // 限制批量请求数量
    if (repos.length > 20) {
      return res.status(400).json({ error: 'Maximum 20 repos per request' });
    }

    // 并行获取所有项目数据
    const results = {};
    const promises = repos.map(async (repo) => {
      const data = await getStarsWithCache(repo);
      results[repo] = data || { stars: null, error: 'Failed to fetch' };
    });

    await Promise.all(promises);

    res.json({
      results,
      fetchedAt: new Date().toISOString(),
      cached: Object.keys(starsCache).length > 0
    });
  } catch (error) {
    console.error('Error in /api/stars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/health - 健康检查
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    cacheSize: Object.keys(starsCache).length,
    authenticated: !!GITHUB_TOKEN,
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/cache - 查看缓存状态
 */
app.get('/api/cache', (req, res) => {
  const now = Date.now();
  const cacheInfo = {};

  for (const [repo, entry] of Object.entries(starsCache)) {
    cacheInfo[repo] = {
      stars: entry.data.stars,
      cachedAt: new Date(entry.timestamp).toISOString(),
      expiresIn: Math.max(0, CACHE_TTL - (now - entry.timestamp))
    };
  }

  res.json({
    totalCached: Object.keys(starsCache).length,
    cacheTTL: CACHE_TTL,
    entries: cacheInfo
  });
});

/**
 * POST /api/refresh - 强制刷新缓存
 */
app.post('/api/refresh', async (req, res) => {
  try {
    const { repos } = req.body;

    if (!Array.isArray(repos) || repos.length === 0) {
      // 刷新全部缓存
      starsCache = {};
      return res.json({ message: 'All cache cleared' });
    }

    // 清除指定缓存
    repos.forEach(repo => delete starsCache[repo]);
    res.json({ message: `Cache cleared for ${repos.length} repos` });
  } catch (error) {
    console.error('Error in /api/refresh:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * 从数据文件中获取所有仓库列表
 */
function getAllRepos() {
  try {
    const dataPath = path.join(__dirname, 'data', 'bank-aiops-projects.json');
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);
    const repos = [];

    if (data.projects && Array.isArray(data.projects)) {
      for (const project of data.projects) {
        if (project.url) {
          const match = project.url.match(/github\.com\/([^\/]+\/[^\/]+)/);
          if (match) {
            repos.push(match[1]);
          }
        }
      }
    }

    return repos;
  } catch (error) {
    console.error('Error reading data file:', error.message);
    return [];
  }
}

/**
 * 全量同步：获取所有项目的最新数据
 */
async function syncAllRepos() {
  if (syncStatus.syncing) {
    console.log('⚠️ Sync already in progress, skipping...');
    return;
  }

  syncStatus.syncing = true;
  console.log(`\n🔄 [${new Date().toLocaleString('zh-CN')}] Starting full sync...`);

  try {
    const repos = getAllRepos();
    syncStatus.totalRepos = repos.length;
    syncStatus.successCount = 0;
    syncStatus.failCount = 0;

    console.log(`📊 Found ${repos.length} repos to sync`);

    // 并发控制：每次最多请求 5 个
    const CONCURRENCY = 5;
    for (let i = 0; i < repos.length; i += CONCURRENCY) {
      const batch = repos.slice(i, i + CONCURRENCY);
      const results = await Promise.allSettled(
        batch.map(repo => fetchAndCacheRepo(repo))
      );

      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          syncStatus.successCount++;
        } else {
          syncStatus.failCount++;
        }
      });

      // 批次间隔，避免触发限流
      if (i + CONCURRENCY < repos.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    syncStatus.lastSync = new Date().toISOString();
    syncStatus.nextSync = new Date(Date.now() + AUTO_SYNC_INTERVAL).toISOString();

    console.log(`✅ Sync completed! Success: ${syncStatus.successCount}, Failed: ${syncStatus.failCount}`);
    console.log(`📅 Next sync: ${syncStatus.nextSync}\n`);
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  } finally {
    syncStatus.syncing = false;
  }
}

/**
 * 获取单个仓库数据并缓存
 */
async function fetchAndCacheRepo(repoFullName) {
  const data = await fetchRepoStars(repoFullName);
  if (data) {
    starsCache[repoFullName] = {
      data,
      timestamp: Date.now()
    };
    return true;
  }
  return false;
}

/**
 * POST /api/sync - 手动触发全量同步
 */
app.post('/api/sync', async (req, res) => {
  try {
    if (syncStatus.syncing) {
      return res.json({ 
        status: 'already_syncing',
        syncStatus 
      });
    }

    // 后台执行同步
    syncAllRepos();

    res.json({ 
      status: 'sync_started',
      message: 'Full sync started in background',
      reposCount: getAllRepos().length
    });
  } catch (error) {
    console.error('Error in /api/sync:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/sync-status - 查看同步状态
 */
app.get('/api/sync-status', (req, res) => {
  res.json({
    ...syncStatus,
    cacheSize: Object.keys(starsCache).length,
    autoSyncInterval: AUTO_SYNC_INTERVAL / 60000 // 分钟
  });
});

/**
 * 启动服务器
 */
app.listen(PORT, async () => {
  console.log(`
╔══════════════════════════════════════════════╗
║  🏦 银行 AI Ops 调研平台 - API 代理服务      ║
╠══════════════════════════════════════════════╣
║  本地访问: http://localhost:${PORT}              ║
║  API 文档: http://localhost:${PORT}/api/health    ║
║  缓存时间: ${CACHE_TTL / 60000} 分钟                           ║
║  自动同步: ${AUTO_SYNC_INTERVAL / 3600000} 小时                         ║
║  认证状态: ${GITHUB_TOKEN ? '✅ 已配置 Token' : '⚠️  未配置 Token (60次/小时限流)'}       ║
╚══════════════════════════════════════════════╝
  `);

  // 启动时立即执行首次同步
  console.log('🚀 Running initial sync on startup...');
  await syncAllRepos();

  // 设置定时任务：每小时同步一次
  setInterval(() => {
    syncAllRepos();
  }, AUTO_SYNC_INTERVAL);

  console.log(`⏰ Auto-sync scheduled every ${AUTO_SYNC_INTERVAL / 3600000} hour(s)`);
  console.log(`📅 Next sync at: ${syncStatus.nextSync || 'N/A'}`);
});
