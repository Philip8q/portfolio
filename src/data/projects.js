export const projects = [
  {
    id: 1,
    title: "LeadFlow",
    description:
      "AI lead qualification system for small real estate agencies. Captures inbound interest from web forms and webhooks, runs it through a streaming AI chat that asks the right questions, then scores and routes it into a pipeline. Built as my FlyRank capstone.",
    tech: ["Next.js", "AI SDK", "OpenRouter", "n8n", "Supabase"],
    github: "https://github.com/Philip8q/leadflow",
    live: "https://leadflow.vercel.app",
    image: "/images/projects/leadflow.svg",
  },
  {
    id: 2,
    title: "Expense Tracker",
    description:
      "A personal expense tracker I built from scratch using AI-assisted development. Add, edit, and delete expenses with validation, filter by category or month, see dashboard stats, toggle dark mode. Full Vitest test suite and accessibility pass.",
    tech: ["React", "Vite", "CSS Modules", "Vitest"],
    github: "https://github.com/Philip8q/expense-tracker",
    live: "https://philip8q.github.io/expense-tracker/",
    image: "/images/projects/expense-tracker.svg",
  },
  {
    id: 3,
    title: "Weekly Review Assistant",
    description:
      "A personal n8n agent that watches my GitHub commits and workflow execution logs, then generates an honest weekly report every Monday. What shipped, what got stuck, what to focus on next. Built with Groq and Gemini for the AI summarization layer.",
    tech: ["n8n", "Groq", "Gemini", "GitHub API"],
    github:
      "https://github.com/Philip8q/leadflow/blob/main/docs/ai-fluency/personal-agent/WEEKLY_REVIEW_ASSISTANT_SPEC.md",
    live: null,
    image: "/images/projects/weekly-review.svg",
  },
];
