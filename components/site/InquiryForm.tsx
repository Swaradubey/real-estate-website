"use client";
import { useState } from "react";
import { createInquiry } from "@/lib/firestore";

const InquiryForm = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", message: "" });

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

  if (sent) {
    return (
      <div className="bg-ink-soft border border-gold/20 p-8 sm:p-12 text-center rounded-lg shadow-2xl">
        <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl text-cream mb-4">Inquiry Received</h3>
        <p className="font-body text-cream/60 leading-relaxed mb-8 max-w-sm mx-auto">
          Thank you for choosing Atibha Realty. An executive advisor will personally contact you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", phone: "", property: "", message: "" });
            setError(null);
          }}
          className="px-8 py-3 bg-gold text-black font-semibold hover:bg-gold-lt transition-all rounded transition-duration-300"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-ink-soft border border-white/5 p-6 sm:p-10 rounded-lg shadow-2xl">
      <h3 className="font-heading text-2xl text-cream mb-8 border-b border-gold/20 pb-4">Send a Private Inquiry</h3>
      <form onSubmit={submit} className="space-y-6">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded text-red-200 text-sm">
            {error}
          </div>
        )}
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold font-body">Full Name *</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 focus:border-gold px-4 py-3 text-cream outline-none transition-all font-body"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gold font-body">Phone Number</label>
            <input
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 focus:border-gold px-4 py-3 text-cream outline-none transition-all font-body"
              placeholder="+91..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold font-body">Email Address *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full bg-black/40 border border-white/10 focus:border-gold px-4 py-3 text-cream outline-none transition-all font-body"
            placeholder="example@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold font-body">Interested In</label>
          <select
            value={form.property}
            onChange={e => setForm(p => ({ ...p, property: e.target.value }))}
            className="w-full bg-black border border-white/10 focus:border-gold px-4 py-3 text-cream/70 outline-none transition-all font-body appearance-none"
          >
            <option value="" disabled>Select inquiry type</option>
            <option value="residential">Residential Purchase</option>
            <option value="commercial">Commercial Space</option>
            <option value="nri-desk">NRI Desk / Investment</option>
            <option value="consultation">Virtual Consultation</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold font-body">Message</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="w-full bg-black/40 border border-white/10 focus:border-gold px-4 py-3 text-cream outline-none transition-all font-body resize-none"
            placeholder="How can we assist you today?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-lt text-black font-bold py-4 px-8 tracking-widest uppercase text-sm transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
