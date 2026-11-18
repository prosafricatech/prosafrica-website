"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Button from "./Button";

export default function Nav() {
  const path = usePathname();
  // The menu is open only on the page it was opened on, so it closes by itself when the page changes.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-4">
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-280 rounded-3xl shadow-[0_10px_40px_rgba(12,10,46,0.14),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.5),inset_0_0_24px_rgba(255,255,255,0.28)] backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-br before:from-white/55 before:via-transparent before:to-white/25 after:pointer-events-none after:absolute after:inset-x-6 after:top-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-white after:to-transparent",
          open ? "bg-white/95" : "bg-white/50",
        )}
      >
        <div className="relative flex h-16 items-center justify-between gap-6 px-4 md:h-17 md:px-7">
          <Logo />

          <nav
            className={cn(
              "hidden gap-9 text-[15px] font-semibold md:flex",
              "text-body",
            )}
          >
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "hover:text-indigo",
                  path === l.href && "text-indigo",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact" size="sm" variant="primary">
              {site.ctaLabel}
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpenOn(open ? null : path)}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl text-navy md:hidden",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="relative border-t border-navy/10 px-4 pt-2 pb-4 md:hidden">
            <nav className="flex flex-col">
              {nav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-3 py-3.5 text-[17px] font-semibold",
                    path === l.href ? "bg-tint text-indigo" : "text-navy",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Button
              href="/contact"
              size="sm"
              className="mt-3 block w-full text-center"
            >
              {site.ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
