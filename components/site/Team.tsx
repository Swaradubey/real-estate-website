// components/Team.tsx
import React from "react";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Sample team members - High-quality professional portraits
const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Rajiv Mehta",
    designation: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=90",
    social: {
      linkedin: "https://linkedin.com/in/rajiv-mehta",
      twitter: "https://twitter.com/rajivmehta",
    },
  },
  {
    id: 2,
    name: "Ananya Sharma",
    designation: "Senior Property Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=90",
    social: {
      linkedin: "https://linkedin.com/in/ananya-sharma",
      instagram: "https://instagram.com/ananya.sharma",
    },
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    designation: "Sales Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=90",
    social: {
      linkedin: "https://linkedin.com/in/arjun-kapoor",
    },
  },
  {
    id: 4,
    name: "Neha Verma",
    designation: "Interior Consultant",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=90",
    social: {
      linkedin: "https://linkedin.com/in/neha-verma",
      instagram: "https://instagram.com/neha.verma",
    },
  },
  {
    id: 5,
    name: "Rahul Khanna",
    designation: "Property Consultant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=90",
    social: {
      linkedin: "https://linkedin.com/in/rahul-khanna",
    },
  },
];

const Team = () => {
  return (
    <section id="team" className="w-full py-12 sm:py-16 md:py-20 bg-[#0B0B0B]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center mb-8 sm:mb-12 reveal">
          <div className="label-tag justify-center text-gold/70 mb-3 md:mb-4 text-xs sm:text-sm">Our Team</div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-3 md:mb-4">
            The people behind<br />
            <em className="text-gold">every great deal.</em>
          </h2>
          <span className="gold-line" />
          <p className="font-body text-sm sm:text-base text-cream/60 leading-relaxed mt-4 max-w-2xl">
            Meet the experts behind our success — dedicated to delivering exceptional real estate experiences across India's finest markets.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 w-full">
          {TEAM.map((member) => (
            <div
              key={member.id}
              className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden text-center hover:border-amber-500/30 transition-all duration-300 w-full h-full"
            >
              <div className="w-full h-auto overflow-hidden bg-neutral-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-2.5 sm:p-3 md:p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-0.5 sm:mb-1 text-white">{member.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">{member.designation}</p>
                <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:text-amber-400 transition-colors text-xs sm:text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.social?.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:text-amber-400 transition-colors text-xs sm:text-sm"
                    >
                      Twitter
                    </a>
                  )}
                  {member.social?.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:text-amber-400 transition-colors text-xs sm:text-sm"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;