import AnimatedSection from "@/components/ui/AnimatedSection";

const paragraphs = [
  `I'm Philip Omondi, based in Nairobi. I got into tech through n8n automation
  — building workflows that actually do things instead of just looking
  impressive. That naturally led me into web development, and now I sit at the
  intersection of both: code that automates real business processes.`,

  `I'm currently a front-end engineering intern at FlyRank. My capstone project,
  LeadFlow, is an AI lead qualification system for small Kenyan real estate
  agencies. The idea came from a real problem: small brokerage owners spend
  over $1,000 a month on Meta ads, and half the leads that come through
  Instagram or WhatsApp never get followed up. LeadFlow captures those leads,
  qualifies them with an AI chat, scores them in real time, and feeds them into
  a pipeline — all orchestrated through n8n workflows I built from scratch.`,

  `Before LeadFlow, I built a personal expense tracker using React and
  AI-assisted development. It started as a simple idea, but the process taught
  me a lot about structuring prompts, reviewing AI-generated code critically,
  and shipping something that actually works. I also built a Weekly Review
  Assistant — a personal n8n agent that monitors my own git commits and
  workflow logs, then generates an honest report every Monday on what shipped,
  what got stuck, and what needs attention next.`,

  `I learn by building. Every project on this site is real, tested, and
  deployed. No tutorial copies, no placeholder work. If something is listed
  here, I can walk you through every file.`,
];

export default function Bio() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-8 text-center">
            About Me
          </h2>
        </AnimatedSection>

        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <p className="text-light-secondary dark:text-dark-secondary leading-relaxed">
                {p}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
