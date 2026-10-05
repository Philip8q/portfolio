import Head from "next/head";
import Hero from "@/components/home/Hero";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import SkillsGrid from "@/components/home/SkillsGrid";
import ContactSection from "@/components/home/ContactSection";
import { siteConfig } from "@/data/siteConfig";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={siteConfig.name} />

        {/* Open Graph / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.siteUrl} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={`${siteConfig.siteUrl}/images/profile/7.jpeg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteConfig.siteUrl} />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={`${siteConfig.siteUrl}/images/profile/7.jpeg`} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <ProjectsGrid />
      <SkillsGrid />
      <ContactSection />
    </>
  );
}
