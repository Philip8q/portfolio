import { Icon } from "@iconify/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { skills } from "@/data/skills";

export default function SkillsGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2 text-center">
            What I Work With
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary mb-12 text-center max-w-lg mx-auto">
            The tools and technologies I use to build and automate.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl
                           bg-light-card dark:bg-dark-card
                           border border-light-border dark:border-dark-border
                           hover:border-light-accent/50 dark:hover:border-dark-accent/50
                           transition-colors"
              >
                <Icon
                  icon={skill.icon}
                  width={32}
                  height={32}
                  className="text-light-accent dark:text-dark-accent"
                />
                <span className="text-xs font-medium text-light-secondary dark:text-dark-secondary text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
