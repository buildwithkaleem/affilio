import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

        <div>
          © {new Date().getFullYear()} Affilio. All rights reserved.
        </div>

        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>

          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>

          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}