import Head from "next/head";
import Bio from "@/components/about/Bio";
import SkillsBreakdown from "@/components/about/SkillsBreakdown";
import InternshipNote from "@/components/about/InternshipNote";
import { siteConfig } from "@/data/siteConfig";

export default function About() {
  return (
    <>
      <Head>
        <title>About | {siteConfig.name}</title>
        <meta
          name="description"
          content={`About ${siteConfig.name}, ${siteConfig.tagline} based in Nairobi. Building AI driven systems and n8n automations.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Social */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/about`} />
        <meta property="og:title" content={`About | ${siteConfig.name}`} />
        <meta
          property="og:description"
          content={`About ${siteConfig.name}, ${siteConfig.tagline} based in Nairobi. Learn about my journey, AI systems, and automations.`}
        />
        <meta property="og:image" content={`${siteConfig.siteUrl}/images/profile/7.jpeg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About | ${siteConfig.name}`} />
        <meta
          name="twitter:description"
          content={`About ${siteConfig.name}, Developer and Automation Engineer.`}
        />
        <meta name="twitter:image" content={`${siteConfig.siteUrl}/images/profile/7.jpeg`} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <Bio />
      <SkillsBreakdown />
      <InternshipNote />
    </>
  );
}
