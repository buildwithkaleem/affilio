"use client";

import Link from "next/link";
import { Loader2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  // const [loading, setLoading] = useState(false);

  const { user, initialized } = useSelector((state) => state.auth);
  

  useEffect(() => {


    // Normal pages
    if (pathname === "/privacy") {
      setActiveSection("privacy");
      return;
    }

    if (pathname === "/contact") {
      setActiveSection("contact");
      return;
    }

    // Landing page
    if (pathname !== "/") return;

    const sections = document.querySelectorAll(
      " #features, #about"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(
            visible[0].target.id
          );
        } else {
          // Features/About visible nahi hain = Home
          setActiveSection("home");
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, [pathname]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      section: "home",
    },
    {
      label: "Features",
      href: "/#features",
      section: "features",
    },
    {
      label: "About",
      href: "/#about",
      section: "about",
    },
    {
      label: "Privacy",
      href: "/privacy",
      section: "privacy",
    },
    {
      label: "Contact",
      href: "/contact",
      section: "contact",
    },
  ];


  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link href="/" className="text-2xl font-bold tracking-tight">
          Affilio
        </Link>

{/* v1 */}
        {/* <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            About
          </Link>

          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Privacy
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Contact
          </Link>
        </nav> */}

{/* v2 */}
        {/* <nav className="hidden items-center gap-1 rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur-md md:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/#features"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="/#about"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            About
          </Link>

          <Link
            href="/privacy"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            Privacy
          </Link>

          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            Contact
          </Link>
        </nav> */}

        {/* v3 */}

        {/* <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl md:flex">
          <Link
            href="/"
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/#features"
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <span className="relative z-10">Features</span>
            <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/#about"
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <span className="relative z-10">About</span>
            <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/privacy"
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <span className="relative z-10">Privacy</span>
            <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            href="/contact"
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <span className="relative z-10">Contact</span>
            <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </nav> */}

        {/* v4 */}
        {/* <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${item.active
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                }`}
            >
              <span className="relative z-10">
                {item.label}
              </span>

              <span
                className={`absolute inset-x-3 bottom-1 h-px origin-center rounded-full bg-foreground transition-transform duration-300 ${item.active
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </Link>
          ))}
        </nav> */}

        {/* v5 */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl md:flex">
          {navItems.map((item) => {
            // const isActive =
            //   item.section === activeSection ||
            //   // (item.section === "home" &&
            //   //   pathname === "/" &&
            //   //   activeSection === "home") ||
            //   (item.section === "privacy" &&
            //     pathname === "/privacy") ||
            //   (item.section === "contact" &&
            //     pathname === "/contact");


            const isActive =
              item.section === activeSection;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                  }`}
              >
                <span className="relative z-10">
                  {item.label}
                </span>

                <span
                  className={`absolute inset-x-3 bottom-1 h-px origin-center rounded-full bg-foreground transition-transform duration-300 ${isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            );
          })}
        </nav>
    
        {/* {loading ? <p>Loading...</p> : !user ? (
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>

            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        ):(
            <div className="hidden items-center gap-3 md:flex">
              
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          
        )} */}


        {!initialized ? (
          <div className="hidden items-center gap-3 md:flex">
            {/* <p className="text-sm text-muted-foreground"> */}
               <Loader2 className="h-4 w-4 animate-spin" />
            {/* </p> */}
          </div>
        ) : !user ? (
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/#features" onClick={() => setOpen(false)}>
              Features
            </Link>

            <Link href="/#about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/privacy" onClick={() => setOpen(false)}>
              Privacy
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            {/* <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link href="/register" className="flex-1">
                <Button className="w-full">
                  Register
                </Button>
              </Link>
            </div> */}

            <div className="flex gap-3 pt-2">
              {!initialized ? (
                <p className="w-full py-2 text-center text-sm text-muted-foreground">
                  Loading...
                </p>
              ) : !user ? (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button className="flex-1" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              ) : (
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}







// v2
// "use client";

// import Link from "next/link";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import { useSelector } from "react-redux";

// import {
//   Menu,
//   X,
//   ArrowRight,
//   LayoutDashboard,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   const pathname = usePathname();

//   const headerRef = useRef(null);

//   const [open, setOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   const user = useSelector((state) => state.auth.user);

//   const isLoggedIn = Boolean(user);

//   // =========================
//   // NAVIGATION ITEMS
//   // =========================

//   const navItems = [
//     {
//       label: "Home",
//       href: "/",
//       section: "home",
//     },
//     {
//       label: "Features",
//       href: "/#features",
//       section: "features",
//     },
//     {
//       label: "About",
//       href: "/#about",
//       section: "about",
//     },
//     {
//       label: "Privacy",
//       href: "/privacy",
//       section: "privacy",
//     },
//     {
//       label: "Contact",
//       href: "/contact",
//       section: "contact",
//     },
//   ];

//   // =========================
//   // CLOSE MOBILE MENU
//   // =========================

//   const closeMenu = useCallback(() => {
//     setOpen(false);
//   }, []);

//   // Close menu after navigating to another route.
//   useEffect(() => {
//     closeMenu();
//   }, [pathname, closeMenu]);

//   // =========================
//   // ESCAPE + OUTSIDE CLICK
//   // =========================

//   useEffect(() => {
//     if (!open) return;

//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         closeMenu();
//       }
//     };

//     const handlePointerDown = (event) => {
//       if (
//         headerRef.current &&
//         !headerRef.current.contains(event.target)
//       ) {
//         closeMenu();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("pointerdown", handlePointerDown);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.removeEventListener(
//         "pointerdown",
//         handlePointerDown
//       );
//     };
//   }, [open, closeMenu]);

//   // =========================
//   // ACTIVE SECTION
//   // =========================

//   useEffect(() => {
//     if (pathname === "/privacy") {
//       setActiveSection("privacy");
//       return;
//     }

//     if (pathname === "/contact") {
//       setActiveSection("contact");
//       return;
//     }

//     if (pathname !== "/") {
//       setActiveSection("");
//       return;
//     }

//     const sections = Array.from(
//       document.querySelectorAll("#features, #about")
//     );

//     if (sections.length === 0) {
//       setActiveSection("home");
//       return;
//     }

//     let observer;

//     const updateActiveSection = () => {
//       const visibleSections = sections
//         .filter((section) => {
//           const rect = section.getBoundingClientRect();

//           return (
//             rect.top < window.innerHeight * 0.65 &&
//             rect.bottom > window.innerHeight * 0.2
//           );
//         })
//         .sort((a, b) => {
//           const aDistance = Math.abs(
//             a.getBoundingClientRect().top -
//               window.innerHeight * 0.3
//           );

//           const bDistance = Math.abs(
//             b.getBoundingClientRect().top -
//               window.innerHeight * 0.3
//           );

//           return aDistance - bDistance;
//         });

//       setActiveSection(
//         visibleSections[0]?.id || "home"
//       );
//     };

//     observer = new IntersectionObserver(
//       updateActiveSection,
//       {
//         rootMargin: "-20% 0px -45% 0px",
//         threshold: [0, 0.1, 0.25, 0.5],
//       }
//     );

//     sections.forEach((section) => {
//       observer.observe(section);
//     });

//     updateActiveSection();

//     return () => observer.disconnect();
//   }, [pathname]);

//   // =========================
//   // ACTIVE LINK
//   // =========================

//   const isActive = (item) => {
//     if (item.section === "home") {
//       return pathname === "/" && activeSection === "home";
//     }

//     if (item.section === "features" || item.section === "about") {
//       return pathname === "/" && activeSection === item.section;
//     }

//     if (item.section === "privacy") {
//       return pathname === "/privacy";
//     }

//     if (item.section === "contact") {
//       return pathname === "/contact";
//     }

//     return false;
//   };

//   // =========================
//   // RENDER NAV LINK
//   // =========================

//   const renderNavLink = (item, mobile = false) => {
//     const active = isActive(item);

//     return (
//       <Link
//         key={item.section}
//         href={item.href}
//         onClick={closeMenu}
//         aria-current={active ? "page" : undefined}
//         className={
//           mobile
//             ? `flex items - center justify - between rounded - xl px - 4 py - 3 text - sm font - medium transition - colors ${
//   active
//     ? "bg-primary/10 text-primary"
//     : "text-muted-foreground hover:bg-muted hover:text-foreground"
// } `
//             : `group relative rounded - full px - 4 py - 2 text - sm font - medium transition - colors ${
//   active
//     ? "bg-foreground/[0.08] text-foreground"
//     : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
// } `
//         }
//       >
//         <span>{item.label}</span>

//         {mobile && (
//           <span
//             className={`h - 1.5 w - 1.5 rounded - full ${
//   active ? "bg-primary" : "bg-transparent"
// } `}
//           />
//         )}

//         {!mobile && (
//           <span
//             className={`absolute inset - x - 3 bottom - 1 h - px origin - center rounded - full bg - foreground transition - transform duration - 300 ${
//   active
//     ? "scale-x-100"
//     : "scale-x-0 group-hover:scale-x-100"
// } `}
//           />
//         )}
//       </Link>
//     );
//   };

//   return (
//     <header
//       ref={headerRef}
//       className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
//     >
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* BRAND */}

//         <Link
//           href="/"
//           onClick={closeMenu}
//           className="group inline-flex shrink-0 items-center gap-2"
//           aria-label="Affilio home"
//         >
//           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
//             <span className="text-lg font-bold">A</span>
//           </span>

//           <span className="text-xl font-bold tracking-tight">
//             Affilio
//           </span>
//         </Link>

//         {/* DESKTOP NAVIGATION */}

//         <nav
//           aria-label="Main navigation"
//           className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1.5 shadow-sm md:flex"
//         >
//           {navItems.map((item) => renderNavLink(item))}
//         </nav>

//         {/* DESKTOP AUTH ACTIONS */}

//         <div className="hidden shrink-0 items-center gap-2 md:flex">
//           {isLoggedIn ? (
//             <Button asChild className="rounded-full px-5">
//               <Link href="/dashboard">
//                 <LayoutDashboard className="mr-2 h-4 w-4" />
//                 Dashboard
//               </Link>
//             </Button>
//           ) : (
//             <>
//               <Button
//                 variant="ghost"
//                 asChild
//                 className="rounded-full px-5"
//               >
//                 <Link href="/login">Login</Link>
//               </Button>

//               <Button asChild className="rounded-full px-5">
//                 <Link href="/register">
//                   Get Started
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </>
//           )}
//         </div>

//         {/* MOBILE MENU BUTTON */}

//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           className="h-10 w-10 rounded-xl md:hidden"
//           onClick={() => setOpen((prev) => !prev)}
//           aria-label={open ? "Close menu" : "Open menu"}
//           aria-expanded={open}
//           aria-controls="mobile-navigation"
//         >
//           {open ? (
//             <X className="h-5 w-5" />
//           ) : (
//             <Menu className="h-5 w-5" />
//           )}
//         </Button>
//       </div>

//       {/* MOBILE NAVIGATION */}

//       {open && (
//         <div
//           id="mobile-navigation"
//           className="border-t border-border/60 bg-background md:hidden"
//         >
//           <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
//             <nav
//               aria-label="Mobile navigation"
//               className="flex flex-col gap-1"
//             >
//               {navItems.map((item) =>
//                 renderNavLink(item, true)
//               )}
//             </nav>

//             {/* MOBILE AUTH ACTIONS */}

//             <div className="mt-4 border-t pt-4">
//               {isLoggedIn ? (
//                 <Button
//                   asChild
//                   className="h-11 w-full rounded-xl"
//                 >
//                   <Link
//                     href="/dashboard"
//                     onClick={closeMenu}
//                   >
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     Go to Dashboard
//                   </Link>
//                 </Button>
//               ) : (
//                 <div className="grid grid-cols-2 gap-3">
//                   <Button
//                     asChild
//                     variant="outline"
//                     className="h-11 rounded-xl"
//                   >
//                     <Link
//                       href="/login"
//                       onClick={closeMenu}
//                     >
//                       Login
//                     </Link>
//                   </Button>

//                   <Button
//                     asChild
//                     className="h-11 rounded-xl"
//                   >
//                     <Link
//                       href="/register"
//                       onClick={closeMenu}
//                     >
//                       Get Started
//                     </Link>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
