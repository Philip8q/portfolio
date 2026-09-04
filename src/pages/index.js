import Head from "next/head";
import Hero from "@/components/home/Hero";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import SkillsGrid from "@/components/home/SkillsGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Philip Omondi — Developer &amp; Automation Engineer</title>
        <meta
          name="description"
          content="Philip Omondi — Developer & Automation Engineer. Building AI-driven lead systems and n8n automations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Philip Omondi — Developer & Automation Engineer" />
        <meta
          property="og:description"
          content="Building AI-driven lead systems and n8n automations that turn inbound interest into actionable pipelines."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <ProjectsGrid />
      <SkillsGrid />
    </>
  );
}
