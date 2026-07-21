# 研寿策略

这是项目的核心资料层。网页只是它的阅读界面，不是事实来源。

## 三层结构

1. `work/references/`：原始网页、XML、JSON、PDF 快照。该目录不进入 Git，用于本地复核。
2. `knowledge/`：人工整理的 Markdown 档案。所有判断都必须能追溯到来源。
3. `knowledge/catalog/*.csv`：机器可读索引，未来网页和分析脚本应优先读取这里，而不是复制一份数据。

## 目录

- `catalog/supplements.csv`：全部补剂候选及研究状态。
- `catalog/products.csv`：具体产品、市场版本、活性含量与产品质量状态。
- `catalog/supplements.md`：候选库的人类可读说明。
- `dossiers/`：已经完成初步证据评审的干预档案。
- `cases/`：人物公开方案、版本冲突与逐条事实核查。
- `products/`：具体品牌与 SKU 的质量、认证、公开使用和版本档案。
- `papers/existing-evidence-library.md`：当前网页使用的论文记录。
- `sources/`：Bryan Johnson 等人物方案及来源清单。
- `methods/`：判级、来源、更新与安全规范。
- `audits/`：每份档案的独立质量检查与修正记录。
- `research-log/`：每次研究批次的决策、完成项与遗留问题。
- `templates/`：新增干预和论文记录时使用的统一模板。

## 状态词

- `reviewed`：至少完成一轮来源核对、结果与局限摘录。
- `candidate`：已进入候选池，但尚未完成系统证据评审。
- `needs-source-check`：来自用户清单、历史讨论或二手材料，尚未确认 Bryan 的使用状态。
- `archived`：原始来源已保存到本地，并记录校验值。
- `remote-only`：已经登记来源，但暂未取得本地原始快照。

## Bryan 使用状态

- `current-explicit`：当前官方日程直接列出。
- `current-blend`：当前日程使用的复方或产品中包含；需要进一步核对配方版本。
- `official-product`：出现在当前官方产品目录，但不等于 Bryan 当前每天使用。
- `historical-or-discussed`：曾使用或讨论，但当前状态未确认。
- `needs-source-check`：疑似存在于配方或历史方案，等待一手来源核对。
- `unverified`：只有用户提供或二手说法，尚未找到一手来源。
- `not-applicable`：不用于描述人物方案。

## 证据等级

- `T1`：人体证据较多，适用条件相对清楚。
- `T2`：特定缺乏、疾病、用药或目标下可能有价值。
- `T3`：能改变指标，但临床功能或长期获益尚不稳定。
- `T4`：早期探索，等待独立重复。
- `pending`：尚未完成评审，不能从机制或流行度推断等级。

完整规则见 [evidence-grading.md](methods/evidence-grading.md)。

## 审计状态

- `pending`：尚未运行独立检查；
- `partial`：已经审计，但仍有影响完整性的失败项或待核来源；
- `passed`：核心项通过，未发现阻断当前结论的问题；
- `stale`：证据截止日过旧，或出现可能改变结论的新资料。

Tier 与审计状态相互独立。审计通过不等于医学结论得到保证，详见 [AI4L 本地化审计方法](methods/ai4l-adaptation.md)。

## 日常检索

在项目根目录使用全文检索：

```powershell
rg -n "NMN|烟酰胺单核苷酸" knowledge
rg -n "current-explicit" knowledge/catalog
rg -n "PMID: 40275690" knowledge
rg -n "利益冲突|局限" knowledge/dossiers knowledge/papers
```

## 更新纪律

1. 先保存或登记原始来源。
2. 在来源清单中记录 URL、访问日期、版本和本地路径。
3. 再更新候选索引或档案。
4. 每个结论必须同时写出适用条件、局限和安全边界。
5. “某人正在使用”不能作为疗效证据。
6. 网页内容必须由知识库生成或同步，不应形成另一套独立事实。

最后更新：2026-07-21

