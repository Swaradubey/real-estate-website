import React from 'react';

const ContactInfo = () => {
  return (
    <div className="grid gap-8">
      {/* Office Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-ink-soft/40 border border-white/5 p-6 rounded-lg hover:border-gold/30 transition-all duration-500">
          <h4 className="font-heading text-xl text-gold mb-4">Mumbai Headquarters</h4>
          <p className="font-body text-cream/60 leading-relaxed text-sm">
            12th Floor, Nariman Point Tower,<br />
            Nariman Point, Mumbai 400 021
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Open: Mon - Sat
          </div>
        </div>

        <div className="bg-ink-soft/40 border border-white/5 p-6 rounded-lg hover:border-gold/30 transition-all duration-500">
          <h4 className="font-heading text-xl text-gold mb-4">New Delhi Office</h4>
          <p className="font-body text-cream/60 leading-relaxed text-sm">
            H-Block, Outer Circle,<br />
            Connaught Place, New Delhi 110 001
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
             Open: Mon - Sat
          </div>
        </div>
      </div>

      {/* Connectivity */}
      <div className="bg-ink-soft/40 border border-white/5 p-8 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-body">Global Connectivity</h5>
            <div className="space-y-4">
              <div>
                <span className="block text-cream/40 text-[10px] uppercase font-body mb-1">General Inquiries</span>
                <p className="font-body text-cream text-lg">+91 22 4000 0000</p>
              </div>
              <div>
                <span className="block text-cream/40 text-[10px] uppercase font-body mb-1">Premium Support</span>
                <p className="font-body text-cream text-lg">hello@atibharealty.com</p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-body">Operating Hours</h5>
            <div className="space-y-2 mt-1">
              <div className="flex justify-between text-sm font-body">
                <span className="text-cream/60">Mon - Fri</span>
                <span className="text-cream italic">09:00 AM – 08:00 PM</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-cream/60">Saturday</span>
                <span className="text-cream italic">10:00 AM – 06:00 PM</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-cream/60">Sunday</span>
                <span className="text-cream italic">Private Appointments Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
