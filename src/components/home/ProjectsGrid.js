import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { projects } from "@/data/projects";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2 text-center">
            What I Build
          </h2>
          <p className="text-light-secondary dark:text-dark-secondary mb-12 text-center max-w-lg mx-auto">
            Real projects, tested and deployed — not tutorial copies.
          </p>
        </AnimatedSection>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
