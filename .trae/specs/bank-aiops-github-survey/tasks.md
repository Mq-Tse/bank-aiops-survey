# GitHub 银行 AI Ops 开源项目调研平台 - 实施计划

## [ ] Task 1: 构建项目数据模型与基础数据源
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 设计项目数据的 JSON 结构，包含：项目名称、GitHub URL、Stars、许可证、技术栈、核心功能、分类标签、银行应用价值、成熟度评分、部署方式、安全特性等字段
  - 将调研发现的 12+ 个项目整理为结构化的 JSON 数据源文件
  - 覆盖的分类：可观测性平台、告警管理、日志分析、AI 智能体、流程编排、专项工具
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-6
- **Test Requirements**:
  - `programmatic` TR-1.1: 数据源 JSON 包含至少 12 个项目条目
  - `programmatic` TR-1.2: 每个项目条目包含所有必要字段（name, url, stars, license, stack, features, category, bankValue, maturity）
  - `programmatic` TR-1.3: 每个项目的 GitHub URL 可访问且与项目名匹配
  - `programmatic` TR-1.4: Stars 数在合理范围内（最小 > 100，最大 < 100000）
- **Notes**: 数据快照时点为 2026 年 8 月

## [ ] Task 2: 构建项目展示与分类筛选界面
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 创建项目卡片列表视图，每个卡片展示：项目 Logo/图标、名称、Stars、许可证、技术栈标签、核心功能摘要
  - 实现功能分类筛选器（可观测性、告警管理、日志分析、AI 智能体、流程编排、专项工具）
  - 实现按 Stars 排序、按成熟度筛选
  - 支持项目搜索（按名称、技术栈、关键词）
  - 添加项目详情展开/弹窗，展示完整的项目信息和银行应用价值
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: 所有项目在列表中可见，无遗漏
  - `programmatic` TR-2.2: 分类筛选器至少包含 6 个分类选项，筛选结果数量与数据一致
  - `human-judgement` TR-2.3: 项目卡片布局清晰，关键信息一目了然
  - `human-judgement` TR-2.4: 分类逻辑合理，每个项目的分类符合行业认知
- **Notes**: 响应式设计，支持桌面和移动端

## [ ] Task 3: 构建多维度项目对比表
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 创建可交互的对比表格视图
  - 对比维度至少包括：Stars、许可证、主语言、功能覆盖（监控/追踪/日志/告警/RCA）、银行适用场景、成熟度评分、部署方式（云原生/VM/物理机）、安全特性、中文支持、离线部署、社区活跃度
  - 支持选择多个项目进行横向对比
  - 表格支持按任意列排序
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-3.1: 对比表格包含至少 10 个对比维度
  - `programmatic` TR-3.2: 每个对比维度的数据与数据源一致
  - `human-judgement` TR-3.3: 对比表格结构清晰，支持快速横向评估
- **Notes**: 考虑使用颜色标记（如绿色表示成熟度高，黄色表示中等）

## [ ] Task 4: 编写银行 AI Ops 选型建议章节
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 按银行核心技术分层给出选型建议：
    1. 基础可观测性层（推荐组合）
    2. 告警管理层（推荐 + 备选）
    3. AI 智能体层（推荐 + 备选）
    4. 金融流程编排层
    5. 日志分析专项工具
  - 每个推荐组合说明：选型理由、适用场景、与银行现有系统的集成方式、风险评估
  - 补充国内银行特殊考虑：国产化合规、中文支持、离线部署
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-4.1: 每个场景至少给出 1 个推荐和理由
  - `human-judgement` TR-4.2: 选型建议覆盖所有核心技术分层
  - `human-judgement` TR-4.3: 推荐理由具体，结合银行行业特点（安全、合规、稳定性）
  - `programmatic` TR-4.4: 至少包含 5 种选型场景的分析
- **Notes**: 选型建议需标注数据有效期（2026 年 8 月）

## [ ] Task 5: 编写技术趋势分析章节
- **Priority**: medium
- **Depends On**: Task 1
- **Description**: 
  - 分析至少 3 个技术趋势方向：
    1. eBPF 内核级可观测性（Coroot、SkyWalking）
    2. AI Agent 驱动的自动化运维（HolmesGPT、AIOpsLab）
    3. 开源标准治理与避免厂商锁定（FINOS Fluxnova、CNCF 沙箱项目）
  - 补充其他趋势：成本优化驱动、国产开源崛起、云原生架构适配
  - 每个趋势方向需有具体项目支撑和银行落地价值说明
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-5.1: 趋势分析覆盖至少 3 个方向
  - `human-judgement` TR-5.2: 每个趋势方向有具体项目案例支撑
  - `human-judgement` TR-5.3: 趋势分析对银行技术规划有实际参考价值
- **Notes**: 可引用行业报告和公开案例

## [ ] Task 6: 信息准确性校验与整体优化
- **Priority**: medium
- **Depends On**: Task 2, Task 3, Task 4, Task 5
- **Description**: 
  - 核对所有项目的 GitHub 链接、Stars 数、许可证、技术栈信息
  - 检查分类标签的一致性和合理性
  - 验证选型建议中的项目引用是否存在且信息准确
  - 优化页面交互体验和视觉呈现
  - 确保中英文术语标注正确
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `programmatic` TR-6.1: 所有项目的 GitHub 链接可访问
  - `programmatic` TR-6.2: 项目数量 ≥ 12
  - `human-judgement` TR-6.3: 整体页面结构清晰，信息层次分明
  - `human-judgement` TR-6.4: 中英文术语使用一致
- **Notes**: 最终验证环节，确保所有信息准确无误
