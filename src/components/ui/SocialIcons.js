
import { Icon } from "@iconify/react";
import { siteConfig } from "@/data/siteConfig";

export default function SocialIcons({ size = 22 }) {
  const links = [
    {
      name: "GitHub",
      url: siteConfig.socials.github,
      icon: "mdi:github",
    },
    {
      name: "LinkedIn",
      url: siteConfig.socials.linkedin,
      icon: "mdi:linkedin",
    },
    {
      name: "WhatsApp",
      url: siteConfig.whatsapp.link,
      icon: "mdi:whatsapp",
    },
    {
      name: "Email",
      url: `mailto:${siteConfig.email}`,
      icon: "mdi:email-outline",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="text-light-secondary dark:text-dark-secondary
                     hover:text-light-accent dark:hover:text-dark-accent
                     transition-colors p-1"
          aria-label={link.name}
        >
          <Icon icon={link.icon} width={size} height={size} />
        </a>
      ))}
    </div>
  );
}
