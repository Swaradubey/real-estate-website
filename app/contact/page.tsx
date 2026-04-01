import React from "react";
import PageHero from "@/components/site/PageHero";
import InquiryForm from "@/components/site/InquiryForm";
import ContactInfo from "@/components/site/ContactInfo";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const FAQSection = () => {
    const faqs = [
        {
            q: "How do I schedule a private viewing?",
            a: "Private viewings can be scheduled directly through our website by submitting an inquiry, or by calling our concierge line at +91 22 4000 0000. We recommend booking at least 48 hours in advance."
        },
        {
            q: "Does Atibha Realty offer property management?",
            a: "Yes, we offer bespoke property management services for our clients, including maintenance, leasing assistance, and legal documentation support."
        },
        {
            q: "What regions do you specialize in?",
            a: "We specialize in premium residential and commercial properties across Mumbai, New Delhi, Bengaluru, Hyderabad, Goa, and other major Tier-1 cities in India."
        },
        {
            q: "Do you assist with home financing?",
            a: "While we are not lenders, we have exclusive partnerships with leading financial institutions to provide our clients with preferred interest rates and expedited processing."
        }
    ];

    return (
        <div className="space-y-8">
            <h3 className="font-heading text-2xl text-cream mb-8 border-b border-gold/20 pb-4">Frequently Asked Questions</h3>
            <div className="grid gap-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/5 bg-ink-soft/20 p-6 rounded-lg">
                        <h4 className="font-heading text-lg text-gold mb-2">{faq.q}</h4>
                        <p className="font-body text-cream/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <PageHero 
        title="Connect With Excellence" 
        subtitle="Our advisors are available for private consultations seven days a week."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
      />

      {/* Main Content */}
      <section className="py-24 bg-ink relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Info & FAQ */}
            <div className="space-y-16 animate-slideInL">
              <div>
                <span className="text-gold tracking-[0.3em] uppercase text-xs font-body mb-4 block">Get in Touch</span>
                <h2 className="font-heading text-4xl md:text-5xl text-cream mb-8 leading-tight">
                  Begin Your <br /><i className="text-gold">Distinguished Journey</i>
                </h2>
                <p className="font-body text-cream/60 leading-relaxed mb-10 max-w-lg">
                  Whether you are seeking to acquire a landmark residence, divest a premium asset, or explore investment opportunities, our expert advisors provide discreet and tailored guidance.
                </p>
                <ContactInfo />
              </div>

              <FAQSection />
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:sticky lg:top-32 animate-slideInR">
              <InquiryForm />
              
              {/* Optional Map Placeholder */}
              <div className="mt-8 bg-ink-soft border border-white/5 h-[300px] rounded-lg overflow-hidden relative group cursor-pointer">
                 <div className="absolute inset-0 bg-cover bg-center grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80')" }} />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/80 backdrop-blur-md px-6 py-4 border border-gold/30 text-center">
                        <p className="font-heading text-gold text-sm tracking-widest uppercase">Visit Mumbai HQ</p>
                        <p className="font-body text-cream/40 text-[10px] mt-1">Google Maps Integration Placeholder</p>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Quote / Banner */}
      <section className="py-16 bg-ink-soft border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-heading text-xl md:text-2xl text-cream italic leading-relaxed opacity-80">
                "Real estate is not just about square footage; it's about the life you build within it. At Atibha, we don't just sell homes—we curate legacies."
            </p>
            <p className="font-body text-gold text-xs tracking-widest uppercase mt-6">— Rajiv Khanna, Founder</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
