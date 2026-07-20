"use client";

import { useMemo, useState } from "react";

type PaperType = "Meta-analysis" | "RCT" | "Systematic review";
type Screen = "board" | "method" | "changelog";

type Paper = {
  id: string;
  type: PaperType;
  year: number;
  title: string;
  journal: string;
  population: string;
  duration: string;
  result: string;
  limitation: string;
  url: string;
};

type Dossier = {
  id: string;
  name: string;
  english: string;
  tier: "T1" | "T2" | "T3" | "T4";
  tierLabel: string;
  status: string;
  target: string;
  verdict: string;
  why: string;
  condition: string;
  risk: string;
  papers: Paper[];
};

const dossiers: Dossier[] = [
  {
    id: "creatine",
    name: "肌酸一水合物",
    english: "Creatine monohydrate",
    tier: "T1",
    tierLabel: "证据相对充分",
    status: "纳入候选",
    target: "力量、瘦体重、训练表现",
    verdict:
      "补剂中证据较稳定的一项。主要价值在肌肉与训练适应；认知方向有信号，但确定性明显更低。",
    why:
      "多项随机试验和荟萃分析在不同年龄层观察到力量或瘦体重改善，尤其与阻力训练同时实施时。它没有被证明能延长人类寿命。",
    condition:
      "把训练表现、力量和体成分作为主要观察目标；不把短期体重上升误判为脂肪增加。",
    risk:
      "肾病、妊娠或使用可能影响肾功能的药物时，先由医生评估。选择成分单一的肌酸一水合物。",
    papers: [
      {
        id: "cr-2017",
        type: "Meta-analysis",
        year: 2017,
        title:
          "Effect of creatine supplementation during resistance training on lean tissue mass and muscular strength in older adults",
        journal: "Open Access Journal of Sports Medicine",
        population: "22 项研究 · 721 人 · 平均年龄约 57–70 岁",
        duration: "7–52 周；每周训练 2–3 次",
        result:
          "相较安慰剂＋训练，肌酸组瘦体重平均多增加 1.37 kg；胸推和腿举力量亦有小幅但显著优势。",
        limitation:
          "研究方案、剂量和人群存在差异；结果主要支持“配合训练”，不能外推为单独服用即可抗衰。",
        url: "https://pubmed.ncbi.nlm.nih.gov/29138605/",
      },
      {
        id: "cr-2024-function",
        type: "Meta-analysis",
        year: 2024,
        title:
          "Creatine supplementation for optimization of physical function in patients at risk of functional disability",
        journal: "Journal of Parenteral and Enteral Nutrition",
        population: "33 项 RCT · 1,076 人",
        duration: "纳入老年人及慢性病成人",
        result:
          "坐站表现 SMD 0.51；上肢力量和握力小幅改善；瘦体重平均增加 1.08 kg。",
        limitation:
          "多数结局的证据质量为低或极低；作者明确要求更高质量的前瞻性试验验证。",
        url: "https://pubmed.ncbi.nlm.nih.gov/38417175/",
      },
      {
        id: "cr-2024-cognition",
        type: "Systematic review",
        year: 2024,
        title: "The effects of creatine supplementation on cognitive function in adults",
        journal: "Frontiers in Nutrition",
        population: "成人随机对照试验系统综述",
        duration: "检索 1993–2024 年研究",
        result:
          "记忆和部分处理速度指标出现积极信号，但不同认知领域结果并不一致。",
        limitation:
          "处理速度、总体认知、执行功能和注意力等结论确定性偏低，不能把认知收益当作已确认事实。",
        url: "https://pubmed.ncbi.nlm.nih.gov/39070254/",
      },
    ],
  },
  {
    id: "omega3",
    name: "DHA / EPA",
    english: "Omega-3 fatty acids",
    tier: "T1",
    tierLabel: "证据较多但依赖场景",
    status: "条件纳入",
    target: "甘油三酯、心血管风险、饮食缺口",
    verdict:
      "研究量大，但不能概括为“人人都应补 DHA”。配方、剂量、是否为处方级 EPA 以及基础风险会改变结论。",
    why:
      "大型试验和荟萃分析显示部分心血管结局有温和改善，但 EPA 单方与 EPA＋DHA 的结果不同；一般人群一级预防的收益并不稳定。",
    condition:
      "先评估每周鱼类摄入、甘油三酯和既往心血管病。不要用普通鱼油替代医生开具的处方制剂。",
    risk:
      "高剂量可能增加房颤或出血相关顾虑；房颤、抗凝药、术前和出血风险人群应先咨询医生。",
    papers: [
      {
        id: "om-2024-events",
        type: "Meta-analysis",
        year: 2024,
        title:
          "Effects of omega-3 fatty acids on coronary revascularization and cardiovascular events",
        journal: "European Journal of Preventive Cardiology",
        population: "18 项 RCT · 134,144 人",
        duration: "4.5 个月–7.4 年",
        result:
          "血运重建 RR 0.90、心肌梗死 RR 0.89、心血管死亡 RR 0.92；总体效应温和，EPA 单方信号更强。",
        limitation:
          "制剂和人群高度异质，血运重建结局 I² 为 68%；研究部门曾接受相关厂商无条件资助。",
        url: "https://pubmed.ncbi.nlm.nih.gov/38869144/",
      },
      {
        id: "om-2024-rx",
        type: "Meta-analysis",
        year: 2024,
        title:
          "The effect of omega-3 PUFA prescription preparations on prevention of clinical cardiovascular disease",
        journal: "Nutrition Journal",
        population: "12 项 RCT · 99,830 人",
        duration: "均为至少 1 年的长期研究",
        result:
          "处方级 omega-3 的心血管效果随成分、剂量和受试者风险背景而变化，支持按临床场景拆分判断。",
        limitation:
          "只纳入处方制剂，不能直接外推到市售鱼油；分析没有解释甘油三酯水平在获益中的作用。",
        url: "https://pubmed.ncbi.nlm.nih.gov/39639295/",
      },
    ],
  },
  {
    id: "coq10",
    name: "辅酶 Q10",
    english: "Coenzyme Q10",
    tier: "T2",
    tierLabel: "特定情境可讨论",
    status: "暂不常规纳入",
    target: "特定疾病或用药情境",
    verdict:
      "健康人“支持线粒体”的说法缺少稳定的人体功能结局；在特定疾病或他汀相关症状中可另行评估。",
    why:
      "补充后血浆浓度上升并不代表肌肉线粒体或体能会改善。现有阳性结果更多集中在特定患者而非健康人延寿。",
    condition:
      "必须先定义具体临床问题；若没有目标或缺口，不作为基础补剂。",
    risk:
      "可能影响华法林等药物；不能替代心衰、血脂或其他心血管标准治疗。",
    papers: [
      {
        id: "q10-2026",
        type: "RCT",
        year: 2026,
        title:
          "Coenzyme Q10 supplementation raises plasma levels without improving mitochondrial function in older adults",
        journal: "GeroScience",
        population: "40 名社区老年人 · 平均 74 岁",
        duration: "400 mg/日 · 12 周",
        result:
          "血浆 Q10 显著升高，但肌肉线粒体功能、VO₂max、糖代谢和体成分均未改善。",
        limitation:
          "样本较小、周期较短且受试者较健康；不能回答特定疾病人群是否获益。",
        url: "https://pubmed.ncbi.nlm.nih.gov/41604113/",
      },
      {
        id: "q10-2022",
        type: "Meta-analysis",
        year: 2022,
        title:
          "Effects of Coenzyme Q10 supplementation on biomarkers of oxidative stress in adults",
        journal: "Antioxidants",
        population: "成人随机对照试验汇总",
        duration: "不同剂量与周期",
        result:
          "部分疾病人群的氧化应激标志物下降，但在健康人亚组未观察到一致效果。",
        limitation:
          "生物标志物不是健康寿命结局；疾病、剂量与试验质量差异较大。",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9311997/",
      },
    ],
  },
  {
    id: "nmn",
    name: "NMN",
    english: "Nicotinamide mononucleotide",
    tier: "T3",
    tierLabel: "指标变化多于临床获益",
    status: "研究观察",
    target: "NAD⁺ 相关生化指标",
    verdict:
      "短期人体研究通常能看到 NAD⁺ 相关指标变化，但肌肉、体能、代谢和健康寿命结局并不稳定。",
    why:
      "“提高 NAD⁺”证明作用通路被触达，却不能证明衰老被逆转。当前最大缺口是长期、独立、临床相关的人体结局。",
    condition:
      "如进行个人实验，应只引入一种产品，并预先定义功能指标、周期和停止条件。",
    risk:
      "长期安全、肿瘤相关情境及药物相互作用资料不足；产品纯度和真实剂量亦是问题。",
    papers: [
      {
        id: "nmn-2025",
        type: "Meta-analysis",
        year: 2025,
        title:
          "The Effect of Nicotinamide Mononucleotide and Riboside on Skeletal Muscle Mass and Function",
        journal: "Journal of Cachexia, Sarcopenia and Muscle",
        population: "平均年龄 60.9–83 岁的 RCT",
        duration: "多项短期试验汇总",
        result:
          "NMN 对骨骼肌指数、握力、步速和五次坐站均无显著改善。",
        limitation:
          "纳入试验数量和样本有限，但当前结果不支持其用于保存老年人肌肉量或功能。",
        url: "https://pubmed.ncbi.nlm.nih.gov/40275690/",
      },
      {
        id: "nmn-2024",
        type: "RCT",
        year: 2024,
        title:
          "NMN increased blood NAD levels, maintained walking speed, and improved sleep quality in older adults",
        journal: "GeroScience",
        population: "60 名老年人",
        duration: "随机双盲 · 12 周",
        result:
          "血液 NAD 相关指标上升，并出现步行速度和主观睡眠方面的积极信号。",
        limitation:
          "样本小、周期短；多位作者来自产品相关企业，且单项阳性结果尚需独立重复。",
        url: "https://pubmed.ncbi.nlm.nih.gov/38789831/",
      },
    ],
  },
  {
    id: "spermidine",
    name: "亚精胺",
    english: "Spermidine",
    tier: "T3",
    tierLabel: "机制强于临床证据",
    status: "研究观察",
    target: "自噬、认知老化",
    verdict:
      "自噬机制与动物数据令人关注，但较完整的人体随机试验未确认主要认知获益。",
    why:
      "早期小试验的积极信号在更大、更长的后续试验中没有复现主要终点。",
    condition:
      "现阶段更适合作为研究主题；饮食来源与完整食物模式优先于高价提取物。",
    risk:
      "长期高剂量、不同化学形式和真实生物利用度仍不明确。",
    papers: [
      {
        id: "sp-2022",
        type: "RCT",
        year: 2022,
        title:
          "Effects of Spermidine Supplementation on Cognition and Biomarkers in Older Adults With Subjective Cognitive Decline",
        journal: "JAMA Network Open",
        population: "100 人 · 平均 69 岁",
        duration: "0.9 mg/日 · 12 个月",
        result:
          "主要记忆终点组间差异 −0.03（95% CI −0.11 至 0.05，P=.47），未显示明确获益。",
        limitation:
          "剂量可能不足；探索性分析出现语言记忆和炎症信号，但需要新的验证试验。",
        url: "https://pubmed.ncbi.nlm.nih.gov/35616942/",
      },
      {
        id: "sp-2024",
        type: "RCT",
        year: 2024,
        title:
          "Supplementation of spermidine at 40 mg/day has minimal effects on circulating polyamines",
        journal: "Nutrition Research",
        population: "37 名健康男性 · 50–70 岁",
        duration: "40 mg/日 · 28 天",
        result:
          "短期耐受性良好，但血清和尿液多胺水平变化很小。",
        limitation:
          "研究重点是短期安全性，不是临床获益；仅男性且只有 28 天。",
        url: "https://pubmed.ncbi.nlm.nih.gov/39405978/",
      },
    ],
  },
  {
    id: "ergothioneine",
    name: "麦角硫因",
    english: "Ergothioneine",
    tier: "T4",
    tierLabel: "早期探索",
    status: "等待重复",
    target: "认知、氧化应激",
    verdict:
      "存在小型人体试验信号，但样本过小，尚不足以形成常规补充建议。",
    why:
      "机制、观察性关联和少量干预研究方向一致，但临床结局、剂量和适用人群仍未确定。",
    condition:
      "以菌菇等食物来源为主；补充剂只适合明确知情的探索性尝试。",
    risk:
      "长期真实世界安全性、产品质量和不同人群反应资料有限。",
    papers: [
      {
        id: "ergo-2024",
        type: "RCT",
        year: 2024,
        title:
          "Investigating the efficacy of ergothioneine to delay cognitive decline in mild cognitively impaired subjects",
        journal: "Journal of Alzheimer's Disease",
        population: "19 名 60 岁以上轻度认知障碍者",
        duration: "25 mg · 每周 3 次 · 1 年",
        result:
          "学习能力和神经丝轻链指标出现积极信号，安全化验未见明显异常。",
        limitation:
          "只有 19 人，是探索性试验；不足以排除偶然结果，也不能外推到健康成年人。",
        url: "https://pubmed.ncbi.nlm.nih.gov/39544014/",
      },
      {
        id: "ergo-2025",
        type: "Systematic review",
        year: 2025,
        title:
          "Ergothioneine for cognitive health, longevity and healthy ageing: where are we now?",
        journal: "Nutrients",
        population: "机制、观察性与早期干预研究综述",
        duration: "截至 2025 年证据",
        result:
          "早期人体研究提示认知、睡眠和神经退行性标志物方向值得继续测试。",
        limitation:
          "多数结论依赖观察性资料或小规模干预；尚无延长健康寿命的直接证据。",
        url: "https://pubmed.ncbi.nlm.nih.gov/40968729/",
      },
    ],
  },
  {
    id: "pqq",
    name: "PQQ",
    english: "Pyrroloquinoline quinone",
    tier: "T4",
    tierLabel: "早期探索",
    status: "暂不纳入",
    target: "线粒体、认知",
    verdict:
      "“促进线粒体生成”主要仍是机制叙事。人体试验小且常使用复方，无法确认 PQQ 本身的贡献。",
    why:
      "存在个别认知和生物标志物信号，但研究设计无法支持健康人延寿结论。",
    condition:
      "保留在观察清单，不作为当前补充栈。",
    risk:
      "有效剂量、长期安全性及与其他补剂的相互作用缺少可靠数据。",
    papers: [
      {
        id: "pqq-2024",
        type: "RCT",
        year: 2024,
        title:
          "Six-week dihydrogen-PQQ supplementation on mitochondrial biomarkers, brain metabolism, and cognition",
        journal: "GeroScience",
        population: "65 岁以上轻度认知障碍者",
        duration: "复方制剂 · 6 周",
        result:
          "MMSE 组间交互不显著（P=.58）；个别定向力和脑代谢指标出现积极信号。",
        limitation:
          "PQQ 与氢气复方同时使用，无法识别 PQQ 单独作用；周期短且人群特殊。",
        url: "https://pubmed.ncbi.nlm.nih.gov/38908296/",
      },
      {
        id: "pqq-2024-review",
        type: "Systematic review",
        year: 2024,
        title: "The effects of pyrroloquinoline quinone on human health",
        journal: "Journal of Medical Investigation",
        population: "现有人体补充研究综述",
        duration: "多项小型短期研究",
        result:
          "睡眠、疲劳、认知和炎症指标有零散积极结果。",
        limitation:
          "试验小、结局多、复方和利益相关问题限制结论，缺少硬临床结局。",
        url: "https://www.jstage.jst.go.jp/article/jmi/71/1.2/71_23/_pdf",
      },
    ],
  },
];

const tierInfo = [
  {
    tier: "T1",
    label: "证据较多 / 适用条件相对清楚",
    note: "不是“人人必吃”，而是可以进入个体化候选清单。",
  },
  {
    tier: "T2",
    label: "特定情境可能有价值",
    note: "需要明确疾病、用药或缺口，健康人常规使用证据不足。",
  },
  {
    tier: "T3",
    label: "能改变指标，临床获益未稳",
    note: "机制可行或生化指标改变，但功能结局尚不可靠。",
  },
  {
    tier: "T4",
    label: "早期探索 / 等待重复",
    note: "小型、短期或复方研究为主，暂不进入日常补充栈。",
  },
] as const;

const paperTypes: Array<"All" | PaperType> = [
  "All",
  "Meta-analysis",
  "RCT",
  "Systematic review",
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("board");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paperType, setPaperType] = useState<"All" | PaperType>("All");

  const selected = dossiers.find((item) => item.id === selectedId) ?? null;
  const filteredPapers = useMemo(() => {
    if (!selected) return [];
    return paperType === "All"
      ? selected.papers
      : selected.papers.filter((paper) => paper.type === paperType);
  }, [selected, paperType]);
  const showPrelude = screen === "board" && !selected;

  function showBoard() {
    setScreen("board");
    setSelectedId(null);
    setPaperType("All");
  }

  function showDossier(id: string) {
    setScreen("board");
    setSelectedId(id);
    setPaperType("All");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`atlas-app${showPrelude ? " has-prelude" : ""}`}>
      <header className="atlas-header">
        <button className="atlas-brand" type="button" onClick={showBoard}>
          <span>研</span>
          <strong>研寿</strong>
          <small>AI-ASSISTED HUMAN EVIDENCE ARCHIVE</small>
        </button>
        <div className="header-meta">
          <span>研究框架 v0.6</span>
          <span>最后复核 2026-07-20</span>
          <span className="draft-status">持续更新</span>
        </div>
      </header>

      {showPrelude && <NaturalPrelude />}

      <div className="atlas-layout">
        <section className="atlas-content">
          {screen === "board" && !selected && (
            <Board onSelect={showDossier} />
          )}
          {screen === "board" && selected && (
            <DossierView
              dossier={selected}
              papers={filteredPapers}
              paperType={paperType}
              onPaperType={setPaperType}
              onBack={showBoard}
            />
          )}
          {screen === "method" && <MethodView />}
          {screen === "changelog" && <ChangelogView />}
        </section>

        <ResearchRail
          selectedId={selectedId}
          screen={screen}
          onBoard={showBoard}
          onSelect={showDossier}
          onScreen={(next) => {
            setSelectedId(null);
            setScreen(next);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </main>
  );
}

function NaturalPrelude() {
  return (
    <section className="natural-prelude" aria-label="格陵兰鲨科学图版">
      <img
        src="/greenland-shark-banner.png"
        alt="铺满画面的格陵兰鲨普鲁士蓝科学线稿"
      />
    </section>
  );
}

function Board({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <div className="page-kicker">
        <span>INDEX / 01</span>
        <span>SUPPLEMENT EVIDENCE</span>
      </div>
      <div className="board-intro">
        <div>
          <p className="section-overline">TIER BOARD</p>
          <h1>补充剂证据分层</h1>
        </div>
        <p>
          这是研究优先级，不是购物清单。Tier 综合人体证据、临床相关性、可重复性、安全边界与适用条件；点击项目进入论文档案。
        </p>
      </div>

      <div className="scope-note">
        <strong>不在本榜混排</strong>
        <span>
          力量训练、有氧、睡眠与足够蛋白质属于基础干预，将在后续“行为证据库”单独建档。
        </span>
      </div>

      <div className="tier-board" aria-label="补充剂证据 Tier 榜单">
        {tierInfo.map((tier) => {
          const items = dossiers.filter((item) => item.tier === tier.tier);
          return (
            <section className={`tier-row tier-${tier.tier.toLowerCase()}`} key={tier.tier}>
              <div className="tier-definition">
                <span>{tier.tier}</span>
                <div>
                  <h2>{tier.label}</h2>
                  <p>{tier.note}</p>
                </div>
              </div>
              <div className="tier-items">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-label={`打开 ${item.name} 证据档案`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="board-footer">
        <div>
          <span>7</span>
          <p>已建档项目</p>
        </div>
        <div>
          <span>15</span>
          <p>已整理论文</p>
        </div>
        <div>
          <span>4</span>
          <p>证据层级</p>
        </div>
        <p>
          当前为框架首版。每次新增论文都应记录检索日期、研究类型、样本、周期、主要结果与局限。
        </p>
      </div>
    </>
  );
}

function DossierView({
  dossier,
  papers,
  paperType,
  onPaperType,
  onBack,
}: {
  dossier: Dossier;
  papers: Paper[];
  paperType: "All" | PaperType;
  onPaperType: (type: "All" | PaperType) => void;
  onBack: () => void;
}) {
  return (
    <>
      <button type="button" className="back-link" onClick={onBack}>
        ← 返回 Tier 总览
      </button>
      <div className="dossier-title">
        <div>
          <span className={`tier-chip tier-chip-${dossier.tier.toLowerCase()}`}>
            {dossier.tier}
          </span>
          <p>{dossier.english}</p>
          <h1>{dossier.name}</h1>
        </div>
        <span className="review-state">{dossier.status}</span>
      </div>

      <section className="verdict-block">
        <span>当前结论</span>
        <p>{dossier.verdict}</p>
      </section>

      <dl className="dossier-facts">
        <div>
          <dt>证据位置</dt>
          <dd>{dossier.tier} · {dossier.tierLabel}</dd>
        </div>
        <div>
          <dt>主要研究目标</dt>
          <dd>{dossier.target}</dd>
        </div>
        <div>
          <dt>当前论文数</dt>
          <dd>{dossier.papers.length} 篇</dd>
        </div>
      </dl>

      <section className="analysis-grid">
        <article>
          <span>01</span>
          <h2>为什么这样判级</h2>
          <p>{dossier.why}</p>
        </article>
        <article>
          <span>02</span>
          <h2>适用条件</h2>
          <p>{dossier.condition}</p>
        </article>
        <article>
          <span>03</span>
          <h2>风险与未知</h2>
          <p>{dossier.risk}</p>
        </article>
      </section>

      <section className="paper-library">
        <div className="paper-heading">
          <div>
            <p className="section-overline">PAPER LIBRARY</p>
            <h2>科学依据与数据</h2>
          </div>
          <span>{papers.length} / {dossier.papers.length} 篇</span>
        </div>

        <div className="paper-filters" role="group" aria-label="按论文类型筛选">
          {paperTypes.map((type) => (
            <button
              type="button"
              key={type}
              aria-pressed={paperType === type}
              onClick={() => onPaperType(type)}
            >
              {type === "All" ? "全部" : type}
            </button>
          ))}
        </div>

        <div className="paper-list">
          {papers.map((paper, index) => (
            <article className="paper-record" key={paper.id}>
              <div className="paper-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{paper.type}</strong>
                <small>{paper.year}</small>
              </div>
              <div className="paper-body">
                <h3>{paper.title}</h3>
                <p className="journal">{paper.journal}</p>
                <dl>
                  <div>
                    <dt>样本 / 设计</dt>
                    <dd>{paper.population}</dd>
                  </div>
                  <div>
                    <dt>周期</dt>
                    <dd>{paper.duration}</dd>
                  </div>
                </dl>
                <div className="paper-findings">
                  <div>
                    <span>主要结果</span>
                    <p>{paper.result}</p>
                  </div>
                  <div>
                    <span>局限</span>
                    <p>{paper.limitation}</p>
                  </div>
                </div>
                <a href={paper.url} target="_blank" rel="noreferrer">
                  在原始来源中查看 <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
          {papers.length === 0 && (
            <p className="empty-state">当前分类还没有论文记录。</p>
          )}
        </div>
      </section>
    </>
  );
}

function MethodView() {
  const criteria = [
    ["人体证据", "随机对照试验、系统综述与荟萃分析优先于动物和机制研究"],
    ["临床相关性", "力量、功能、疾病事件优先于单一生化指标"],
    ["可重复性", "独立团队、不同人群和更长期研究是否得到相近结果"],
    ["适用条件", "获益是否仅限缺乏、特定疾病、年龄或处方剂量"],
    ["安全与成本", "长期安全、药物相互作用、产品质量和机会成本"],
  ];

  return (
    <>
      <div className="page-kicker">
        <span>METHOD / 02</span>
        <span>VERSION 0.6</span>
      </div>
      <div className="method-page">
        <p className="section-overline">GRADING METHOD</p>
        <h1>我们如何给出 Tier</h1>
        <p className="method-lede">
          Tier 是可被新证据推翻的编辑判断。它不表示药物剂量，也不代替个人医疗决策。
        </p>
        <aside className="nature-note">
          <span>NATURAL MODEL · GREENLAND SHARK</span>
          <p>
            <strong>自然样本不是人类处方。</strong>
            格陵兰鲨的极端寿命与新近基因组研究可以帮助提出问题，但跨物种机制不能替代人体随机试验，
            更不能直接变成补充剂建议。
          </p>
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/42154556/"
            target="_blank"
            rel="noreferrer"
          >
            基因组研究 ↗
          </a>
        </aside>
        <div className="criteria-list">
          {criteria.map(([name, description], index) => (
            <div key={name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <section className="source-policy">
          <h2>来源政策</h2>
          <p>
            Bryan Johnson 与 Blueprint 用于发现候选干预，不作为疗效证据。结论优先链接 PubMed、
            期刊全文或权威指南；每条记录必须同时写出结果与局限。
          </p>
          <div>
            <a href="https://www.youtube.com/@BryanJohnson" target="_blank" rel="noreferrer">
              Bryan Johnson YouTube ↗
            </a>
            <a href="https://bryanjohnson.komi.io/" target="_blank" rel="noreferrer">
              Bryan Johnson 资料入口 ↗
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Bryan_Johnson"
              target="_blank"
              rel="noreferrer"
            >
              Bryan Johnson Wikipedia ↗
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function ChangelogView() {
  return (
    <>
      <div className="page-kicker">
        <span>CHANGELOG / 03</span>
        <span>RESEARCH LOG</span>
      </div>
      <div className="changelog-page">
        <p className="section-overline">CHANGELOG</p>
        <h1>研究更新记录</h1>
        <div className="change-entry">
          <time>2026-07-20</time>
          <div>
            <h2>v0.6 · 无字满幅格陵兰鲨图版</h2>
            <ul>
              <li>删除鲨鱼图中的标题、标注与文字装饰。</li>
              <li>取消左侧文案留白，让鲨鱼居中并接近横幅全宽。</li>
              <li>保留羊皮纸与普鲁士蓝线稿，作为纯视觉研究序章。</li>
              <li>归档 Bryan Johnson Wikipedia 页面及精确版本信息，作为背景参考而非科学证据。</li>
            </ul>
          </div>
        </div>
        <div className="change-entry">
          <time>2026-07-20</time>
          <div>
            <h2>v0.5 · 转向格陵兰鲨与蓝色科学线稿</h2>
            <ul>
              <li>撤下复杂的黑色神话背景。</li>
              <li>以格陵兰鲨作为极端自然寿命的研究象征。</li>
              <li>全站改为羊皮纸、普鲁士蓝线条与淡海蓝标注。</li>
              <li>明确自然模型不能直接外推为人类延寿方案。</li>
            </ul>
          </div>
        </div>
        <div className="change-entry">
          <time>2026-07-20</time>
          <div>
            <h2>v0.4 · 建立神话序章与科学内页</h2>
            <ul>
              <li>以吉尔伽美什寻找生命之草作为研究世界观。</li>
              <li>新增原创版画序章，但让 Tier 榜单继续进入首屏。</li>
              <li>以提托诺斯解释“寿命不等于健康寿命”。</li>
              <li>论文档案继续保持克制、清晰的阅读界面。</li>
            </ul>
          </div>
        </div>
        <div className="change-entry">
          <time>2026-07-20</time>
          <div>
            <h2>v0.3 · 更名为「研寿」</h2>
            <ul>
              <li>品牌名从功能描述收束为一份长期研究刊物的名字。</li>
              <li>AI 只作为资料整理方法，不作为证据来源或结论背书。</li>
              <li>副标题调整为“AI 辅助的人体证据档案”。</li>
            </ul>
          </div>
        </div>
        <div className="change-entry">
          <time>2026-07-20</time>
          <div>
            <h2>v0.2 · 从展示页改为证据资料库</h2>
            <ul>
              <li>建立 T1–T4 补充剂证据榜单。</li>
              <li>建立 7 个项目档案与 15 条论文记录。</li>
              <li>每篇论文补充研究类型、样本、周期、结果和局限。</li>
              <li>把 Bryan Johnson 的公开内容降级为研究线索，不再作为页面叙事中心。</li>
            </ul>
          </div>
        </div>
        <div className="next-research">
          <span>下一批研究</span>
          <p>维生素 D、镁、蛋白质补充、牛磺酸、尿石素 A，以及“行为基础证据库”。</p>
        </div>
      </div>
    </>
  );
}

function ResearchRail({
  selectedId,
  screen,
  onBoard,
  onSelect,
  onScreen,
}: {
  selectedId: string | null;
  screen: Screen;
  onBoard: () => void;
  onSelect: (id: string) => void;
  onScreen: (screen: Screen) => void;
}) {
  return (
    <aside className="research-rail" aria-label="研究导航">
      <div className="rail-heading">
        <span>研究导航</span>
        <small>RESEARCH INDEX</small>
      </div>
      <button
        type="button"
        className="rail-home"
        aria-current={screen === "board" && !selectedId ? "page" : undefined}
        onClick={onBoard}
      >
        <span>⌂</span>
        Tier 总览
      </button>

      <nav>
        {tierInfo.map((tier) => (
          <div className="rail-tier" key={tier.tier}>
            <div>
              <strong>{tier.tier}</strong>
              <span>{tier.label.split(" / ")[0]}</span>
            </div>
            {dossiers
              .filter((item) => item.tier === tier.tier)
              .map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-current={selectedId === item.id ? "page" : undefined}
                  onClick={() => onSelect(item.id)}
                >
                  <span>{item.name}</span>
                  <small>{item.papers.length}</small>
                </button>
              ))}
          </div>
        ))}
      </nav>

      <div className="rail-secondary">
        <button
          type="button"
          aria-current={screen === "method" ? "page" : undefined}
          onClick={() => onScreen("method")}
        >
          判级方法
        </button>
        <button
          type="button"
          aria-current={screen === "changelog" ? "page" : undefined}
          onClick={() => onScreen("changelog")}
        >
          更新记录
        </button>
      </div>
      <p className="rail-disclaimer">
        研究笔记，不构成个人医疗建议。
      </p>
    </aside>
  );
}
