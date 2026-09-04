import { Icon } from "@iconify/react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function InternshipNote() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <AnimatedSection>
          <div className="p-8 rounded-xl text-center
                         bg-light-accent/5 dark:bg-dark-accent/5
                         border border-light-accent/20 dark:border-dark-accent/20">
            <div className="w-16 h-16 rounded-full mx-auto mb-4
                           bg-light-accent/10 dark:bg-dark-accent/10
                           flex items-center justify-center">
              <Icon
                icon="mdi:certificate-outline"
                width={32}
                height={32}
                className="text-light-accent dark:text-dark-accent"
              />
            </div>
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
              FlyRank Internship
            </h3>
            <p className="text-sm text-light-secondary dark:text-dark-secondary max-w-md mx-auto">
              This site is part of the FlyRank internship program. Once my
              capstone (LeadFlow) is approved, an official FlyRank completion
              badge will go right here.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
