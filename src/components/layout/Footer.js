import SocialIcons from "@/components/ui/SocialIcons";
import { Icon } from "@iconify/react";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-light-border dark:border-dark-border bg-light-card/40 dark:bg-dark-card/40 transition-colors">
      <div className="max-w-[1200px] mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-3">
          Let&apos;s build something together.
        </h3>
        <p className="text-light-secondary dark:text-dark-secondary mb-8 max-w-md mx-auto text-sm sm:text-base">
          Got an automation pipeline, AI project, or engineering role? Let&apos;s connect.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                       bg-light-accent dark:bg-dark-accent
                       text-white dark:text-dark-bg font-semibold
                       hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto text-sm"
          >
            <Icon icon="mdi:email" width={18} height={18} />
            Email Me
          </a>

          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                       border border-light-border dark:border-dark-border
                       text-light-text dark:text-dark-text font-medium
                       hover:border-light-accent dark:hover:border-dark-accent
                       hover:text-light-accent dark:hover:text-dark-accent
                       transition-colors w-full sm:w-auto text-sm"
          >
            <Icon icon="mdi:calendar-check" width={18} height={18} />
            Book a Call
          </a>

          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                       border border-light-border dark:border-dark-border
                       text-light-text dark:text-dark-text font-medium
                       hover:border-light-accent dark:hover:border-dark-accent
                       hover:text-light-accent dark:hover:text-dark-accent
                       transition-colors w-full sm:w-auto text-sm"
          >
            <Icon icon="mdi:file-pdf-box" width={18} height={18} />
            Download CV
          </a>
        </div>

        <div className="flex justify-center mb-8">
          <SocialIcons size={22} />
        </div>

        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          © {new Date().getFullYear()} {siteConfig.name}. Designed &amp; built with Next.js &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
