import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-xl overflow-hidden
                 bg-light-card dark:bg-dark-card
                 border border-light-border dark:border-dark-border
                 hover:border-light-accent/50 dark:hover:border-dark-accent/50
                 transition-colors"
    >
      {/* Cover image */}
      <div className="h-48 bg-gradient-to-br from-light-accent/10 to-light-accent/5
                      dark:from-dark-accent/10 dark:to-dark-accent/5
                      flex items-center justify-center">
        <span className="text-4xl font-bold text-light-accent/30 dark:text-dark-accent/30">
          {project.title.charAt(0)}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-light-secondary dark:text-dark-secondary mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-2.5 py-1 rounded-full
                         bg-light-accent/10 dark:bg-dark-accent/10
                         text-light-accent dark:text-dark-accent"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-light-secondary dark:text-dark-secondary
                         hover:text-light-accent dark:hover:text-dark-accent
                         transition-colors"
            >
              <Icon icon="mdi:github" width={18} height={18} />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-light-secondary dark:text-dark-secondary
                         hover:text-light-accent dark:hover:text-dark-accent
                         transition-colors"
            >
              <Icon icon="mdi:open-in-new" width={18} height={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
