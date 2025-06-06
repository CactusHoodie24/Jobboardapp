import { Navigation } from "@/components/navigation";
import SignIn from "@/components/sign-in";
import PostJob from "./dashboard/employer/post-job/page";
import { SignInTag } from "@/components/test";
import RecipeReviewCard from "@/components/ui/cardlook";
import HomePage from "./home/page";
import AccordionDemo from "@/components/sideWall";


export default function Home() {
  return (
    <div className="mt-20 flex gap-2.5">
   <HomePage />
   <div className="ml-36">
   <AccordionDemo />
   </div>
   </div>
  );
}
