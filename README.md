# 研寿

一个由本地知识库驱动的长寿研究项目。

项目目标不是制作补剂广告或复制名人方案，而是：

- 记录 Bryan Johnson 等公开方案作为研究线索；
- 保存原始网页、论文和版本信息；
- 按人体证据、临床相关性、适用条件与安全边界评审干预；
- 让网页成为知识库的高效浏览界面。

## 核心入口

- [知识库说明](knowledge/README.md)
- [补剂候选总目录](knowledge/catalog/supplements.md)
- [机器可读补剂索引](knowledge/catalog/supplements.csv)
- [已评审档案](knowledge/dossiers/README.md)
- [现有论文证据库](knowledge/papers/existing-evidence-library.md)
- [Bryan 当前方案快照](knowledge/sources/bryan-johnson-current-protocol.md)
- [来源与本地快照清单](knowledge/sources/source-manifest.md)
- [证据判级规范](knowledge/methods/evidence-grading.md)
- [标准研究工作流](knowledge/methods/research-workflow.md)
- [知识库初始化记录](knowledge/research-log/2026-07-20-knowledge-base-bootstrap.md)

## 数据原则

1. 人物方案和科学证据分开。
2. 新项目默认 `pending`，不根据流行度或机制故事直接定级。
3. 每个结论必须同时记录结果、适用条件、局限和安全边界。
4. 原始快照保存在 `work/references/`，人工整理内容保存在 `knowledge/`。
5. 网页应逐步改为读取知识库，不再维护第二套事实。

## 本地网页

```powershell
npm install
npm run dev
```

## 本地知识库文档界面

```powershell
npm run docs:dev
```

这个入口直接读取 `knowledge/` 下的 Markdown，并提供目录和浏览器端全文搜索。

## 构建验证

```powershell
npm run build
npm run docs:build
```

## 检索示例

```powershell
rg -n "NMN|烟酰胺单核苷酸" knowledge
rg -n "current-explicit" knowledge/catalog
rg -n "PMID: 40275690|40275690" knowledge
```
