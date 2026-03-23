"use client";

import PropertyForm from "@/components/admin/PropertyForm";
import PropertyList from "@/components/admin/PropertyList";
import AddSamplePropertyButton from "@/components/admin/AddSamplePropertyButton";

export default function AdminPropertiesPage() {

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 space-y-8 sm:space-y-10 md:space-y-12" style={{ fontFamily: "var(--font-body)" }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 sm:pb-10 lg:pb-12 border-b border-stone-200/50">
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight font-light">
              Property Management
            </h1>
            <p className="font-body text-sm sm:text-base text-stone-500 max-w-2xl leading-relaxed tracking-wide">
              Curate, edit, and manage high-end property listings in your exclusive portfolio.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column - Forms */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Add Property Form */}
            <div className="bg-white border border-stone-200/50 rounded-2xl md:rounded-[2rem] shadow-[0_4px_24px_rgb(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C4973F] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h2 className="font-display text-2xl lg:text-3xl text-ink mb-8 tracking-wide font-normal">Add New Property</h2>
                <PropertyForm />
            </div>

              {/* Test Button */}
              <div className="bg-white border border-stone-200/50 rounded-2xl md:rounded-[2rem] shadow-[0_4px_24px_rgb(0,0,0,0.02)] p-6 sm:p-8 relative overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
                <h3 className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-stone-400 mb-5 font-semibold">
                  Developer Tools
                </h3>
                <AddSamplePropertyButton />
              </div>
          </div>

            {/* Right Column - Property List */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-stone-200/50 rounded-2xl md:rounded-[2rem] shadow-[0_4px_24px_rgb(0,0,0,0.02)] p-6 sm:p-8 lg:p-10 h-full min-h-[500px] transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)]">
                <PropertyList />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
