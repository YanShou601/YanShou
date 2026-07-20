# 2026-07-20：Markdown 文档前端选型

## 决策

采用 **VitePress 1.6.4** 作为新的本地文档入口。

现有 vinext 页面暂时保留，不继续扩展业务功能，也不立即删除。

## 为什么选择 VitePress

- 源文件直接是 Markdown；
- 文件路径就是页面路径；
- 默认主题已经包含左侧目录、右侧页内大纲和移动端导航；
- 内置基于 MiniSearch 的浏览器端模糊全文搜索，不需要服务器或数据库；
- 生成纯静态 HTML，可放在任意静态文件服务上；
- 本地编辑会即时刷新；
- MIT 许可证；
- 当前项目已经使用 Node.js，不需要引入第二种语言运行时。

官方资料：

- https://vitepress.dev/guide/what-is-vitepress
- https://vitepress.dev/guide/routing
- https://vitepress.dev/reference/default-theme-search
- https://vitepress.dev/reference/default-theme-sidebar
- https://github.com/vuejs/vitepress

## 没有选择的方案

### Docsify

优点是几乎零构建、直接在浏览器加载 Markdown。缺点是运行时渲染、插件依赖更明显，静态输出和长期维护不如 VitePress 稳定。

### Astro Starlight

默认功能完整、无障碍和 Pagefind 搜索优秀，但框架与内容集合概念更多。对于当前仅有几十份 Markdown 的个人研究库，配置面偏大。

### Docusaurus

适合大型、多版本、社区化技术文档，但 React 应用和插件体系明显超过当前需求。

## 实施方式

- VitePress 根目录直接指向 `knowledge/`；
- `knowledge/.vitepress/` 只保存文档界面配置；
- `knowledge/*.md` 仍是唯一内容来源；
- `knowledge/catalog/supplements.csv` 继续作为机器可读索引；
- 不建立数据库、不增加登录、不制作营销首页；
- 本阶段只运行本地预览，不发布。

## 使用

```powershell
npm run docs:dev
npm run docs:build
npm run docs:preview
```
