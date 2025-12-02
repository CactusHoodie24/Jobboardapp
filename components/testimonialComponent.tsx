"use client";
import { TestimonialsColumn } from "@/components/testimonials-columns";

const testimonials = [
  {
    text: "This job board helped me finally land a role after months of searching. The personalized recommendations and clean interface made applying so easy.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Software Developer",
  },
  {
    text: "I was able to discover companies I never knew existed. The platform’s filter system made it simple to find roles that matched my skill set perfectly.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "As a recruiter, posting jobs here has been a game changer. We received qualified applicants within hours, and the communication tools are fantastic.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Talent Acquisition Lead",
  },
  {
    text: "This app helped us hire faster than ever. The dashboard gives clear insights on candidates, making the entire process smooth and efficient.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "I love how the app highlights skills and achievements clearly. It helped me showcase my profile better and secure interviews with top companies.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "Within a week of signing up, I got multiple interview invites. The platform is intuitive and makes job hunting far less stressful.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "The job alerts feature is amazing. I never missed an opportunity, and was eventually hired for a role that matched me perfectly.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Specialist",
  },
  {
    text: "Posting vacancies is incredibly fast, and the app’s matching algorithm brought us candidates that fit our culture and requirements.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "HR Manager",
  },
  {
    text: "This platform improved our hiring workflow drastically. The quality of applicants and ease of communication helped us fill key positions quickly.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

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