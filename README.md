# 🏦 GitHub 银行 AI Ops 开源项目调研平台

> 系统性梳理 GitHub 上与银行/金融行业 AI Ops 相关的开源项目，提供一站式的选型参考和技术决策支持。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Projects](https://img.shields.io/badge/projects-14-green.svg)
![Data](https://img.shields.io/badge/data-2026--08-orange.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 📖 项目简介

银行 AI Ops 领域信息分散、缺乏系统性梳理。本平台通过聚合 GitHub 上的优质开源项目，提供**项目对比、技术分析、选型建议和趋势洞察**，帮助银行运维团队快速了解业界开源生态，降低技术调研成本。

### 🎯 核心价值

- 🔍 **一站式调研**：聚合 14 个优质开源项目，覆盖 5 大技术分类
- 📊 **多维度对比**：13 个维度横向对比，快速评估选型
- 💡 **场景化建议**：针对银行安全合规、国产化等需求给出推荐组合
- 🚀 **趋势洞察**：eBPF、AI Agent、国产生态等前沿方向分析

---

## 🖥️ 页面展示

本项目包含 4 个核心页面，均可通过本地 HTTP 服务器访问。

### 📋 1. 项目展示首页 (`index.html`)

> 14 个银行 AI Ops 开源项目的卡片化展示，支持分类筛选、排序和搜索

```
┌─────────────────────────────────────────────────────────────┐
│  🏦 GitHub 银行 AI Ops 开源项目精选                            │
│  14 个项目 · 累计 18 万+ Stars · 6 大分类                       │
├─────────────────────────────────────────────────────────────┤
│  [全部] [可观测性] [告警管理] [日志分析] [AI智能体] [流程编排]    │
│  🔍 搜索项目...                    排序: ⭐ Stars ▾            │
├──────────────────┬──────────────────┬───────────────────────┤
│  Keep            │  SREWorks        │  Coroot               │
│  ⭐ 11,000       │  ⭐ 2,000        │  ⭐ 7,000             │
│  MIT · Python    │  Apache-2.0·Java │  Apache-2.0·Go        │
│  [告警] [AI智能体] │  [AI] [编排] [观测]│  [可观测性]           │
│  AI告警降噪...    │  云原生智能运维..  │  eBPF零插桩观测...     │
│  ●●●○○ 成熟度3   │  ●●●●○ 成熟度4   │  ●●●○○ 成熟度3        │
├──────────────────┼──────────────────┼───────────────────────┤
│  Nightingale     │  SigNoz          │  SkyWalking           │
│  ⭐ 13,000       │  ⭐ 25,000       │  ⭐ 24,000            │
│  ...             │  ...             │  ...                  │
└──────────────────┴──────────────────┴───────────────────────┘
```

**功能特性：**
- ✅ 6 大分类标签筛选（可观测性、告警管理、日志分析、AI 智能体、流程编排、专项工具）
- ✅ 按 Stars / 成熟度排序
- ✅ 实时搜索（项目名、技术栈、关键词）
- ✅ 点击卡片展开完整详情（银行应用价值、部署方式、安全特性等）

---

### 📊 2. 多维度对比表 (`compare.html`)

> 选择多个项目进行 13 维度横向对比，支持颜色编码和排序

```
┌────────────┬─────────┬──────────┬──────────┬──────────┬────────────┐
│ 项目        │ Stars   │ 许可证    │ 主语言    │ 成熟度   │ 银行场景    │
├────────────┼─────────┼──────────┼──────────┼──────────┼────────────┤
│ Keep       │ 11,000  │ MIT      │ Python   │ ●●●○○ 🟡 │ 告警降噪    │
│ SigNoz     │ 25,000  │ Apache   │ TS/Go    │ ●●●●○ 🟢 │ 全栈观测    │
│ SkyWalking │ 24,000  │ Apache   │ Java     │ ●●●●● 🟢 │ 链路追踪    │
│ Nightingale│ 13,000  │ Apache   │ Go       │ ●●●●● 🟢 │ 国产监控    │
│ ...        │ ...     │ ...      │ ...      │ ...      │ ...        │
└────────────┴─────────┴──────────┴──────────┴──────────┴────────────┘
```

**对比维度（13 项）：**
| # | 维度 | 说明 |
|---|------|------|
| 1 | Stars | GitHub 星标数 |
| 2 | 许可证 | MIT / Apache-2.0 / GPL-3.0 等 |
| 3 | 主语言 | 核心技术栈 |
| 4 | 成熟度 | 1-5 评分（绿/黄/灰颜色编码） |
| 5 | 可观测性覆盖 | 监控/追踪/日志能力 |
| 6 | 告警管理 | 告警关联/降噪能力 |
| 7 | AI 能力 | AI Agent / LLM 集成 |
| 8 | 部署方式 | 云原生/VM/物理机/离线 |
| 9 | 安全特性 | RBAC/审计/加密等 |
| 10 | 中文支持 | 是否支持中文界面 |
| 11 | 离线部署 | 是否支持内网离线部署 |
| 12 | 银行应用价值 | 金融场景适用性 |
| 13 | 社区活跃度 | Stars 趋势参考 |

---

### 💡 3. 选型建议 (`recommendations.html`)

> 按银行核心技术分层给出选型建议，含实施路线图和风险评估

```
┌─────────────────────────────────────────────────────────────┐
│  📋 选型原则                                                  │
│  合规优先 · 安全可控 · 稳定可靠 · 开放生态 · 中文友好 · 成本可控 │
├─────────────────────────────────────────────────────────────┤
│  🔧 基础可观测性层                                            │
│  ⭐ 首选: Coroot + SigNoz (eBPF + OpenTelemetry)             │
│  🔄 备选: 夜莺 Nightingale (国产化场景)                        │
│  🎯 专项: SkyWalking (Java 微服务架构)                        │
├─────────────────────────────────────────────────────────────┤
│  🔔 告警管理层                                                │
│  ⭐ 首选: Keep (AI 告警关联，110+ 集成)                        │
├─────────────────────────────────────────────────────────────┤
│  🤖 AI 智能体层                                               │
│  ⭐ 首选: HolmesGPT (CNCF 沙箱，只读安全设计)                  │
│  🔄 备选: Microsoft AIOpsLab (自定义智能体框架)               │
├─────────────────────────────────────────────────────────────┤
│  📝 金融流程编排层                                             │
│  ⭐ 首选: Fluxnova (FINOS 治理，BPMN/DMN)                     │
├─────────────────────────────────────────────────────────────┤
│  📊 日志分析专项                                               │
│  ⭐ 首选: Loglizer + Drain3 (异常检测 + 模板挖掘)              │
└─────────────────────────────────────────────────────────────┘

📅 实施路线图
  Phase 1 (1-2月)  ──→  Phase 2 (2-4月)  ──→  Phase 3 (4-6月)
  基础观测建设          告警自动化            AI 智能体引入
```

---

### 🚀 4. 技术趋势洞察 (`trends.html`)

> 5 大技术趋势深度分析，含 2026-2028 路线图

```
📈 五大技术趋势

┌─ 趋势一：eBPF 内核级可观测性革命 ─────────────────────────┐
│  内核级隔离 · 零代码修改 · 满足 PCI-DSS 合规               │
│  代表项目: Coroot · SkyWalking eBPF · Netdata             │
│  📊 某银行使用后 3 个月云成本降低 27%                       │
└──────────────────────────────────────────────────────────┘

┌─ 趋势二：AI Agent 驱动的自主运维 ─────────────────────────┐
│  被动告警 → 主动自愈 · 只读安全 · Human-in-the-Loop       │
│  代表项目: HolmesGPT · AIOpsLab · Keep                    │
└──────────────────────────────────────────────────────────┘

┌─ 趋势三：开源标准治理与避免厂商锁定 ──────────────────────┐
│  FINOS · CNCF 沙箱 · OpenTelemetry                        │
│  代表项目: Fluxnova · SigNoz                              │
└──────────────────────────────────────────────────────────┘

┌─ 趋势四：国产开源生态崛起 ────────────────────────────────┐
│  信创驱动 · 自主可控 · 中文友好                            │
│  代表项目: 夜莺 (1000+ 企业部署) · SREWorks                │
└──────────────────────────────────────────────────────────┘

┌─ 趋势五：成本优化成为核心驱动力 ──────────────────────────┐
│  存储成本 · 云资源优化 · ROI 分析                          │
│  代表项目: OpenObserve (140x 存储成本优势)                 │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 模式一：纯静态模式（简单，仅查看）

```bash
# 1. 克隆仓库
git clone https://github.com/Mq-Tse/bank-aiops-survey.git
cd bank-aiops-survey

# 2. 启动本地 HTTP 服务器（任选其一）
python -m http.server 8000
# 或
npx serve .

# 3. 在浏览器中访问（静态数据，无实时 Stars）
# 首页:        http://localhost:8000/index.html
# 对比表:      http://localhost:8000/compare.html
```

### 模式二：动态模式（推荐，实时 Stars）⭐

```bash
# 1. 安装依赖
npm install

# 2. 启动后端服务（同时提供静态文件和 API）
node server.js

# 3. 在浏览器中访问
# 首页:        http://localhost:3000/index.html
# 对比表:      http://localhost:3000/compare.html
# API 状态:    http://localhost:3000/api/health
```

### （可选）配置 GitHub Token 提高 Rate Limit

```bash
# 1. 复制环境变量模板
cp .env.example .env

# 2. 编辑 .env 文件，填入你的 GitHub Token
#    获取方式: https://github.com/settings/tokens
#    需要权限: public_repo

# 3. 重启服务
node server.js
```

> 💡 **提示**：动态模式会自动从 GitHub API 获取实时 Stars 数据，默认缓存 10 分钟。

---

## 📦 项目结构

```
bank-aiops-survey/
├── index.html                    # 项目展示首页
├── compare.html                  # 多维度对比表
├── recommendations.html          # 选型建议
├── trends.html                   # 技术趋势洞察
├── server.js                     # 后端 API 代理服务（支持动态数据）
├── package.json                  # Node.js 依赖配置
├── .env.example                  # 环境变量模板（GitHub Token）
├── js/
│   └── dynamic-data.js           # 动态数据加载模块
├── data/
│   └── bank-aiops-projects.json  # 14 个项目结构化数据源
├── .gitignore
└── README.md
```

---

## 📋 调研项目清单

共收录 **14 个** GitHub 开源项目，覆盖 5 大技术分类：

| 项目 | Stars | 许可证 | 技术栈 | 分类 | 成熟度 |
|------|-------|--------|--------|------|--------|
| [Netdata](https://github.com/netdata/netdata) | 80,000 | GPL-3.0 | C/Python | 可观测性 | ⭐⭐⭐⭐⭐ |
| [SigNoz](https://github.com/SigNoz/signoz) | 25,000 | Apache-2.0 | TS/Go | 可观测性 | ⭐⭐⭐⭐ |
| [SkyWalking](https://github.com/apache/skywalking) | 24,000 | Apache-2.0 | Java | 可观测性 | ⭐⭐⭐⭐⭐ |
| [OpenObserve](https://github.com/openobserve/openobserve) | 17,000 | AGPL-3.0 | Rust | 可观测性/日志 | ⭐⭐⭐⭐ |
| [Nightingale](https://github.com/ccfos/nightingale) | 13,000 | Apache-2.0 | Go | 可观测性/告警 | ⭐⭐⭐⭐⭐ |
| [Keep](https://github.com/keephq/keep) | 11,000 | MIT | Python | 告警/AI | ⭐⭐⭐ |
| [Coroot](https://github.com/coroot/coroot) | 7,000 | Apache-2.0 | Go | 可观测性 | ⭐⭐⭐ |
| [HolmesGPT](https://github.com/HolmesGPT/holmesgpt) | 2,500 | Apache-2.0 | Python | AI 智能体 | ⭐⭐⭐ |
| [SREWorks](https://github.com/alibaba/SREWorks) | 2,000 | Apache-2.0 | Java | AI/编排/观测 | ⭐⭐⭐⭐ |
| [Loglizer](https://github.com/logpai/loglizer) | 1,400 | MIT | Python | 日志分析 | ⭐⭐⭐ |
| [AIOpsLab](https://github.com/microsoft/AIOpsLab) | 800 | MIT | Python | AI/日志 | ⭐⭐⭐ |
| [Drain3](https://github.com/logpai/Drain3) | 700 | MIT | Python | 日志分析 | ⭐⭐⭐ |
| [financial-ai-skills](https://github.com/yuzhaopeng-up/financial-ai-skills) | 200 | MIT | Python | AI/专项 | ⭐⭐ |
| [Fluxnova](https://github.com/finos/fluxnova) | 100 | Apache-2.0 | TS/Python | 流程编排 | ⭐⭐ |

---

## 🛠️ 技术栈

- **前端**：原生 HTML5 + CSS3 + JavaScript（零依赖，自包含单文件）
- **后端**：Node.js + Express（API 代理，支持动态数据）
- **数据**：JSON 结构化数据源 + GitHub REST API 动态获取
- **字体**：PingFang SC / Hiragino Sans GB / Microsoft YaHei
- **设计**：响应式布局，专业银行蓝/石板灰配色方案

### 数据模式

| 模式 | 说明 | 优点 |
|------|------|------|
| **静态模式** | 使用 JSON 文件中的固定数据 | 快速、稳定、可离线 |
| **动态模式** | 通过 GitHub API 实时获取 Stars 等数据 | 数据新鲜、自动更新 |
| **混合模式** ⭐ | 核心数据用 JSON，Stars 动态获取 | 平衡体验和实时性 |

---

## 📊 数据说明

- **静态数据采集时点**：2026 年 8 月
- **动态数据来源**：GitHub REST API（实时获取 Stars、Forks 等）
- **缓存策略**：动态数据默认缓存 10 分钟
- **Rate Limit**：未认证 60 次/小时，配置 Token 后 5000 次/小时
- **成熟度评分**：基于社区活跃度、版本稳定性、文档完善度综合评估（1-5 分）

---

## 🤝 适用场景

- 🏦 **银行 SRE 团队**：选型参考，了解业界开源生态
- 🏗️ **运维架构师**：技术决策支持，对比评估方案
- 👔 **技术管理者**：趋势洞察，制定长期技术规划
- 🔧 **DevOps 工程师**：发现新工具，提升运维效率
- 📚 **AI Ops 研究者**：学术研究参考，了解产业实践

---

## ⚠️ 免责声明

- 本平台静态数据为调研时点快照，动态数据实时从 GitHub API 获取
- 选型建议仅供参考，实际决策需结合具体业务场景
- 开源项目的生产使用需进行充分的安全评估和合规审查
- 项目成熟度评分为主观评估，仅供参考
- 动态模式依赖 GitHub API，如遇限流请配置 Token 或等待缓存过期

---

## 📄 License

MIT License - 本项目仅供学习和参考使用

---

## 🔗 相关链接

- [FINOS 基金会](https://finos.org/)
- [CNCF 云原生计算基金会](https://www.cncf.io/)
- [OpenTelemetry](https://opentelemetry.io/)
- [eBPF 介绍](https://ebpf.io/)

---

<p align="center">
  📅 数据截至 2026 年 8 月 · 🏦 银行 AI Ops 开源项目调研平台
</p>
```
