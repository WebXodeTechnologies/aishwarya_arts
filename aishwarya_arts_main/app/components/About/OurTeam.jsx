"use client";

import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Devandran",
    role: "Founder & Master Tanjore Artist",
    image: "/assets/about/men-1.png",
    bio: "The creative force behind Aishwarya Arts, preserving the legacy of Tanjore painting with intricate gold work and devotional precision.",
  },
  {
    id: 2,
    name: "Sanjay Kumar",
    role: "Sketch Artist",
    image: "/assets/about/men-2.png",
    bio: "Expert in hand-drawn outlines that define the foundation of each Tanjore piece, ensuring proportion and grace in every frame.",
  },
  {
    id: 3,
    name: "Meena R.",
    role: "Color & Gold Foil Specialist",
    image: "/assets/about/female-1.png",
    bio: "Brings brilliance to each painting with rich natural pigments and authentic gold leaf application, highlighting divine details.",
  },
];

export default function OurTeam() {
  return (
    <section
      className="max-w-7xl mx-auto py-20"
      aria-labelledby="our-team-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <h2
          id="our-team-heading"
          className="text-4xl font-bold mb-12 text-gray-900 tracking-wide"
        >
          Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-90">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover object-center"
                  priority={member.id === 1}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-yellow-700 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Hidden heading for SEO */}
      <h2 className="sr-only">
        Meet the creative and technical team behind Aishwarya Arts
      </h2>
    </section>
  );
}
