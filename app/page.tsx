import Cursor from "@/components/site/Cursor";
import ScrollReveal from "@/components/site/ScrollReveal";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import About from "@/components/site/About";
import Properties from "@/components/site/Properties";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import BlogPreview from "@/components/site/BlogPreview";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Team from "@/components/site/Team";
import DisclaimerBar from "@/components/site/DisclaimerBar";
import Testimonials from "@/components/site/Testimonials";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-black">
      <Cursor/><ScrollReveal/><Navbar/><Hero/><Marquee/><About/><DisclaimerBar/><Properties/>
      <Services/><Team/><Testimonials/><Process/><BlogPreview/><Contact/><Footer/>
    </main>
  );
}
