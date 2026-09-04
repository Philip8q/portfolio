import Head from "next/head";
import Bio from "@/components/about/Bio";
import SkillsBreakdown from "@/components/about/SkillsBreakdown";
import InternshipNote from "@/components/about/InternshipNote";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Philip Omondi</title>
        <meta
          name="description"
          content="About Philip Omondi — Developer & Automation Engineer based in Nairobi."
        />
      </Head>
      <Bio />
      <SkillsBreakdown />
      <InternshipNote />
    </>
  );
}
