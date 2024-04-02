import { UserIcon } from "lucide-react";
import { SoraLogo } from "./SoraLogo";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="bg-primary p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <SoraLogo />
          <Link href="/dashboard" className="hover:underline">
            Overview
          </Link>
          <Link href="/recommendations" className="hover:underline">
            Recommendations
          </Link>
          <Link href="#" className="hover:underline">
            Resources
          </Link>
          <Link href="/chat/sora" className="hover:underline">
            Chat
          </Link>
        </div>
        <div className="flex">
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}
