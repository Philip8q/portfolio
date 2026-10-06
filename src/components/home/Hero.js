import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import CircularText from "@/components/ui/CircularText";
import LightbulbSvg from "@/components/ui/LightbulbSvg";
import HeroShaderCanvas from "@/components/ui/HeroShaderCanvas";
import { siteConfig } from "@/data/siteConfig";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-24 pb-16 overflow-hidden relative">
      {/* Fullscreen Ambient GLSL Fragment Shader */}
      <HeroShaderCanvas className="opacity-25 dark:opacity-50 -z-10" />

      <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
        {/* Left: Profile image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center md:justify-end relative w-full"
        >
          <div className="relative w-[260px] sm:w-[350px] sm:h-[420px] md:w-[400px] md:h-[480px] h-[320px] max-w-[calc(100vw-3rem)] shadow-2xl rounded-3xl overflow-hidden ring-1 ring-light-border dark:ring-dark-border">
            <Image
              src="/images/profile/7.jpeg"
              alt="Philip Omondi"
              fill
              sizes="(max-width: 640px) 260px, (max-width: 768px) 350px, 400px"
              className="object-cover rounded-3xl"
              priority
            />
          </div>
        </motion.div>

        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Projects &amp; Automations
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-extrabold leading-[1.15] text-light-text dark:text-dark-text mb-6">
            Turning Vision Into
            <br />
            Reality With Code
            <br />
            And Design.
          </h1>

          <p className="text-base md:text-lg text-light-secondary dark:text-dark-secondary max-w-lg mb-8 leading-relaxed">
            {siteConfig.bioDescription}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg
                         bg-light-text dark:bg-dark-text
                         text-white dark:text-dark-bg font-semibold
                         hover:opacity-90 transition-opacity shadow-md w-full sm:w-auto text-sm"
            >
              See My Work
              <Icon icon="mdi:arrow-down" width={18} height={18} />
            </a>

            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg
                         border border-light-border dark:border-dark-border
                         text-light-text dark:text-dark-text font-medium
                         hover:border-light-accent dark:hover:border-dark-accent
                         hover:text-light-accent dark:hover:text-dark-accent
                         transition-colors w-full sm:w-auto text-sm"
            >
              <Icon icon="mdi:file-pdf-box" width={18} height={18} />
              Resume / CV
            </a>

            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg
                         bg-light-accent/10 dark:bg-dark-accent/10
                         text-light-accent dark:text-dark-accent font-medium
                         hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg
                         transition-all w-full sm:w-auto text-sm"
            >
              <Icon icon="mdi:calendar-check" width={18} height={18} />
              Book a Call
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom-left: Circular rotating text */}
      <div className="absolute bottom-6 left-8 hidden xl:block pointer-events-auto">
        <CircularText />
      </div>

      {/* Bottom-right: Interactive Lightbulb */}
      <div className="absolute bottom-6 right-8 hidden xl:block pointer-events-auto">
        <LightbulbSvg />
      </div>
    </section>
  );
}
