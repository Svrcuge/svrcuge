import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  CrowdfundingSection,
  StatusSection,
  BuildSection,
  VisionSection,
  ReachSection,
  Roadmap,
  FirstCircleSection,
  CoffeeSection,
  TransparencySection,
  DonorWall,
  FAQ,
  MapSection,
  SocialSection,
  ShareSection,
} from "@/components/Sections";
import PartnerSection from "@/components/PartnerSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        <CrowdfundingSection dict={dict} locale={locale} />
        <MapSection dict={dict} />
        <StatusSection dict={dict} />
        <BuildSection dict={dict} />
        <VisionSection dict={dict} />
        <ReachSection dict={dict} />
        <SocialSection dict={dict} />
        <ShareSection dict={dict} locale={locale} />
        <Roadmap dict={dict} />
        <FirstCircleSection dict={dict} locale={locale} />
        <CoffeeSection dict={dict} />
<PartnerSection dict={dict} locale={locale} />
        <TransparencySection dict={dict} />
        <DonorWall dict={dict} locale={locale} />
        <FAQ dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
      <StickyCTA dict={dict} locale={locale} />
    </>
  );
}
