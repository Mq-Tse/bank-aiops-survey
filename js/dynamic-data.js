/**
 * GitHub 动态数据加载模块
 * 提供实时获取 Stars、Forks 等数据的功能
 * 支持降级为静态数据（当 API 不可用时）
 */

const DynamicDataLoader = {
  // 配置
  config: {
    apiBase: '/api',
    enabled: true,
    loadingText: '加载中...',
    errorText: '⚠️ 动态数据加载失败，显示静态数据',
    successText: '✅ 数据已更新'
  },

  // 内部状态
  _cache: new Map(),
  _lastUpdate: null,
  _isLoading: false,

  /**
   * 初始化配置
   */
  init(options = {}) {
    Object.assign(this.config, options);
  },

  /**
   * 从项目数据中提取 GitHub repo 名称
   */
  extractRepoName(url) {
    // https://github.com/owner/repo -> owner/repo
    const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
    return match ? match[1] : null;
  },

  /**
   * 批量获取项目的实时数据
   */
  async fetchStars(repos) {
    if (!this.config.enabled) {
      return null;
    }

    try {
      const response = await fetch(`${this.config.apiBase}/stars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repos })
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      this._lastUpdate = data.fetchedAt;
      return data.results;
    } catch (error) {
      console.warn('Dynamic data fetch failed:', error.message);
      return null;
    }
  },

  /**
   * 获取 API 健康状态
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.config.apiBase}/health`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // API 不可用
    }
    return null;
  },

  /**
   * 更新页面上的 Stars 显示
   */
  updateStarsDisplay(projects, results, options = {}) {
    const { showUpdateTime = true, showRefreshBadge = true } = options;

    if (!results) {
      return; // 使用静态数据
    }

    let updatedCount = 0;

    projects.forEach(project => {
      const repoName = this.extractRepoName(project.url);
      const dynamicData = results[repoName];

      if (dynamicData && dynamicData.stars) {
        updatedCount++;
        
        // 更新 Stars 显示
        const starsElement = document.querySelector(`[data-project="${project.name}"] .stars-count`);
        if (starsElement) {
          const oldStars = project.stars;
          const newStars = dynamicData.stars;
          starsElement.textContent = this.formatNumber(newStars);
          starsElement.classList.add('updated');
          
          // 添加 tooltip 显示变化
          if (oldStars !== newStars) {
            const diff = newStars - oldStars;
            starsElement.title = `原: ${oldStars.toLocaleString()} → 新: ${newStars.toLocaleString()} (${diff >= 0 ? '+' : ''}${diff})`;
          }
        }
      }
    });

    // 更新最后更新时间显示
    if (showUpdateTime && this._lastUpdate) {
      this.updateTimestampDisplay();
    }

    // 显示更新徽章
    if (showRefreshBadge && updatedCount > 0) {
      this.showRefreshBadge(updatedCount);
    }
  },

  /**
   * 格式化数字显示
   */
  formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  },

  /**
   * 显示/更新最后更新时间
   */
  updateTimestampDisplay() {
    let timestampElement = document.getElementById('data-update-time');
    
    if (!timestampElement) {
      // 创建时间戳元素
      timestampElement = document.createElement('span');
      timestampElement.id = 'data-update-time';
      timestampElement.className = 'data-timestamp';
      
      // 插入到合适位置
      const header = document.querySelector('.header-info, .page-header, main header');
      if (header) {
        header.appendChild(timestampElement);
      }
    }

    const time = new Date(this._lastUpdate);
    timestampElement.innerHTML = `
      <span class="dynamic-badge" title="数据来源：GitHub API 实时获取">
        🔴 实时数据 · 更新于 ${time.toLocaleTimeString('zh-CN')}
      </span>
    `;
  },

  /**
   * 显示刷新成功徽章
   */
  showRefreshBadge(count) {
    const badge = document.createElement('div');
    badge.className = 'refresh-success-badge';
    badge.innerHTML = `
      <span class="badge-icon">✨</span>
      <span>已更新 ${count} 个项目的实时数据</span>
    `;
    
    badge.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(badge);

    // 3 秒后自动消失
    setTimeout(() => {
      badge.style.transition = 'opacity 0.3s';
      badge.style.opacity = '0';
      setTimeout(() => badge.remove(), 300);
    }, 3000);
  },

  /**
   * 显示加载状态
   */
  showLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'loading-indicator';
    indicator.innerHTML = `
      <div class="spinner"></div>
      <span>正在获取实时数据...</span>
    `;
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.95);
      padding: 10px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    `;
    
    // 添加 spinner 样式
    const style = document.createElement('style');
    style.textContent = `
      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(indicator);
    return indicator;
  },

  /**
   * 隐藏加载状态
   */
  hideLoadingIndicator() {
    const indicator = document.querySelector('.loading-indicator');
    if (indicator) {
      indicator.style.transition = 'opacity 0.3s';
      indicator.style.opacity = '0';
      setTimeout(() => indicator.remove(), 300);
    }
  },

  /**
   * 主入口：加载并更新动态数据
   */
  async loadDynamicData(projects, options = {}) {
    if (this._isLoading) {
      return;
    }

    this._isLoading = true;
    const loadingIndicator = this.showLoadingIndicator();

    try {
      // 提取所有 repo 名称
      const repos = projects
        .map(p => this.extractRepoName(p.url))
        .filter(Boolean);

      if (repos.length === 0) {
        return;
      }

      // 批量获取
      const results = await this.fetchStars(repos);

      // 更新页面
      this.updateStarsDisplay(projects, results, options);

      if (!results) {
        console.info('Using static data (API unavailable)');
      }
    } catch (error) {
      console.warn('Dynamic data loading failed:', error.message);
    } finally {
      this._isLoading = false;
      this.hideLoadingIndicator();
    }
  }
};

// 导出到全局
window.DynamicDataLoader = DynamicDataLoader;
