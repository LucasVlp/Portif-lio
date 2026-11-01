import Boot from "@/components/site/Boot";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Programs from "@/components/site/Programs";
import Skills from "@/components/site/Skills";
import Network from "@/components/site/Network";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import ScrollFX from "@/components/site/ScrollFX";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function Home() {
  return (
    <>
      <Boot />
      <SmoothScroll />
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Programs />
        <Skills />
        <Network />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
