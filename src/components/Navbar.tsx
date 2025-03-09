import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
            src={"/logo-nav.png"}
            width={40}
            height={50}
            alt="website logo"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium transition hover:text-primary">
              Home
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium transition hover:text-primary">
              Leaderboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/game"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
            >
              Start Challenge
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
