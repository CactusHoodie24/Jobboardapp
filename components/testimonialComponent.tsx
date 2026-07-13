"use client";
import { TestimonialsColumn } from "@/components/testimonials-columns";

const testimonials = [
  {
    text: "This job board helped me finally land a role after months of searching. The personalized recommendations and clean interface made applying so easy.",
    name: "Briana Patton",
    role: "Software Developer",
  },
  {
    text: "I was able to discover companies I never knew existed. The platform's filter system made it simple to find roles that matched my skill set perfectly.",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "As a recruiter, posting jobs here has been a game changer. We received qualified applicants within hours, and the communication tools are fantastic.",
    name: "Saman Malik",
    role: "Talent Acquisition Lead",
  },
  {
    text: "This app helped us hire faster than ever. The dashboard gives clear insights on candidates, making the entire process smooth and efficient.",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "I love how the app highlights skills and achievements clearly. It helped me showcase my profile better and secure interviews with top companies.",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Within a week of signing up, I got multiple interview invites. The platform is intuitive and makes job hunting far less stressful.",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

export default function TestimonialComponent() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4">
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1">Testimonials</div>
          </div>

          <h2 className="font-bold text-3xl tracking-tighter lg:text-4xl">
            What our users say
          </h2>
          <p className="text-center text-muted-foreground text-sm">
            See what our customers have to say about us.
          </p>
        </div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn duration={16} testimonials={firstColumn} />
          <TestimonialsColumn
            className="hidden md:block"
            duration={20}
            testimonials={secondColumn}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            duration={18}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </section>
  );
}