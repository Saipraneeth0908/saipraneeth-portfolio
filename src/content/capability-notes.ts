/**
 * What I'd actually say about each capability, in my own words, plus the
 * visual used for it on the Expertise sphere. Keys match the item strings in
 * expertise.ts exactly.
 *   image: concept still in public/expertise/{image}.webp (+ -sm for cards)
 *   logo:  official mark in public/expertise/logos/{logo}.svg on the plinth
 *   neither: the name is set as a wordmark on the plinth (no official mark available)
 */
export type CapabilityNote = { note: string; image?: string; logo?: string };

export const capabilityNotes: Record<string, CapabilityNote> = {
  // Generative AI
  "LLM applications": {
    image: "llm-apps",
    note: "The model is the easy part. What I build is everything around it: the retrieval feeding it, the prompts shaping it, the validation checking what comes back, and the API that lets the rest of the business use it reliably.",
  },
  "Retrieval-augmented generation": {
    image: "rag",
    note: "Instead of hoping the model knows the answer, I find the few passages that actually contain it and hand those over with the question. At LimeIQ that meant answers over healthcare records that point back to the exact context they came from.",
  },
  "Prompt engineering": {
    image: "prompt-engineering",
    note: "I treat prompts like code: versioned templates, clear instructions, explicit output formats, and a few test cases I rerun every time I change a word. Small wording changes move results more than people expect.",
  },
  "Structured outputs": {
    image: "structured-outputs",
    note: "If another system has to read the model's answer, free text isn't good enough. I define a JSON schema, make the model fill it, and validate it before anything downstream touches it, so a bad response fails loudly instead of quietly.",
  },
  "Tool calling": {
    image: "tool-calling",
    note: "The model doesn't take actions itself. It picks a tool and fills in typed arguments, and my backend checks those arguments before running anything. That separation is what makes it safe to let an LLM touch real systems.",
  },
  "Context management": {
    image: "context-management",
    note: "The context window is a budget. I decide what earns a place in it — the current question, the most relevant evidence, only the memory that still matters — and drop the rest, so the model isn't drowning in noise.",
  },
  "Prompt chaining": {
    image: "prompt-chaining",
    note: "Hard questions go better as a sequence of small, checkable steps than as one giant prompt. Each step does one job, and I can see exactly where a chain went wrong when it does.",
  },
  "Conversational memory": {
    image: "conversational-memory",
    note: "For multi-turn assistants I carry earlier turns forward so follow-up questions make sense, but I keep that memory compact. Left unchecked, it grows until it crowds out the evidence the model actually needs.",
  },
  "AI agents": {
    image: "ai-agents",
    note: "An agent plans a task, takes a step, looks at the result and decides the next one. I give mine a limited set of well-defined tools and clear stopping conditions, because an agent that can do anything usually does the wrong thing.",
  },
  "Agentic workflows": {
    image: "agentic-workflows",
    note: "This is where agents meet real operations: multi-step tasks across several systems, with state saved between steps so a failure halfway through can be resumed instead of started over. LangGraph and n8n are my usual tools for wiring it together.",
  },

  // Retrieval & NLP
  Embeddings: {
    image: "embeddings",
    note: "Embeddings turn text into points in space where meaning becomes distance: passages about the same thing land close together even when they share no words. Almost every retrieval system I build starts here.",
  },
  "Semantic search": {
    image: "semantic-search",
    note: "Keyword search finds the words you typed; semantic search finds what you meant. I embed the query, look for the nearest passages, and get results that read as relevant to a person, not just a string match.",
  },
  "Vector search": {
    image: "vector-search",
    note: "Under semantic search sits a nearest-neighbour lookup over thousands of vectors. I pay attention to the index, the similarity metric and how many candidates to pull, because that's where speed and recall get traded off.",
  },
  "Metadata-aware retrieval": {
    image: "metadata-retrieval",
    note: "Before ranking anything by meaning, I filter by what we already know — document type, date, source. On healthcare data that one step removed most of the 'close but wrong' results.",
  },
  "Chunking strategies": {
    image: "chunking",
    note: "How you cut documents decides what retrieval can find. Split mid-thought and the answer is never in one piece. I chunk by document structure with a little overlap, and use different rules for different document types.",
  },
  "Context compression": {
    image: "context-compression",
    note: "Retrieved passages often carry far more text than the answer needs. I trim them to the parts that matter before they reach the model, which keeps token cost bounded and the answer focused.",
  },
  "Query optimization": {
    image: "query-optimization",
    note: "People ask vague questions. I rewrite or expand the query, add filters, or split it into parts so it actually matches how the information is stored, then retrieve against that cleaner version.",
  },
  "Semantic similarity": {
    image: "semantic-similarity",
    note: "Two sentences can look nothing alike and mean the same thing. I use similarity scores for retrieval, deduplication and matching, and I always check the threshold against real examples rather than trusting a default.",
  },
  "Information retrieval": {
    image: "information-retrieval",
    note: "Search has a long history before LLMs, and I lean on it: ranking, recall versus precision, evaluating whether the right document actually came back. A great model can't fix retrieval that missed the evidence.",
  },
  "Text classification": {
    image: "text-classification",
    note: "Routing text into the right bucket — by intent, topic or urgency — is often the first step of a larger pipeline. I've done it with classic ML models and with LLMs, and I pick whichever is cheaper for the accuracy needed.",
  },
  NLP: {
    image: "nlp",
    note: "Before LLMs I was cleaning, tokenizing and extracting information from messy enterprise text at Info Edge. That grounding still helps: most production problems are still about getting text into a usable shape.",
  },

  // Backend & Data
  Python: {
    logo: "python",
    note: "My main language for everything from data pipelines to model services. I write it to be read later: typed, tested where it matters, and split into small pieces that are easy to change.",
  },
  SQL: {
    image: "sql",
    note: "Most of the data I work with lives in tables, so SQL is daily work: building ETL, validating loads, and answering questions directly instead of pulling everything into Python first.",
  },
  FastAPI: {
    logo: "fastapi",
    note: "How I ship AI features as real services. Typed request and response models, async endpoints, and automatic docs make it quick to put a retrieval or agent workflow behind a clean API other teams can call.",
  },
  "REST APIs": {
    image: "rest-apis",
    note: "Every AI feature I've built ends up behind an API. I keep the contracts predictable — clear inputs, typed outputs, honest error responses — so the system calling it never has to guess what happened.",
  },
  "Async workflows": {
    image: "async-workflows",
    note: "LLM calls and retrieval are slow, I/O-bound work, so I run independent steps concurrently instead of one after another. It's often the simplest way to make an AI endpoint feel fast.",
  },
  PostgreSQL: {
    logo: "postgresql",
    note: "My default database. It holds application data, conversation state and metadata, and with vector support it can hold embeddings right next to the records they describe.",
  },
  Supabase: {
    logo: "supabase",
    note: "Postgres with auth, storage and APIs already set up, which lets me stand up the backend for an AI prototype in an afternoon and still keep a real database underneath.",
  },
  Snowflake: {
    logo: "snowflake",
    note: "For analytical workloads over large datasets I've worked in Snowflake, writing the SQL transformations that turn raw loads into tables analysts and models can actually use.",
  },
  "ETL pipelines": {
    image: "etl-pipelines",
    note: "Extract, validate, transform, load — with checks at every stage. At Info Edge and Wipro, automated pipelines like these replaced a lot of manual work, and they feed my retrieval systems today.",
  },
  "Data transformation": {
    image: "data-transformation",
    note: "Raw data never arrives in the shape you need. Reshaping, cleaning and standardizing it is unglamorous, but it decides whether everything downstream — reports, models, retrieval — can be trusted.",
  },
  "Structured & unstructured data": {
    image: "structured-unstructured",
    note: "Real answers usually need both: the numbers in a database and the context in documents. A lot of my retrieval work is joining those two worlds so one question can draw on each.",
  },

  // ML & Analytics
  Regression: {
    image: "regression",
    note: "When the question is 'how much', I start with regression. It's simple, explainable, and a strong baseline that more complex models have to beat before they earn their place.",
  },
  Classification: {
    image: "classification",
    note: "Predicting which category something belongs to — and being honest about the errors. I look at precision and recall, not just accuracy, because the cost of a wrong answer is rarely symmetric.",
  },
  Clustering: {
    image: "clustering",
    note: "When there are no labels, clustering shows the natural groups in the data. I've used it to segment operational records and surface patterns nobody had a name for yet.",
  },
  Forecasting: {
    image: "forecasting",
    note: "Projecting trends forward so teams can plan ahead of the numbers instead of reacting to them. I always pair a forecast with how uncertain it is.",
  },
  "Statistical modeling": {
    image: "statistical-modeling",
    note: "Before reaching for a complex model I check what the statistics already say. A distribution or a significance test often answers the question faster, and more honestly.",
  },
  "Feature engineering": {
    image: "feature-engineering",
    note: "Most of a model's quality comes from what you feed it. Turning raw fields into meaningful signals has improved my results more than switching algorithms ever has.",
  },
  "Model evaluation": {
    image: "model-evaluation",
    note: "I don't trust a model until I've tested it on data it hasn't seen, with metrics that match the real cost of mistakes. The same thinking applies to LLM outputs: test sets, not vibes.",
  },
  "Exploratory data analysis": {
    image: "eda",
    note: "The first thing I do with any dataset is look at it — distributions, gaps, outliers, odd joins. It catches problems early and usually tells me what's worth modeling at all.",
  },
  "Power BI": {
    note: "I've built Power BI reports that put model outputs and operational metrics in front of stakeholders in a form they actually use day to day.",
  },
  Tableau: {
    note: "Tableau dashboards for KPI monitoring and reporting at Wipro and Info Edge — the place where analysis finally reaches the people making decisions.",
  },

  // Development & Deployment
  "Git & GitHub": {
    logo: "github",
    note: "Everything I build is versioned, reviewed and recoverable. Small commits and clear history make it easy to see what changed when something breaks.",
  },
  "GitHub Actions": {
    logo: "githubactions",
    note: "I let CI do the repetitive checks — builds, tests, deploys — on every push, so problems surface in minutes instead of in production.",
  },
  Vercel: {
    logo: "vercel",
    note: "Where I deploy front ends and prototypes, this portfolio included. Push to main and it's live, with a preview for every change.",
  },
  n8n: {
    logo: "n8n",
    note: "A fast way to wire AI steps into real business workflows — triggers, APIs and model calls connected visually — without writing glue code for every integration.",
  },
  "CI/CD": {
    image: "ci-cd",
    note: "Every change goes through the same automated path: build, test, then deploy. It makes shipping boring, which is exactly what you want.",
  },
  "API integration": {
    image: "api-integration",
    note: "AI systems are only useful once they're connected to the tools people already use. I spend a lot of time on clean integrations: auth, retries, rate limits and clear error handling.",
  },
  "Cloud deployment": {
    image: "cloud-deployment",
    note: "Getting from 'works on my laptop' to a running service: configuration, environment secrets, logging, and making sure it behaves the same way in the cloud as it did locally.",
  },
  "Rapid AI prototyping": {
    image: "rapid-prototyping",
    note: "I like to get a working version in front of people quickly, learn what actually matters, and then harden that path — instead of perfecting something nobody needed.",
  },

  // AI Frameworks & Tools
  "OpenAI APIs": {
    note: "My most-used model API: chat completions, structured outputs, tool calling and embeddings behind most of the systems I've shipped.",
  },
  "Claude APIs": {
    logo: "claude",
    note: "I use Claude for long-context reasoning and careful instruction-following, and I keep my pipelines model-agnostic so I can pick the best model for each task.",
  },
  LangChain: {
    logo: "langchain",
    note: "Useful building blocks for retrieval and prompt pipelines — loaders, splitters, retrievers. I use the parts that save time and write plain code where its abstractions get in the way.",
  },
  LangGraph: {
    logo: "langgraph",
    note: "My go-to for agents that need real control flow: explicit steps, branching, loops and saved state, so I can see and test exactly how a workflow moves.",
  },
  "Hugging Face Transformers": {
    logo: "huggingface",
    note: "For open models — embeddings, classifiers and NLP tasks I'd rather run myself than send to an external API.",
  },
  "GitHub Copilot": {
    logo: "githubcopilot",
    note: "An everyday pair programmer for boilerplate and tests. It speeds up the typing; the design decisions stay mine.",
  },
  Cursor: {
    logo: "cursor",
    note: "My editor for AI-assisted development: working across a whole codebase with the model in the loop, while I review every change it proposes.",
  },
  Codex: {
    note: "I use coding agents for well-scoped tasks — refactors, tests, migrations — and review the results like I'd review a teammate's pull request.",
  },
  "VS Code": {
    note: "Home base for writing, debugging and running everything else on this list.",
  },
};

/** One key image per expertise layer, in expertise.ts order. */
export const layerImages = ["layer-genai", "layer-retrieval", "layer-backend", "layer-ml", "layer-deploy", "layer-tools"];
