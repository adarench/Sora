import { NavBar } from "./NavBar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-primary text-white">
      <div className="h-[calc(100%-65px)]">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
