import Link from "next/link";

function SimpleNavbar() {
  // Optionally, you can use a hook to get the current time dynamically
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' GMT+5:30';
  return (
    <nav className="fixed top-0 left-0 right-0 w-full text-xl z-50 flex items-center justify-between px-6 py-2 backdrop-blur-md border-b border-white/10 shadow-sm" style={{minHeight:48}}>
      {/* Left: Star Icon */}
      <span className="text-lg text-gray-300 "><span className="mr-1">
        <Link href="/">
        EventFlow
        </Link>
        </span></span>
      {/* Right: Time, Link, Button */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 hidden sm:inline">{timeString}</span>
        <Link href="/events" className="text-sm text-gray-300 hover:text-white transition rounded px-2 py-1">Explore Events </Link>
        <button className="bg-white/10 text-gray-200 text-sm px-3 py-1 rounded transition hover:bg-white/20 border border-white/20"><Link href="/login">Sign In</Link></button>
      </div>
    </nav>
  );
}
export default SimpleNavbar;
