import { defineConfig } from "vitepress";

export default defineConfig({
  base: process.env.DOCS_BASE ?? "/",
  lang: "zh-CN",
  title: "研寿笔记",
  description: "本地优先、来源可追溯的长寿研究文档库",
  cleanUrls: process.env.DOCS_DEPLOY !== "1",
  lastUpdated: true,
  ignoreDeadLinks: [/supplements\.csv$/],
  head: [
    ["meta", { name: "theme-color", content: "#f6f8f8" }],
  ],
  themeConfig: {
    nav: [
      { text: "补剂目录", link: "/catalog/supplements" },
      { text: "已评审档案", link: "/dossiers/" },
      { text: "主题地图", link: "/topics/" },
      { text: "人物案例", link: "/cases/" },
      { text: "产品质量", link: "/products/" },
      { text: "论文库", link: "/papers/existing-evidence-library" },
      { text: "研究方法", link: "/methods/evidence-grading" },
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "没有找到相关文档",
            resetButtonTitle: "清除查询",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    sidebar: [
      {
        text: "开始",
        items: [
          { text: "知识库首页", link: "/" },
          { text: "每日方案", link: "/daily-protocol" },
          { text: "四项前沿补剂计划", link: "/frontier-four-rollout-2026" },
          { text: "饮食记录", link: "/diet-log" },
          { text: "差距分析与行动计划", link: "/gap-analysis" },
          { text: "我的化验记录", link: "/my-lab-results" },
          { text: "训练计划", link: "/training-plan" },
          { text: "维护说明", link: "/README" },
        ],
      },
      {
        text: "补剂目录",
        items: [
          { text: "完整候选库", link: "/catalog/supplements" },
        ],
      },
      {
        text: "主题地图",
        collapsed: false,
        items: [
          { text: "主题索引", link: "/topics/" },
          { text: "NAD⁺ 代谢轴", link: "/topics/nad-pathway" },
          { text: "睡前不进食原理", link: "/topics/fasting-before-sleep" },
          { text: "冲绳 vs Bryan", link: "/topics/okinawa-vs-bryan" },
        ],
      },
      {
        text: "人物案例",
        collapsed: false,
        items: [
          { text: "案例索引", link: "/cases/" },
          { text: "陈传多", link: "/cases/chuando-tan" },
          { text: "吕良伟", link: "/cases/ray-lui" },
          { text: "Edson Brandão", link: "/cases/edson-brandao" },
          { text: "Bryan 的一天与一周", link: "/cases/bryan-johnson-daily" },
          { text: "Bryan 当前方案", link: "/sources/bryan-johnson-current-protocol" },
          { text: "Peter Attia 方案", link: "/cases/peter-attia-protocol" },
          { text: "Andrew Huberman 方案", link: "/cases/andrew-huberman-protocol" },
        ],
      },
      {
        text: "已评审档案",
        collapsed: false,
        items: [
          { text: "档案索引", link: "/dossiers/" },
          { text: "肌酸", link: "/dossiers/creatine" },
          { text: "DHA / EPA", link: "/dossiers/omega3" },
          { text: "可溶性膳食纤维", link: "/dossiers/soluble-fiber" },
          { text: "辅酶 Q10", link: "/dossiers/coq10" },
          { text: "维生素 C", link: "/dossiers/vitamin-c" },
          { text: "维生素 D3", link: "/dossiers/vitamin-d3" },
          { text: "镁", link: "/dossiers/magnesium" },
          { text: "NMN / NR", link: "/dossiers/nmn" },
          { text: "亚精胺", link: "/dossiers/spermidine" },
          { text: "麦角硫因", link: "/dossiers/ergothioneine" },
          { text: "PQQ", link: "/dossiers/pqq" },
          { text: "Ca-AKG", link: "/dossiers/ca-akg" },
           { text: "GLP-1 受体激动剂", link: "/dossiers/glp1-ra" },
        ],
      },
      {
        text: "产品质量",
        collapsed: false,
        items: [
          { text: "产品档案说明", link: "/products/" },
          {
            text: "7 种补剂购买指南",
            link: "/products/buying-guide-7-supplements-2026-07-21",
          },
          {
            text: "DHA / EPA 品牌梯队",
            link: "/products/omega3-brand-tiers-2026-07-20",
          },
          {
            text: "肌酸品牌梯队",
            link: "/products/creatine-brand-tiers-2026-07-21",
          },
          {
            text: "镁品牌梯队",
            link: "/products/magnesium-brand-tiers-2026-07-21",
          },
          {
            text: "维生素 D3 品牌梯队",
            link: "/products/vitamin-d3-brand-tiers-2026-07-21",
          },
          {
            text: "NMN / NR 品牌梯队",
            link: "/products/nmn-nr-brand-tiers-2026-07-21",
          },
          {
            text: "NAD+ 17款测评（石头哥）",
            link: "/products/nad-supplement-17-review-2025",
          },
        ],
      },
      {
        text: "论文与来源",
        collapsed: false,
        items: [
          { text: "现有论文库", link: "/papers/existing-evidence-library" },
          {
            text: "D/镁/纤维论文批次",
            link: "/papers/research-batch-2026-07-20-vitamin-d-magnesium-fiber",
          },
          {
            text: "维生素D与自身免疫病",
            link: "/papers/vitamin-d-autoimmune-2026-07-21",
          },
          {
            text: "维C抑制ACSL4铁衰老",
            link: "/papers/vitamin-c-acsl4-ferroaging-2026",
          },
          { text: "Bryan 的一天与一周", link: "/cases/bryan-johnson-daily" },
          { text: "Bryan 当前方案", link: "/sources/bryan-johnson-current-protocol" },
          { text: "用户候选清单", link: "/sources/user-candidate-list-2026-07-20" },
          { text: "原始快照清单", link: "/sources/source-manifest" },
          { text: "AI4L 上游记录", link: "/sources/ai4l-upstream" },
          {
            text: "Omega-3 产品来源",
            link: "/sources/omega3-product-sources-2026-07-20",
          },
          {
            text: "前沿候选来源批次",
            link: "/sources/frontier-candidates-sources-2026-07-20",
          },
          {
            text: "NAD⁺ 主题来源批次",
            link: "/sources/nad-pathway-sources-2026-07-20",
          },
          {
            text: "陈传多案例来源",
            link: "/sources/chuando-tan-sources-2026-07-21",
          },
          {
            text: "吕良伟案例来源",
            link: "/sources/ray-lui-sources-2026-07-21",
          },
          {
            text: "Edson Brandão 案例来源",
            link: "/sources/edson-brandao-sources-2026-07-21",
          },
          {
            text: "维生素D免疫来源",
            link: "/sources/vitamin-d-autoimmune-sources-2026-07-21",
          },
        ],
      },
      {
        text: "档案审计",
        collapsed: false,
        items: [
          { text: "审计索引", link: "/audits/" },
          { text: "维生素 D3 审计", link: "/audits/vitamin-d3-2026-07-21" },
          { text: "NMN / NR 审计", link: "/audits/nmn-nr-2026-07-20" },
          { text: "亚精胺审计", link: "/audits/spermidine-2026-07-20" },
          { text: "PQQ 审计", link: "/audits/pqq-2026-07-20" },
          { text: "Ca-AKG 审计", link: "/audits/ca-akg-2026-07-20" },
        ],
      },
      {
        text: "研究方法",
        collapsed: true,
        items: [
          { text: "证据判级", link: "/methods/evidence-grading" },
          { text: "来源政策", link: "/methods/source-policy" },
          { text: "标准工作流", link: "/methods/research-workflow" },
          { text: "AI4L 本地化审计", link: "/methods/ai4l-adaptation" },
          { text: "产品质量判级", link: "/methods/product-quality-grading" },
        ],
      },
      {
        text: "研究日志",
        collapsed: true,
        items: [
          {
            text: "知识库初始化",
            link: "/research-log/2026-07-20-knowledge-base-bootstrap",
          },
          {
            text: "文档前端选型",
            link: "/research-log/2026-07-20-docs-frontend-decision",
          },
          {
            text: "D/镁/纤维评审",
            link: "/research-log/2026-07-20-vitamin-d-magnesium-fiber-review",
          },
          {
            text: "维生素D与自身免疫病",
            link: "/research-log/2026-07-21-vitamin-d-autoimmune-update",
          },
          {
            text: "普通读者档案格式",
            link: "/research-log/2026-07-20-reader-first-dossier-format",
          },
          {
            text: "AI4L 方法接入",
            link: "/research-log/2026-07-20-ai4l-integration",
          },
          {
            text: "Omega-3 产品梯队",
            link: "/research-log/2026-07-20-omega3-product-tiers",
          },
          {
            text: "前沿候选第二阶段",
            link: "/research-log/2026-07-20-frontier-longevity-phase-2",
          },
          {
            text: "吕良伟案例核查",
            link: "/research-log/2026-07-21-ray-lui-case",
          },
          {
            text: "Edson Brandão 案例核查",
            link: "/research-log/2026-07-21-edson-brandao-case",
          },
          {
            text: "7 种补剂购买指南",
            link: "/research-log/2026-07-21-buying-guide-7-supplements",
          },
        ],
      },
      {
        text: "模板",
        collapsed: true,
        items: [
          { text: "干预档案模板", link: "/templates/intervention-dossier" },
          { text: "论文记录模板", link: "/templates/paper-record" },
          { text: "档案审计模板", link: "/templates/intervention-audit" },
          { text: "人物案例模板", link: "/templates/case-dossier" },
        ],
      },
    ],
    outline: {
      level: [2, 3],
      label: "本页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    lastUpdated: {
      text: "最后更新",
    },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "文档目录",
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换浅色模式",
    darkModeSwitchTitle: "切换深色模式",
    footer: {
      message: "研究笔记，不构成个人医疗建议。",
      copyright: "本地知识库优先",
    },
  },
});















