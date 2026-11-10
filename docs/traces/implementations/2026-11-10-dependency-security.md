---
draft: true
---

# Implementation Trace: 依赖安全更新

Date: 2026-11-10
Source: 用户要求审查 Docusaurus 升级成本、保持 React 版本，修复实际使用路径上的高危依赖问题并验证构建和关键功能。
Language: 中文

## Entries

### 1. 统一使用 Docusaurus 3.10.2

Type: unresolved-implementation-decision

Context:
根项目使用 3.8.1，OpenRPC 插件部分类型包使用 3.6.1。用户要求先审查框架升级成本。

Decision:
统一直接依赖为 3.10.2，保留现有配置与主题行为，不开启 v4 future flags。React 和 React DOM 固定为锁文件中现有的 18.3.1。

Reason:
3.10.2 的 peerDependencies 支持 React 18，Node >=20 与现有 Node >=22 要求兼容。官方 3.9、3.10 发布说明未要求当前配置做破坏性迁移；项目的主题覆盖使用包装方式。升级收益包括统一框架依赖、避免旧 webpack-dev-server 分支，以及采用上游维护的 front-matter 依赖。升级成本主要在三语言构建、搜索、图片、Mermaid 与 OpenRPC 的回归验证。

References:
- https://docusaurus.io/blog/releases/3.9
- https://docusaurus.io/blog/releases/3.10
- https://docusaurus.io/changelog/3.10.2

Follow-up:
以安装、完整构建及关键页面检查验证成本判断；高成本或跨大版本变化单独评估。

### 2. 保留信任检查并限制候选版本

Type: tradeoff

Context:
解析更新时，webpack-dev-middleware 7.4.6 和 undici-types 6.21.0 被现有 trustPolicy 拒绝。后者来自 Node 22 类型包更新，包含传递依赖路径。

Decision:
限定 webpack-dev-middleware 7.x 为 7.4.5，并保留现有 @types/node 22.10.2。DocSearch 仅更新到同一大版本 4.7.1。

Reason:
7.4.5 已修复已知 publicPath 路径穿越；保留现有类型包不影响 Node 22 运行时。避免为升级关闭信任检查或增加未验证的发布来源例外。

Follow-up:
上游发布满足信任策略的兼容版本后复查这些限定。

### 3. 单独修复图片处理链并删除未使用的路由直接依赖

Type: unresolved-implementation-decision

Context:
Docusaurus 3.10.2 的两个图片 loader 仍请求 sharp ^0.32.3，旧版本存在原生图片库漏洞。根项目另声明 react-router-dom 6，但全仓库检索未发现使用。

Decision:
仅在两个 Docusaurus 图片包下覆盖 sharp 为 0.35.5；移除未使用的根项目 react-router-dom 声明，框架自己的 React Router 5 由框架管理。

Reason:
检查 Sharp 0.33–0.35 迁移说明和 loader 调用后，使用的 metadata、resize、clone、jpeg、toBuffer API 均保留，Node 要求兼容。图片能力保持不变，以实际构建和图片读取验证。移除未使用依赖避免保留无业务消费者的额外路由版本。

References:
- https://sharp.pixelplumbing.com/changelog/v0.35.0/
- https://sharp.pixelplumbing.com/changelog/v0.35.5/

Follow-up:
验证图片构建及完整站点；上游兼容范围更新后移除 Sharp 覆盖。

### 4. 限定 Mermaid 大版本并修复构建序列化依赖

Type: tradeoff

Context:
theme-mermaid 的无上界范围会选到 Mermaid 12；构建工具的兼容范围仍保留 serialize-javascript 6.0.2，命中代码执行与输出转义公告。OpenRPC 自动安装的 theme-common peer 在首次更新后仍保留旧版本。

Decision:
Mermaid 限于带安全修复的 11.x；针对 copy-webpack-plugin 和 css-minimizer-webpack-plugin 覆盖 serialize-javascript 为 7.1.4。为 OpenRPC 的 theme-common peer 显式添加同版本开发依赖，确保工作区解析为 3.10.2。

Reason:
保留 Mermaid 大版本可减少图表迁移成本。序列化库 7.0 的破坏性变更是 Node >=20，仓库满足；调用接口仍为 CommonJS serialize 函数。实际使用包括构建缓存键及压缩任务序列化，以生产构建验证。显式开发依赖符合本地插件使用 peer API 的方式，避免残留旧框架依赖树。

References:
- https://github.com/yahoo/serialize-javascript/releases/tag/v7.0.0
- https://github.com/yahoo/serialize-javascript/releases/tag/v7.1.4

Follow-up:
复核残留漏洞和完整构建；上游依赖范围更新后可移除序列化覆盖。

### 5. 迁移重复分类的翻译标识

Type: interpretation

Context:
3.10.2 构建拒绝 eSpaceSidebar 中 SDKs 和 The Graph 分类的重复翻译键。两个名称分别出现在开发参考与教程目录。

Decision:
为教程侧的两个分类添加稳定 key，并在现有语言副本中同步相同元数据。保留分类标签、正文、顺序和生成链接。

Reason:
这是新版本明确要求的配置迁移，仅改变内部翻译标识；同步元数据避免多语言构建重复报错。没有独立的侧栏翻译 JSON 需要迁移，语言内容保存在对应文档目录。

Follow-up:
以三语言构建及前后路由列表比较验证；Crowdin 后续同步沿用源文件中的 key。

### 6. 按实际调用条件保留五条剩余公告

Type: tradeoff

Context:
用户接受修复实际使用路径上的高危问题、解释其余命中的验收标准。最终 pnpm audit 仍有五条公告，盲目跨版本覆盖并非必要。

Decision:
不屏蔽审计结果，保留以下依赖并记录重新评估条件。

| 依赖 | 公告级别 / 数量（pnpm audit） | 当前调用证据与暂缓理由 | 重新评估条件 |
| --- | --- | --- | --- |
| tinypool 1.1.1 | critical / 2 | Docusaurus 3.10.2 的 `future.faster.ssgWorkerThreads` 默认 false，本站未启用 faster 或 v4 flags，构建走 `createSimpleSSGExecutor`。另外，线程池代码调用 `pool.run(task)` 不传第二个 options 对象，不符合第二条公告的触发条件。 | 启用 SSG workers、增加其他 Tinypool 消费者，或框架提供兼容修复版本。 |
| uuid 8.3.2 | moderate / 1 | 由开发服务器的 sockjs 0.3.24 引入，`lib/transport.js` 仅调用 `uuid.v4()`，未使用公告涉及的 v3/v5/v6 与外部 buffer。 | 开发服务器依赖更新，或新增受影响 API 调用。 |
| katex 0.16.47 | low / 1 | Mermaid 11 的依赖；公告要求既有原型污染与攻击者控制的数学表达式。本站没有 KaTeX 直接入口，现有 Mermaid 图不含数学表达式。 | 开放不可信图表/数学输入或改变渲染配置；关注 Mermaid 的依赖更新。 |
| deepmerge 4.3.1 | low / 1 | @svgr/plugin-svgo 8.1.0 声明的构建依赖；已检查其发布的入口代码，没有导入或调用 deepmerge。npm 最新仍为 4.3.1，官方公告也标记无已发布补丁；未使用审计 API 提示但不存在的 4.3.2。 | 上游发布修复、SVGR 更新，或出现实际调用入口。 |

Reason:
未发现上述公告在当前配置和调用链上的可利用入口。此判断不等于依赖本身无漏洞；不通过添加 audit ignore 规则隐藏残留风险。

References:
- https://github.com/tinylibs/tinypool/security/advisories/GHSA-5gmw-xhrv-c9v3
- https://github.com/tinylibs/tinypool/security/advisories/GHSA-85c8-ppgw-ccpr
- https://github.com/advisories/GHSA-w5hq-g745-h8pq
- https://github.com/advisories/GHSA-238p-pmpm-9mq7
- https://github.com/advisories/GHSA-gcqx-w48m-w2h4

Follow-up:
上述入口或配置变化时重新评估；继续保留七天发布等待期、信任检查和安装脚本白名单。

## 验证结果

- 同一命令 `pnpm audit --json`：更新前 179 条（critical 7 / high 82 / moderate 68 / low 22）；更新后 5 条（critical 2 / high 0 / moderate 1 / low 2）。这是包版本公告计数，不等于可利用漏洞数量。
- `CI=true pnpm install --frozen-lockfile` 成功，锁文件通过现有供应链策略；没有增加安装脚本白名单或信任例外。验证时使用 `/tmp/conflux-pnpm-cache` 隔离缓存、网络并发 4 和单请求超时 300000ms，以避开本机旧缓存及大型 registry 响应超时。这些是命令行环境设置，未写入仓库配置。
- 原有 `pnpm build` 成功生成 en、zh-CN、es 全部页面；升级前后 1831 个 HTML 路径完全一致。
- Playwright/Chromium 回归通过：三语言首页、Mermaid SVG、IdealImage 图片解码、Core/eSpace RPC 请求格式及模拟响应展示、真实 Algolia 查询结果、无页面脚本异常。RPC 测试未向链上发送交易。
- 12 个分类元数据文件仅增加 key，标签、描述、顺序与链接保持一致。
- React 与 React DOM 的安装版本均验证为 18.3.1；Sharp 为 0.35.5，加载的 libvips 为 8.18.7。
- 新版 image-size 的 SVG 检测只读取前 1000 字节，部分 draw.io SVG 起始标签携带大量编辑元数据，产生尺寸探测警告。对应构建产物与源文件字节一致；三个 SVG 在三种语言的页面均通过浏览器解码检查。未修改图片文件，自动尺寸探测限制仍存在。
- 原有断链和博客截断提示仍存在，未在依赖更新中扩展修复范围。`git diff --check` 通过。
- 本机实际 Node 为 25.8.1；未运行远端 Node 22 CI、未部署，也未独立编译插件的发布包（站点直接加载其 TypeScript 源码，完整构建已覆盖此路径）。
