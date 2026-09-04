import Image from "next/image";
import { Icon } from "@iconify/react";
import CircularText from "@/components/ui/CircularText";
import LightbulbSvg from "@/components/ui/LightbulbSvg";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20 overflow-hidden relative">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left: Profile image */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="relative w-[350px] h-[420px] md:w-[420px] md:h-[500px]">
            <Image
              src="/images/profile/7.jpeg"
              alt="Philip Omondi"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>

        {/* Right: Text content — slides in from right via CSS */}
        <div className="flex-1 text-center md:text-left animate-slide-in-right">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-tight
                         text-light-text dark:text-dark-text mb-6">
            I Build Systems That
            <br />
            Turn Leads Into
            <br />
            Real Customers.
          </h1>

          <p className="text-base md:text-lg text-light-secondary dark:text-dark-secondary max-w-lg mb-10 leading-relaxed">
            I build AI-powered lead pipelines and web tools for small businesses
            that can&apos;t compete on ad budgets. Right now I&apos;m a front-end
            engineering intern at FlyRank, working on LeadFlow &mdash; a system
            that captures, qualifies, and scores inbound leads so no opportunity
            slips through the cracks.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg
                         bg-light-text dark:bg-dark-text
                         text-white font-semibold
                         hover:opacity-90 transition-opacity"
            >
              See My Work
              <Icon icon="mdi:open-in-new" width={18} height={18} />
            </a>
            <a
              href="mailto:caysonb8@gmail.com"
              className="text-base font-medium text-light-text dark:text-dark-text
                         underline underline-offset-4
                         hover:text-light-accent dark:hover:text-dark-accent
                         transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom-left: Circular rotating text */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <CircularText />
      </div>

      {/* Bottom-right: Lightbulb */}
      <div className="absolute bottom-2 right-8 hidden lg:block">
        <LightbulbSvg />
      </div>
    </section>
  );
}
