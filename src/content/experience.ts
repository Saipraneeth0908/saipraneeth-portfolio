export type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "LimeIQ",
    role: "Applied Generative AI Engineer",
    period: "Dec 2024 — Present",
    current: true,
    summary:
      "LLM-powered workflows and retrieval systems for healthcare and operational intelligence use cases.",
    highlights: [
      "Designed LLM-powered workflows covering retrieval, contextual reasoning, and response generation end to end.",
      "Built RAG and semantic retrieval pipelines over structured and unstructured healthcare data using embeddings, chunking strategies, metadata-aware filtering, and contextual prompt augmentation.",
      "Developed conversational pipelines with prompt templates, structured JSON outputs, contextual memory, prompt chaining, and fallback handling.",
      "Built agentic workflows combining planning, tool calling, retrieval-assisted reasoning, and memory to automate operational tasks.",
      "Wrote Python and FastAPI services plus ETL pipelines that ingest, validate, and transform heterogeneous datasets behind retrieval, orchestration, and analytics.",
      "Improved retrieval grounding and answer consistency through prompt refinement, metadata filtering, context compression, and structured response validation.",
      "Applied NLP and predictive modeling — semantic similarity search, information extraction, regression, classification, clustering, forecasting — and surfaced results through Power BI and Tableau for operational stakeholders.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "OpenAI APIs",
      "LangChain",
      "LangGraph",
      "PostgreSQL",
      "Supabase",
      "Power BI",
      "Tableau",
    ],
  },
  {
    company: "Info Edge",
    role: "AI/ML Engineer",
    period: "Dec 2021 — Aug 2023",
    summary:
      "AI-assisted analytics, NLP workflows, and backend automation across enterprise reporting systems.",
    highlights: [
      "Built AI-assisted analytics and reporting workflows combining NLP pipelines, contextual search, and backend automation.",
      "Designed preprocessing and retrieval workflows for structured and semi-structured enterprise data feeding reporting and search applications.",
      "Built SQL-based ETL pipelines with automated validation and data-quality checks.",
      "Reduced manual operational processing effort by 65% through backend workflow automation.",
      "Applied regression, classification, clustering, forecasting, and statistical analysis to surface operational trends and inefficiencies.",
      "Delivered Tableau and Excel reporting, ran root-cause analysis on pipeline and reporting failures, and maintained documentation for the automation systems.",
    ],
    stack: ["Python", "SQL", "NLP", "ETL", "Tableau", "Excel"],
  },
  {
    company: "Wipro",
    role: "Machine Learning & Data Analyst",
    period: "May 2020 — Dec 2021",
    summary:
      "Machine learning and analytics workflows supporting enterprise reporting and process optimization.",
    highlights: [
      "Built machine learning and analytical workflows supporting enterprise reporting and operational optimization across multiple business domains.",
      "Developed anomaly detection, forecasting, and classification models alongside Python and SQL analytics pipelines.",
      "Improved enterprise process efficiency by 20% through statistical analysis and machine-learning workflows.",
      "Automated ETL pipelines consolidating enterprise datasets into centralized analytical systems.",
      "Built Tableau dashboards for KPI monitoring and prepared analytical reports for stakeholders.",
    ],
    stack: ["Python", "SQL", "scikit-learn", "ETL", "Tableau"],
  },
];
