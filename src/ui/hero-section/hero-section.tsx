import Navbar from "./navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div
      className="w-full min-h-screen relative top-0 left-0 lg:bg-contain bg-cover bg-center bg-no-repeat lg:bg-repeat"
      style={{
        backgroundImage: "url(/image.png)",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center lg:pt-72 pt-48 flex-col gap-4">
        <div className="flex items-center justify-center flex-col gap-3 text-center">
          <span className="text-4xl font-extrabold lg:text-7xl tracking-wide">
            LEVEL UP YOUR
          </span>
          <span className="text-4xl font-extrabold lg:text-7xl tracking-wide">
            PRODUCTIVITY
          </span>
        </div>
        <div className="flex items-center justify-center flex-col text-muted-foreground xl:text-lg text-xs px-5 text-center">
          <span>
            Raycast lets you control your tools within few keystrokes.
          </span>
          <span>It's designed to keep focused.</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-10 flex-col">
        <div className="flex items-center justify-center gap-6 lg:flex-row flex-col">
          <Input
            className="lg:w-72 w-56 border text-xs lg:text-sm"
            placeholder="Search Labs "
          />
          <Button className="text-xs lg:text-sm">Explore Labs</Button>
        </div>
        <div className="text-muted-foreground gap-5 flex items-center text-xs lg:text-sm">
          <span>macOs 10.14+</span>
          <span>v10.0</span>
          <Button
            variant={"secondary"}
            className="text-red-400 text-xs lg:text-sm"
          >
            Beta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
