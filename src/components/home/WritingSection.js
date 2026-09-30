import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/data/siteConfig";

const articles = [
  {
    title: "Architecting Resilient n8n Lead Engines with Real-Time AI Scoring",
    description:
      "A technical walkthrough of how LeadFlow orchestrates webhooks, OpenRouter LLM streaming, and Supabase pipelines with automated error recovery.",
    category: "AI & Automations",
    status: "Upcoming",
    readTime: "6 min read",
    icon: "mdi:robot-outline",
  },
  {
    title: "From 17 Prompts to Full Vitest Coverage: Lessons in AI-Assisted UI",
    description:
      "Key takeaways from shipping an accessible personal expense tracker with dark mode, live state filters, and comprehensive unit tests.",
    category: "Web Engineering",
    status: "Drafting",
    readTime: "5 min read",
    icon: "mdi:code-tags",
  },
  {
    title: "Building an Autonomous Telemetry Agent: Groq, Gemini & Git Logs",
    description:
      "How to build a personal agent that aggregates weekly developer commits, evaluates stalled milestones, and produces actionable Monday morning briefs.",
    category: "AI Systems",
    status: "Planned",
    readTime: "8 min read",
    icon: "mdi:chart-timeline-variant-shimmer",
  },
];

export default function WritingSection() {
  return (
    <section id="writing" className="py-20 px-6 bg-light-card/30 dark:bg-dark-card/30 transition-colors">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-xs font-semibold uppercase tracking-wider">
              <Icon icon="mdi:pencil-outline" width={14} height={14} />
              Space For Future Posts
            </div>
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
              Writing &amp; Technical Notes
            </h2>
            <p className="text-light-secondary dark:text-dark-secondary text-base">
              Architectural breakdowns, engineering insights, and practical guides on building AI agents and production automations.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, i) => (
            <AnimatedSection key={article.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 transition-all flex flex-col h-full shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {article.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-light-secondary dark:text-dark-secondary leading-relaxed mb-6 flex-1">
                  {article.description}
                </p>

                <div className="pt-4 border-t border-light-border/60 dark:border-dark-border/60 flex items-center justify-between text-xs text-light-secondary dark:text-dark-secondary">
                  <span>{article.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-light-accent dark:text-dark-accent">
                    Coming Soon
                    <Icon icon="mdi:arrow-right" width={14} height={14} />
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Subscribe / Follow Note */}
        <AnimatedSection delay={0.3}>
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-light-accent/5 via-transparent to-light-accent/5 dark:from-dark-accent/5 dark:via-transparent dark:to-dark-accent/5 border border-light-border dark:border-dark-border text-center">
            <h4 className="text-base font-semibold text-light-text dark:text-dark-text mb-1">
              Want to read these when they drop?
            </h4>
            <p className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary mb-4">
              I share deep dives as each system ships. Connect with me on LinkedIn or GitHub for updates.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-light-text dark:bg-dark-text text-white dark:text-dark-bg text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Icon icon="mdi:linkedin" width={16} height={16} />
                Follow on LinkedIn
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-xs font-semibold hover:border-light-accent dark:hover:border-dark-accent transition-colors"
              >
                <Icon icon="mdi:github" width={16} height={16} />
                Star on GitHub
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
