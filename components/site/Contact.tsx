"use client";
import { useState } from "react";
import { createInquiry } from "@/lib/firestore";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", message: "" });
  const [contactData, setContactData] = useState({
    mumbaiOffice: "Nariman Point, Mumbai 400 021",
    delhiOffice: "Connaught Place, New Delhi 110 001",
    phone: "+91 22 4000 0000",
    email: "hello@atibharealty.com"
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        property: form.property,
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      setError("Failed to send your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full py-12 sm:py-16 md:py-20 bg-ink">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left info */}
          <div className="reveal-l">
            <div className="flex flex-col items-start w-full text-center">
              <div className="label-tag mb-3 md:mb-4 text-xs sm:text-sm">GET IN TOUCH</div>
              <h2 className="w-full text-center font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
                <span className="block">Let us find your</span>
                <em className="block text-gold">perfect home.</em>
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-cream/60 leading-relaxed mb-6 max-w-xl">
              Whether you are looking to buy, sell, lease or invest — our advisors are available seven days a week for a private consultation.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4 w-full">
              <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3">
                <input
                  type="text"
                  name="mumbaiOffice"
                  value={contactData.mumbaiOffice}
                  onChange={(e) => setContactData({ ...contactData, mumbaiOffice: e.target.value })}
                  placeholder="Enter Mumbai office address"
                  className="font-body text-base font-normal text-cream tracking-wide bg-transparent outline-none w-full placeholder:text-cream/40 text-left"
                />
              </div>
              <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3">
                <input
                  type="text"
                  name="delhiOffice"
                  value={contactData.delhiOffice}
                  onChange={(e) => setContactData({ ...contactData, delhiOffice: e.target.value })}
                  placeholder="Enter Delhi office address"
                  className="font-body text-base font-normal text-cream tracking-wide bg-transparent outline-none w-full placeholder:text-cream/40 text-left"
                />
              </div>
              <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3">
                <input
                  type="tel"
                  name="phone"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="font-body text-base font-normal text-cream tracking-wide bg-transparent outline-none w-full placeholder:text-cream/40 text-left"
                />
              </div>
              <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3">
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="font-body text-base font-normal text-cream tracking-wide bg-transparent outline-none w-full placeholder:text-cream/40 text-left"
                />
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="reveal-r">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-10 border border-gold/20">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✓</div>
                <h3 className="font-heading text-xl sm:text-2xl text-cream mb-2 sm:mb-3">Thank you.</h3>
                <p className="font-body text-xs sm:text-sm text-cream/50 leading-relaxed max-w-xs">
                  Your inquiry has been received. A member of our advisory team will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", property: "", message: "" });
                    setError(null);
                  }}
                  className="btn-outline mt-4 sm:mt-6 text-xs sm:text-sm w-full sm:w-auto"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-2.5 sm:space-y-3 md:space-y-4">
                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg">
                    <p className="font-body text-xs sm:text-sm text-red-200">{error}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <div>
                    <label className="font-body text-sm sm:text-base font-normal text-cream/80 block mb-1">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-transparent border border-white/15 focus:border-gold px-3 sm:px-4 py-2 sm:py-2.5 font-body text-sm placeholder:text-sm text-cream outline-none transition-colors placeholder:text-cream/25"
                      placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="font-body text-sm sm:text-base font-normal text-cream/80 block mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-transparent border border-white/15 focus:border-gold px-3 sm:px-4 py-2 sm:py-2.5 font-body text-sm placeholder:text-sm text-cream outline-none transition-colors placeholder:text-cream/25"
                      placeholder="Enter your phone number" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm sm:text-base font-normal text-cream/80 block mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-transparent border border-white/15 focus:border-gold px-3 sm:px-4 py-2 sm:py-2.5 font-body text-sm placeholder:text-sm text-cream outline-none transition-colors placeholder:text-cream/25"
                    placeholder="Enter your email address" />
                </div>
                <div>
                  <label className="font-body text-sm sm:text-base font-normal text-cream/80 block mb-1">Interested In</label>
                  <select value={form.property} onChange={e => setForm(p => ({ ...p, property: e.target.value }))}
                    className="w-full bg-ink border border-white/15 focus:border-gold px-3 sm:px-4 py-2 sm:py-2.5 font-body text-sm text-cream/60 outline-none transition-colors">
                    <option value="" disabled>
                      Select a property or service
                    </option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="nri-desk">NRI Desk</option>
                    <option value="portfolio-review">Portfolio Review</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-sm sm:text-base font-normal text-cream/80 block mb-1">Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-transparent border border-white/15 focus:border-gold px-3 sm:px-4 py-2 sm:py-2.5 font-body text-sm placeholder:text-sm text-cream outline-none transition-colors resize-none placeholder:text-cream/25"
                    placeholder="Tell us about your requirements" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex justify-center items-center text-sm font-semibold bg-[#C4973F] text-black py-3 px-8 rounded-md hover:bg-[#b38730] transition-all duration-200"
                >
                  {loading ? "SENDING..." : "SEND ENQUIRY →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
