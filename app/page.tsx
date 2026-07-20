"use client";

import { useMemo, useState } from "react";

type Layer = "all" | "foundation" | "conditional" | "experimental";

type EvidenceItem = {
  id: string;
  name: string;
  english: string;
  layer: Exclude<Layer, "all">;
  layerLabel: string;
  priority: number;
  evidence: string;
  evidenceTone: "strong" | "moderate" | "limited";
  oneLine: string;
  rationale: string;
  action: string;
  caution: string;
  source: string;
  sourceLabel: string;
};

const evidenceItems: EvidenceItem[] = [
  {
    id: "strength",
    name: "力量训练",
    english: "RESISTANCE TRAINING",
    layer: "foundation",
    layerLabel: "行为基础",
    priority: 5,
    evidence: "较强",
    evidenceTone: "strong",
    oneLine: "肌力、肌肉量、骨骼与代谢健康的共同支点。",
    rationale:
      "这是原始清单里最值得保留的第一优先级。长期观察研究将规律力量训练与更低的全因及心血管死亡风险联系起来，且对衰弱和跌倒风险具有现实意义。",
    action: "从每周 2–3 次全身渐进训练开始，记录动作、负重、次数与恢复。",
    caution: "心血管疾病、关节损伤或长期未运动者，应先评估并循序渐进。",
    source:
      "https://bjsm.bmj.com/content/60/12/874.full",
    sourceLabel: "BJSM · 长期力量训练研究",
  },
  {
    id: "protein",
    name: "足够蛋白质",
    english: "ADEQUATE PROTEIN",
    layer: "foundation",
    layerLabel: "行为基础",
    priority: 5,
    evidence: "较强",
    evidenceTone: "strong",
    oneLine: "与训练配合，帮助维持肌肉和功能储备。",
    rationale:
      "蛋白质不是越多越好，关键是满足总量、分布和质量。老年人常以每日 1.0–1.2 g/kg 为基础讨论，活动量较高者可能需要更高，但应结合热量与肾功能。",
    action: "先计算日常饮食，再按缺口补充；把蛋白质分布到各餐，而非只集中在一餐。",
    caution: "慢性肾病、肝病或特殊代谢疾病需要个体化方案。",
    source: "https://pubmed.ncbi.nlm.nih.gov/23867520/",
    sourceLabel: "PROT-AGE · 老年蛋白质建议",
  },
  {
    id: "cardio",
    name: "有氧与心肺能力",
    english: "CARDIORESPIRATORY FITNESS",
    layer: "foundation",
    layerLabel: "行为基础",
    priority: 5,
    evidence: "较强",
    evidenceTone: "strong",
    oneLine: "原清单遗漏，但应与力量训练处于同一层级。",
    rationale:
      "延寿不能只看肌肉。心肺适能、日常活动量和代谢控制共同决定健康寿命，因此不能让补剂占据本该属于运动的注意力。",
    action: "建立低强度有氧底盘，并在适合时加入少量更高强度训练。",
    caution: "胸痛、晕厥、异常气促或已知心脏病应先接受医疗评估。",
    source:
      "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
    sourceLabel: "WHO · 身体活动建议",
  },
  {
    id: "creatine",
    name: "肌酸一水合物",
    english: "CREATINE MONOHYDRATE",
    layer: "foundation",
    layerLabel: "高价值补充",
    priority: 4,
    evidence: "较强",
    evidenceTone: "strong",
    oneLine: "补剂中证据相对扎实，主要价值在力量与瘦体重。",
    rationale:
      "对训练表现和肌肉的支持比“提升大脑能量”的宣传更可靠。认知研究存在积极信号，但证据确定性和适用人群仍不如肌肉方向清晰。",
    action: "若纳入方案，优先选择成分单一的肌酸一水合物，并把训练表现作为主要观察指标。",
    caution: "肾病、妊娠或使用可能影响肾功能的药物时，应先咨询医生。",
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11275561/",
    sourceLabel: "2024 · 肌酸与认知系统综述",
  },
  {
    id: "omega3",
    name: "DHA / EPA",
    english: "OMEGA-3",
    layer: "conditional",
    layerLabel: "按缺口决定",
    priority: 3,
    evidence: "情境相关",
    evidenceTone: "moderate",
    oneLine: "价值取决于鱼类摄入、甘油三酯与心血管背景。",
    rationale:
      "把 DHA 简化成“人人必补的大脑与心血管补剂”并不准确。综合试验显示心血管获益整体偏温和，不同制剂、剂量和人群差异明显。",
    action: "先看每周鱼类摄入与血脂；补充剂不能替代对 ApoB、血压和吸烟的管理。",
    caution: "房颤、抗凝药、出血风险或高剂量使用，需要医疗评估。",
    source: "https://pubmed.ncbi.nlm.nih.gov/38869144/",
    sourceLabel: "2024 · Omega-3 心血管结局荟萃分析",
  },
  {
    id: "coq10",
    name: "辅酶 Q10",
    english: "COENZYME Q10",
    layer: "conditional",
    layerLabel: "特定场景",
    priority: 2,
    evidence: "有限 / 情境相关",
    evidenceTone: "moderate",
    oneLine: "健康人“线粒体支持”不等于已证实的延寿收益。",
    rationale:
      "Q10 在特定疾病或用药场景可能有讨论价值，但健康人长期常规使用的证据不足。近期随机试验中，血液水平升高并未转化为线粒体功能改善。",
    action: "只有在明确目标下试用，例如与医生讨论他汀相关肌肉症状，而非作为默认基础补剂。",
    caution: "可能与华法林等药物相互作用；心血管治疗中不要自行替代处方药。",
    source: "https://pubmed.ncbi.nlm.nih.gov/41604113/",
    sourceLabel: "2026 · Q10 随机对照试验",
  },
  {
    id: "nmn",
    name: "NMN",
    english: "NAD⁺ PRECURSOR",
    layer: "experimental",
    layerLabel: "实验层",
    priority: 2,
    evidence: "人体证据有限",
    evidenceTone: "limited",
    oneLine: "能改变 NAD⁺ 相关指标，但尚未证明延长人类寿命。",
    rationale:
      "机制与动物实验令人关注，但人体研究常见样本小、时间短、结局分散。近期汇总没有发现对肌肉量、握力、步速等结果的稳定改善。",
    action: "若仍选择尝试，应一次只引入一种，并预先定义观察指标、周期与停用条件。",
    caution: "长期安全性、肿瘤相关情境及与药物的相互作用仍缺少充分数据。",
    source: "https://pubmed.ncbi.nlm.nih.gov/40275690/",
    sourceLabel: "2025 · NMN/NR 与肌肉功能荟萃分析",
  },
  {
    id: "spermidine",
    name: "亚精胺",
    english: "SPERMIDINE",
    layer: "experimental",
    layerLabel: "实验层",
    priority: 2,
    evidence: "人体证据有限",
    evidenceTone: "limited",
    oneLine: "自噬机制有吸引力，临床主要终点尚未确认。",
    rationale:
      "动物和机制证据推动了热度，但一项 12 个月、100 人的随机试验中，主要认知与生物标志物结果没有显示明确获益。",
    action: "优先从全谷物、豆类、菌菇等食物模式获得相关营养，不急于依赖高价提取物。",
    caution: "高纯度、高剂量长期补充的人体安全资料仍有限。",
    source: "https://pubmed.ncbi.nlm.nih.gov/35616942/",
    sourceLabel: "2022 · 亚精胺随机临床试验",
  },
  {
    id: "ergothioneine",
    name: "麦角硫因",
    english: "ERGOTHIONEINE",
    layer: "experimental",
    layerLabel: "观察层",
    priority: 2,
    evidence: "新兴",
    evidenceTone: "limited",
    oneLine: "有趣的新兴抗氧化方向，尚不足以成为基础栈。",
    rationale:
      "观察性研究与早期干预信号值得继续跟踪，但距离证明改善健康寿命仍有明显距离。菌菇等食物来源通常比单一补剂更稳妥。",
    action: "现阶段以食物来源和研究跟踪为主，除非存在明确的个人实验目的。",
    caution: "产品质量、有效剂量与长期临床结局尚未形成共识。",
    source: "https://pubmed.ncbi.nlm.nih.gov/40968729/",
    sourceLabel: "2025 · 麦角硫因与健康老化综述",
  },
  {
    id: "pqq",
    name: "PQQ",
    english: "PYRROLOQUINOLINE QUINONE",
    layer: "experimental",
    layerLabel: "观察层",
    priority: 1,
    evidence: "证据很有限",
    evidenceTone: "limited",
    oneLine: "“促进线粒体生成”主要仍是机制叙事。",
    rationale:
      "现有人体试验规模和临床相关性有限，尚不能证明其带来可感知、可重复的延寿或功能收益。",
    action: "从当前方案中暂缓，把预算留给训练、睡眠、体检与饮食质量。",
    caution: "不要把生化机制直接等同于人体临床获益。",
    source: "https://www.jstage.jst.go.jp/article/jmi/71/1.2/71_23/_pdf",
    sourceLabel: "PQQ 人体研究综述",
  },
];

const filters: Array<{ id: Layer; label: string; caption: string }> = [
  { id: "all", label: "全部", caption: "10 项" },
  { id: "foundation", label: "基础层", caption: "先执行" },
  { id: "conditional", label: "条件层", caption: "看缺口" },
  { id: "experimental", label: "实验层", caption: "谨慎试" },
];

const layerDescriptions = [
  {
    number: "01",
    title: "行为基础",
    subtitle: "先把确定性做满",
    text: "训练、蛋白质、心肺能力、睡眠与代谢风险管理，决定了方案的大部分回报。",
  },
  {
    number: "02",
    title: "缺口补充",
    subtitle: "根据饮食与化验",
    text: "肌酸可作为高价值补充；Omega-3、维生素和矿物质则应由缺口与场景决定。",
  },
  {
    number: "03",
    title: "实验观察",
    subtitle: "机制不是结论",
    text: "NMN、亚精胺、麦角硫因和 PQQ 保留研究兴趣，但不冒充已经证实的延寿方案。",
  },
];

const sourceLinks = [
  {
    label: "Bryan Johnson · 当前协议",
    href: "https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol",
  },
  {
    label: "Bryan Johnson · YouTube",
    href: "https://www.youtube.com/@BryanJohnson",
  },
  {
    label: "Bryan Johnson · 个人主页",
    href: "https://bryanjohnson.komi.io/",
  },
  {
    label: "Blueprint 官网",
    href: "https://blueprint.bryanjohnson.com/",
  },
];

export default function Home() {
  const [filter, setFilter] = useState<Layer>("all");

  const visibleItems = useMemo(
    () =>
      filter === "all"
        ? evidenceItems
        : evidenceItems.filter((item) => item.layer === filter),
    [filter],
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到页面顶部">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>
            <b>LONGEVITY</b>
            <small>FIELD NOTES · 001</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#method">方法</a>
          <a href="#evidence">证据图谱</a>
          <a href="#practice">执行框架</a>
          <a href="#sources">来源</a>
        </nav>
        <span className="issue">JUL · 2026</span>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/hero-deer.png"
          alt="晨雾森林中的鹿与野花，象征以自然和证据理解健康寿命"
        />
        <div className="paper-grid" aria-hidden="true" />
        <div className="petal petal-one" aria-hidden="true" />
        <div className="petal petal-two" aria-hidden="true" />
        <div className="petal petal-three" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">A FIELD GUIDE TO HEALTHSPAN</p>
          <h1>
            把长寿，
            <br />
            重新交给证据
          </h1>
          <p className="hero-lede">
            参考 Bryan Johnson 的 Blueprint，但不照抄他的生活。我们逐项核对人体研究、潜在收益、风险、成本与适用条件。
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#evidence">
              查看证据图谱 <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#method">
              阅读分析原则
            </a>
          </div>
        </div>
        <aside className="hero-note" aria-label="本期摘要">
          <span>本期摘要</span>
          <strong>10</strong>
          <p>项干预重新排序</p>
          <i />
          <p>行为优先 · 补剂后置</p>
        </aside>
        <p className="hero-caption">
          CERVUS ELAPHUS · 自然不是捷径，而是尺度
        </p>
      </section>

      <section className="intro section-shell" id="method">
        <div className="section-label">
          <span>方法</span>
          <i />
          <small>METHOD / 01</small>
        </div>
        <div className="intro-grid">
          <h2>Blueprint 是线索，<br />不是处方。</h2>
          <div className="intro-copy">
            <p>
              Bryan Johnson 的方案提供了密集的实验样本和公开记录，但个人协议、商业产品与科学共识并不是同一件事。
              我们采用更保守的顺序：先确认问题，再看人类结局，最后才讨论补充剂。
            </p>
            <p className="quote">
              “改变一个指标”不自动等于“延长健康寿命”。
            </p>
          </div>
        </div>
        <div className="method-steps">
          {layerDescriptions.map((layer) => (
            <article key={layer.number}>
              <span className="step-number">{layer.number}</span>
              <div>
                <small>{layer.subtitle}</small>
                <h3>{layer.title}</h3>
                <p>{layer.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="section-shell">
          <div className="section-label light-label">
            <span>证据图谱</span>
            <i />
            <small>EVIDENCE ATLAS / 02</small>
          </div>
          <div className="evidence-heading">
            <div>
              <p className="eyebrow">FROM CERTAINTY TO CURIOSITY</p>
              <h2>先做高确定性的事，<br />再保留实验的好奇心。</h2>
            </div>
            <p>
              优先级是我们的证据综合判断，不是医学评分。点击筛选，再展开每一项查看理由、行动建议与风险。
            </p>
          </div>

          <div className="filter-bar" role="group" aria-label="按方案层级筛选">
            {filters.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.caption}</small>
              </button>
            ))}
          </div>

          <p className="result-count" aria-live="polite">
            当前显示 {visibleItems.length} 项
          </p>

          <div className="evidence-list">
            {visibleItems.map((item, index) => (
              <details className="evidence-card" key={item.id}>
                <summary>
                  <span className="specimen-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="evidence-title">
                    <small>{item.english}</small>
                    <strong>{item.name}</strong>
                    <em>{item.oneLine}</em>
                  </span>
                  <span className="evidence-meta">
                    <span className={`evidence-badge ${item.evidenceTone}`}>
                      {item.evidence}
                    </span>
                    <span>{item.layerLabel}</span>
                  </span>
                  <span
                    className="priority-dots"
                    aria-label={`行动优先级 ${item.priority} / 5`}
                  >
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <i
                        key={dot}
                        className={dot <= item.priority ? "active" : ""}
                      />
                    ))}
                  </span>
                  <span className="expand-mark" aria-hidden="true">＋</span>
                </summary>
                <div className="evidence-detail">
                  <div>
                    <small>为什么这样判断</small>
                    <p>{item.rationale}</p>
                  </div>
                  <div>
                    <small>建议行动</small>
                    <p>{item.action}</p>
                  </div>
                  <div>
                    <small>留意风险</small>
                    <p>{item.caution}</p>
                  </div>
                  <a href={item.source} target="_blank" rel="noreferrer">
                    阅读来源 · {item.sourceLabel} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="practice section-shell" id="practice">
        <div className="section-label">
          <span>执行框架</span>
          <i />
          <small>PRACTICE / 03</small>
        </div>
        <div className="practice-grid">
          <div className="practice-copy">
            <p className="eyebrow">A SAFER N-OF-1</p>
            <h2>让每一次尝试，<br />都有开始和结束。</h2>
            <p>
              实验性补剂最容易叠加、最难归因。一次只改变一个变量，预先定义观察周期和停用条件，比一口气复制整套 Blueprint 更有价值。
            </p>
          </div>
          <ol className="timeline">
            <li>
              <span>0</span>
              <div>
                <small>BASELINE · 开始前</small>
                <h3>先确认真正的问题</h3>
                <p>记录训练、饮食、睡眠、血压、血脂和相关症状；没有问题，就不要为了“优化”制造治疗。</p>
              </div>
            </li>
            <li>
              <span>1</span>
              <div>
                <small>ONE CHANGE · 单变量</small>
                <h3>一次只加入一项</h3>
                <p>写下产品、剂量、时间、目的与停止标准，避免同时加入多种补剂后无法判断效果。</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <small>8–12 WEEKS · 复盘</small>
                <h3>看功能，不迷信分数</h3>
                <p>优先看力量、耐力、睡眠、症状与医生认可的指标，而不是只追逐“生物年龄”或单一生化变化。</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <small>STOP / KEEP · 决策</small>
                <h3>无明确收益就停</h3>
                <p>长期方案必须证明自己值得持续承担成本、复杂度与潜在风险。</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="safety">
        <div className="safety-art" aria-hidden="true">
          <span>✦</span>
        </div>
        <div>
          <p className="eyebrow">A NOTE ON SAFETY</p>
          <h2>这是一份研究笔记，<br />不是个人医疗处方。</h2>
          <p>
            肾病、肝病、房颤、抗凝治疗、肿瘤治疗、妊娠或准备手术时，蛋白质、肌酸、鱼油、Q10
            及实验性补剂都需要单独评估。出现不适应停止并寻求专业医疗建议。
          </p>
        </div>
      </section>

      <section className="sources section-shell" id="sources">
        <div className="section-label">
          <span>来源</span>
          <i />
          <small>SOURCES / 04</small>
        </div>
        <div className="sources-grid">
          <div>
            <p className="eyebrow">PRIMARY REFERENCE</p>
            <h2>Bryan 的公开资料，<br />作为跟踪入口。</h2>
            <p>
              他的内容用于发现值得研究的问题；每项健康结论仍单独核对人体试验、系统综述与风险。
            </p>
          </div>
          <div className="source-links">
            {sourceLinks.map((source, index) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{source.label}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark" aria-hidden="true">✦</span>
          <p>
            LONGEVITY FIELD NOTES
            <small>以证据理解健康寿命</small>
          </p>
        </div>
        <p>首版资料核对：2026-07-20</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
