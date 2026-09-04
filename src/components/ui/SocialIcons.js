import { Icon } from "@iconify/react";

const links = [
  {
    name: "GitHub",
    url: "https://github.com/Philip8q",
    icon: "mdi:github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/oketch-omondi/",
    icon: "mdi:linkedin",
  },
  {
    name: "Email",
    url: "mailto:caysonb8@gmail.com",
    icon: "mdi:email-outline",
  },
];

export default function SocialIcons({ size = 22 }) {
  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="text-light-secondary dark:text-dark-secondary
                     hover:text-light-text dark:hover:text-dark-text
                     transition-colors"
          aria-label={link.name}
        >
          <Icon icon={link.icon} width={size} height={size} />
        </a>
      ))}
    </div>
  );
}
