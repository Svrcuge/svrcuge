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
  IdentityCardSection,
  TransparencySection,
  DonorWall,
  FAQ,
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
        <StatusSection dict={dict} />
        <BuildSection dict={dict} />
        <VisionSection dict={dict} />
        <ReachSection dict={dict} />
        <Roadmap dict={dict} />
        <FirstCircleSection dict={dict} locale={locale} />
        <CoffeeSection dict={dict} />
        <IdentityCardSection dict={dict} />
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
