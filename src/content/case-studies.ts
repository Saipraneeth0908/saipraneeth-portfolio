export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  problem: string;
  approach: string;
  workflow: string[];
  technologies: string[];
  challenges: string[];
  outcome: string;
};

/**
 * Representative engineering work from professional roles.
 * Descriptions are generalized: no client names, confidential data,
 * proprietary metrics, or live links.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "healthcare-rag",
    title: "Healthcare Semantic Retrieval & RAG System",
    context: "LimeIQ — Applied Generative AI Engineer",
    problem:
      "Relevant healthcare information was spread across structured records and unstructured documents. Keyword lookup returned too much of the wrong thing, and answers generated without grounded context could not be trusted for operational use.",
    approach:
      "Built a retrieval layer in front of the model rather than relying on prompt size. Documents are chunked with strategy-specific rules, embedded, and stored alongside metadata so retrieval can be filtered before ranking. Retrieved context is compressed and assembled into a prompt with explicit grounding instructions and a structured response schema.",
    workflow: [
      "Ingestion and validation of structured and unstructured sources",
      "Chunking with metadata extraction per document type",
      "Embedding generation and vector indexing",
      "Metadata-filtered retrieval, then semantic ranking",
      "Context compression and prompt augmentation",
      "Structured response generation with grounding checks",
    ],
    technologies: ["Python", "FastAPI", "OpenAI APIs", "LangChain", "PostgreSQL", "Embeddings"],
    challenges: [
      "Chunk boundaries that split clinical context and degraded retrieval quality",
      "Broad queries pulling semantically close but contextually irrelevant passages",
      "Keeping token cost bounded as retrieved context grew",
    ],
    outcome:
      "Retrieval became filterable and repeatable: queries resolve against a narrowed candidate set instead of the full corpus, and responses cite the context they were grounded in.",
  },
  {
    slug: "conversational-operational-intelligence",
    title: "Conversational Operational Intelligence Assistant",
    context: "LimeIQ — Applied Generative AI Engineer",
    problem:
      "Operational questions required moving between reports, dashboards, and source systems. A conversational interface only helps if it holds context across turns and fails predictably when it cannot answer.",
    approach:
      "Designed a conversational pipeline around prompt templates and a structured output contract, so every response is parseable rather than free text. Contextual memory carries prior turns forward, prompt chaining breaks multi-part questions into ordered steps, and a fallback path handles low-confidence retrieval instead of guessing.",
    workflow: [
      "Intent and scope resolution from the user turn",
      "Memory retrieval for prior conversational context",
      "Retrieval-assisted context assembly",
      "Prompt chaining for multi-step questions",
      "Structured JSON response with validation",
      "Fallback response when confidence is insufficient",
    ],
    technologies: ["Python", "FastAPI", "OpenAI APIs", "Structured outputs", "PostgreSQL", "Supabase"],
    challenges: [
      "Contextual memory growing until it crowded out retrieved evidence",
      "Free-form model output breaking downstream parsing",
      "Distinguishing “no answer available” from a confidently wrong answer",
    ],
    outcome:
      "Conversations stay coherent across turns and downstream systems consume validated JSON rather than parsing prose, with an explicit fallback instead of a fabricated response.",
  },
  {
    slug: "agentic-workflow-automation",
    title: "Agentic Workflow Automation System",
    context: "LimeIQ — Applied Generative AI Engineer",
    problem:
      "Recurring operational tasks spanned several systems and were handled manually. A single prompt could not complete them, because each step depended on the result of the previous one.",
    approach:
      "Built planner-style execution flows where the model decomposes a task, then calls typed tools to act. Each tool is a backend function with a defined schema, so the model selects and parameterizes actions instead of generating side effects. Retrieval supplies reasoning context, and intermediate state is written back to memory between steps.",
    workflow: [
      "Task decomposition into an ordered plan",
      "Tool selection with schema-validated arguments",
      "Retrieval-assisted reasoning at each step",
      "Backend tool execution through FastAPI services",
      "Intermediate state written to memory",
      "Result validation and workflow completion",
    ],
    technologies: ["Python", "FastAPI", "LangGraph", "Tool calling", "n8n", "OpenAI APIs"],
    challenges: [
      "Plans that drifted or looped when a tool returned an unexpected result",
      "Validating tool arguments before executing anything with real effects",
      "Keeping partial progress recoverable when a step failed mid-workflow",
    ],
    outcome:
      "Multi-step operational tasks run as validated tool sequences with recoverable intermediate state, rather than as manual handoffs between systems.",
  },
];
