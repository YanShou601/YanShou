# 研寿项目工作规则

## 事实来源

`knowledge/` 是项目的事实层，网页不是。

开始任何补剂、饮食、运动或案例分析前：

1. 阅读 `knowledge/README.md`；
2. 检索 `knowledge/catalog/`、`knowledge/dossiers/`、`knowledge/papers/`；
3. 检查 `knowledge/sources/source-manifest.md`；
4. 只有知识库缺失或需要更新时才重新检索互联网。

## 研究纪律

- Bryan Johnson 等人物方案只用于发现候选，不作为疗效证据。
- 新候选默认 `pending`。
- 没有完整 dossier 不得新增或改变 Tier。
- 每个结论必须同时记录适用条件、局限、安全边界和来源日期。
- 新建或重大更新的 dossier 需要使用 `knowledge/templates/intervention-audit.md` 独立审计，并把结果保存到 `knowledge/audits/`。
- Tier 与审计状态分开：审计通过不代表医学正确，审计失败也不能在没有新证据时自动改 Tier。
- 品牌和 SKU 使用 `P1–P3` 产品质量等级；不得用品牌质量提高 `T1–T4` 科学证据等级。
- 产品判级必须记录完整产品名、市场版本和检查日期；认证只能用于证书对应的具体产品。
- 名人使用、赞助和销量单独记录，不进入产品质量或疗效判级。
- 优先原始论文、指南、试验注册和权威机构资料。
- 当前协议和商业产品页必须注明日期；不能把产品成分写成 Bryan 当前每天使用。
- 不使用“必备”“逆转衰老”“人人长期服用”等表述。

## 文件流

- 原始下载：`work/references/`
- 来源登记：`knowledge/sources/source-manifest.md`
- 候选索引：`knowledge/catalog/supplements.csv`
- 人工档案：`knowledge/dossiers/`
- 论文记录：`knowledge/papers/`
- 研究过程：`knowledge/research-log/`

## 网页

- `app/` 是浏览界面。
- 新内容应先进入知识库，再同步到网页。
- 不在网页中维护一套与知识库不一致的数据。
- 用户未明确要求发布时，只做本地修改和本地预览。
