/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Company } from "./companylist";
import Image from "next/image";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Star } from "@/components/animate-ui/icons/star";
import { AvatarGroupDemo } from "@/components/avatargroup";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

interface IdProp {
  selectedId: number | null;
  companies: Company[];
}

export function Accordion03({ selectedId, companies }: IdProp) {
  // If selectedId is null, fall back to the first company if available
  const selectedCompany =
    selectedId === null
      ? companies[0]
      : companies.find((item) => item.id === selectedId);

  console.log(selectedCompany);
  // If no company is available, render nothing (or show a message)
  if (!selectedCompany) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Accordion
        type="single"
        value={selectedCompany.id.toString()}
        collapsible
        className="w-full space-y-4"
      >
        <AccordionItem
          className="relative border border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900"
          value={selectedCompany.id.toString()}
          key={selectedCompany.id}
        >
      <AccordionTrigger className="pl-6 hover:no-underline [&>svg]:hidden text-lg md:text-xl font-bold text-indigo-400">
  <span>{selectedCompany.name}</span>

  {/* render star icons equal to rating */}
  <span className="flex ml-2 text-yellow-400">
    {Array.from({ length: selectedCompany.rating ?? 0 }).map((_, index) => (
      <AnimateIcon key={index} animateOnHover>
        <Star />
      </AnimateIcon>
    ))}
  </span>
</AccordionTrigger>

          <AccordionContent className="grid md:grid-cols-2 gap-6 p-6 bg-gray-800 rounded-b-xl border-t border-gray-700">
            <div className="space-y-4">
              <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">Location:</span>{" "}
                {selectedCompany.location || "N/A"}
              </p>
              <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">Industry:</span>{" "}
                {selectedCompany.industry || "N/A"}
              </p>
              <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">
                  Phone number:
                </span>{" "}
                {selectedCompany.phone || "N/A"}
              </p>
              <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">Email:</span>{" "}
                {selectedCompany.email || "N/A"}
              </p>
              <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">About:</span>{" "}
                {selectedCompany.about || "N/A"}
              </p>
               <p className="text-gray-300 font-medium">
                <span className="font-semibold text-gray-200">Founded:</span>{" "}
                {selectedCompany.foundedYear || "N/A"}
              </p>
              <AvatarGroupDemo />
            </div>
            {selectedCompany.website && (
              <div>
              <div className="flex gap-1 justify-center">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a href="#" aria-label="Twitter">
                <FaTwitter className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a href="#" aria-label="YouTube">
                <FaYoutube className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a href="#" aria-label="GitHub">
                <FaGithub className="h-4 w-4" />
              </a>
            </Button>
          </div>
              <div className="md:flex md:justify-end md:items-center">
                <img
                  src="https://picsum.photos/400/300"
                  alt={selectedCompany.name}
                  className="w-full object-cover rounded-lg shadow-md"
                />
              </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
