import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "500", "700"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/stampy.svg" alt="brawl-tv" height={80} width={80} />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">Brawl TV</p>
        <p className="text-sm text-muted-foreground">Ready to Brawl?</p>
      </div>
    </div>
  );
};