import SocialIcons from "@/components/ui/SocialIcons";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-light-border dark:border-dark-border">
      <div className="max-w-[1200px] mx-auto text-center">
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
          Let&apos;s work together.
        </h3>
        <p className="text-light-secondary dark:text-dark-secondary mb-8 max-w-md mx-auto">
          Got a project in mind, need automation built, or just want to connect?
          I&apos;m always happy to talk.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="mailto:caysonb8@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                       bg-light-accent dark:bg-dark-accent
                       text-white font-medium
                       hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover
                       transition-colors"
          >
            <Icon icon="mdi:email" width={20} height={20} />
            Email Me
          </a>
          <a
            href="https://wa.me/254707610964"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                       border border-light-border dark:border-dark-border
                       text-light-text dark:text-dark-text font-medium
                       hover:border-light-accent dark:hover:border-dark-accent
                       transition-colors"
          >
            <Icon icon="mdi:whatsapp" width={20} height={20} />
            WhatsApp
          </a>
        </div>

        <SocialIcons size={22} />

        <p className="mt-8 text-sm text-light-secondary dark:text-dark-secondary">
          &copy; {new Date().getFullYear()} Philip Omondi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
