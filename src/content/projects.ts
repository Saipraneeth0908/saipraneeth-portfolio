export type ProjectTheme = {
  primary: string;
  secondary: string;
  glow: string;
};

export type ProofAsset = {
  title: string;
  caption: string;
  src: string;
  type: "Dashboard" | "Workflow" | "Architecture" | "Pipeline";
};

export type Project = {
  slug: string;
  company: string;
  period: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  role: string;
  stakeholderUse: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  proof: ProofAsset[];
  theme: ProjectTheme;
  dataSources: string[];
  owned: string[];
};

export const projects: Project[] = [
  {
    slug: "wipro",
    company: "Wipro",
    period: "May 2020 - Dec 2021",
    title: "Banking Customer Churn Intelligence",
    eyebrow: "Banking analytics / retention / risk",
    summary:
      "One of the early projects that felt like a real data bootcamp: messy, high-volume banking data, direct stakeholder conversations, and analytics that had to become something useful for decision-making.",
    problem:
      "Customer behavior signals were spread across call logs, forms, reviews, transactional data, and structured customer records. Stakeholders needed a way to understand churn, fraud, and default risk at operational scale.",
    role:
      "I worked inside a centralized data team across the full lifecycle: data preparation, ETL support, feature building, analysis, modeling, and dashboarding for stakeholder-facing decision workflows.",
    stakeholderUse:
      "Business teams used the work to understand customer behavior, track at-risk segments, and translate complex patterns into retention and risk-focused decisions.",
    tools: ["Python", "SQL", "Power BI", "Pandas", "NumPy", "scikit-learn", "Segmentation"],
    metrics: [
      { label: "Experience world", value: "Banking" },
      { label: "Core workflow", value: "Churn" },
      { label: "Output layer", value: "BI + model" },
    ],
    proof: [
      {
        title: "Wipro Customer Churn Dashboard",
        caption:
          "Power BI-style view for churn rate, high-risk customer groups, retention signals, and segment performance.",
        src: "/proof/wipro-churn-dashboard.png",
        type: "Dashboard",
      },
      {
        title: "Wipro Churn Prediction Model Workflow",
        caption:
          "Feature engineering, training, scoring, and retention action flow for customer churn probability.",
        src: "/proof/wipro-model-workflow.png",
        type: "Workflow",
      },
    ],
    theme: {
      primary: "#36c5f0",
      secondary: "#e6b86a",
      glow: "rgba(54, 197, 240, 0.28)",
    },
    dataSources: [
      "Customer demographics",
      "Transaction patterns",
      "Product holdings",
      "Support interactions",
      "Retention outcomes",
    ],
    owned: [
      "Hands-on work across ingestion, ETL, analysis, and visualization",
      "Model-ready feature preparation across multiple customer data sources",
      "Dashboard storytelling for churn, fraud, and lending-related signals",
    ],
  },
  {
    slug: "info-edge",
    company: "Info Edge",
    period: "Dec 2021 - Aug 2023",
    title: "OCR Healthcare Document Processing",
    eyebrow: "Document intelligence / OCR / patient data",
    summary:
      "This was where the work became deeper and more sensitive: healthcare data with more complexity per column, tighter domain expectations, and a clear need to turn scattered records into something doctors could actually use.",
    problem:
      "Patient history lived across physical files, scanned documents, and inconsistent digital records, which made retrieval difficult and forced doctors and staff to work without a unified view.",
    role:
      "My role focused on the data layer: extracting information from scanned and physical documents, cleaning and structuring it, and helping shape the searchable dashboard experience around the resulting data.",
    stakeholderUse:
      "Doctors and hospital teams could search for patients by ID, review structured history, and use a cleaner record foundation for lookup, reporting, and day-to-day decisions.",
    tools: ["Python", "OCR", "Regex", "PyMuPDF", "Pandas", "PySpark", "Polars", "SQL"],
    metrics: [
      { label: "Experience world", value: "Healthcare" },
      { label: "Core workflow", value: "OCR" },
      { label: "Output layer", value: "Structured data" },
    ],
    proof: [
      {
        title: "Info Edge OCR & Document Processing Pipeline",
        caption:
          "Document intake, OCR pass, regex parsing, normalization, validation, and structured output flow.",
        src: "/proof/infoedge-ocr-pipeline.png",
        type: "Pipeline",
      },
      {
        title: "Info Edge Patient Lookup Workspace",
        caption:
          "Conceptual lookup layer for normalized patient attributes, document status, and exception queues.",
        src: "/proof/infoedge-patient-lookup.png",
        type: "Dashboard",
      },
    ],
    theme: {
      primary: "#9b8cff",
      secondary: "#5ff6e8",
      glow: "rgba(155, 140, 255, 0.28)",
    },
    dataSources: [
      "Scanned patient records",
      "Digital PDFs",
      "Hospital lookup fields",
      "Extracted text blocks",
      "Validation exceptions",
    ],
    owned: [
      "OCR and extraction work using PyMuPDF, regex, and document-processing approaches",
      "Structuring and optimization with Pandas, NumPy, PySpark, and Polars",
      "Cross-functional delivery of a patient lookup and high-risk support workflow",
    ],
  },
  {
    slug: "kaiser",
    company: "Kaiser Permanente",
    period: "Dec 2024 - Present",
    title: "Member Churn & Satisfaction Analytics",
    eyebrow: "Healthcare analytics / ETL / reporting",
    summary:
      "A different level of learning altogether: working inside the complexity of U.S. healthcare, joining an active team quickly, and turning messy CMS-related satisfaction and member data into usable reporting and modeling workflows.",
    problem:
      "Member satisfaction and experience data was arriving from systems like Medallia, CX platforms, and CRM sources, often with gaps, inconsistencies, and different assumptions across the pipeline.",
    role:
      "I profiled the data, identified inconsistencies, built ETL and transformation workflows with Python, SQL, and dbt, and then moved into modeling and dashboarding for member satisfaction and churn insights.",
    stakeholderUse:
      "Stakeholders used the work to monitor satisfaction, understand churn pressure, explore scenario-based questions, and make more grounded decisions around member experience.",
    tools: ["Python", "SQL", "Tableau", "Power BI", "ETL", "Data validation", "Segmentation"],
    metrics: [
      { label: "Experience world", value: "Healthcare" },
      { label: "Core workflow", value: "ETL" },
      { label: "Output layer", value: "Tableau BI" },
    ],
    proof: [
      {
        title: "Kaiser Member Churn & Satisfaction Dashboard",
        caption:
          "Tableau-style dashboard for churn, satisfaction drivers, member segments, and reporting trends.",
        src: "/proof/kaiser-member-dashboard.png",
        type: "Dashboard",
      },
      {
        title: "Kaiser ETL Architecture",
        caption:
          "Multi-source member data pipeline with staging, validation, transformation, and analytics marts.",
        src: "/proof/kaiser-etl-architecture.png",
        type: "Architecture",
      },
    ],
    theme: {
      primary: "#5ff6e8",
      secondary: "#9b8cff",
      glow: "rgba(95, 246, 232, 0.24)",
    },
    dataSources: [
      "Member surveys",
      "CRM records",
      "Experience platform data",
      "Operational reporting tables",
      "Churn and satisfaction indicators",
    ],
    owned: [
      "Profiling, validation, and standardization of CMS-related member experience data",
      "Regression, correlation, and clustering work in Python and R",
      "Scenario-based dashboards in Power BI and Tableau plus ongoing model refinement",
    ],
  },
];

export const allProofAssets = projects.flatMap((project) =>
  project.proof.map((asset) => ({
    ...asset,
    project: project.company,
    theme: project.theme,
  })),
);
