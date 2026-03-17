import Link from "next/link";

export function PublicHeader() {
  const paths = [
    {
      label: "About us",
      href: "/about-us",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ]
  return (
    <header className="sticky inset-x-0 top-0 z-40 w-full border-b bg-background shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Left: Logo + Name + Links */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="hidden text-lg font-bold sm:inline">Saywa</span>
          </Link>
        </div>

        <ul className="flex items-center gap-6 text-sm font-medium">
          {paths.map((path) => (
            <li key={path.href}>
              <Link href={path.href} className="transition-colors hover:text-primary">
                {path.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/auth/login" className="transition-colors hover:text-primary">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
