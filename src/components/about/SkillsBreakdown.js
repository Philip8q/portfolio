import { Icon } from "@iconify/react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const areas = [
  {
    title: "Build AI Systems",
    description:
      "Lead scoring, streaming chat interfaces, tool-augmented LLMs. I build systems that talk to people, ask the right questions, and make decisions in real time.",
    icon: "mdi:brain",
  },
  {
    title: "Automate Workflows",
    description:
      "This is where I started. n8n pipelines, webhook integrations, scheduled agents, error handling. If a process repeats more than twice, it should probably run itself.",
    icon: "mdi:cog-outline",
  },
  {
    title: "Ship Web Apps",
    description:
      "Next.js, React, accessible UI, responsive design. From an idea to a live URL people can actually use. Deployed on Vercel and Netlify.",
    icon: "mdi:rocket-launch-outline",
  },
];

export default function SkillsBreakdown() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-12 text-center">
            What I Do
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <AnimatedSection key={area.title} delay={i * 0.1}>
              <div className="p-8 rounded-xl
                             bg-light-card dark:bg-dark-card
                             border border-light-border dark:border-dark-border
                             hover:border-light-accent/50 dark:hover:border-dark-accent/50
                             transition-colors text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4
                               bg-light-accent/10 dark:bg-dark-accent/10
                               flex items-center justify-center">
                  <Icon
                    icon={area.icon}
                    width={28}
                    height={28}
                    className="text-light-accent dark:text-dark-accent"
                  />
                </div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-light-secondary dark:text-dark-secondary">
                  {area.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
