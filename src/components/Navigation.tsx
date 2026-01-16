import React, { useState } from "react";

import { useIsScrolling } from "../hooks/useIsScrolling";
import { Button } from "./ui/Button";
import { Close, Menu } from "@/icons";

interface NavigationProps {
  url: URL;
}

interface NavigationLink {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const NAVIGATION_LINKS: NavigationLink[] = [
  // {
  //   href: "/work",
  //   label: "Our Work",
  //   icon: Work,
  // },
  // {
  //   href: "/pricing",
  //   label: "Plans & Pricing",
  //   icon: Pricing,
  // },
  // {
  //   href: "/about",
  //   label: "About",
  //   icon: About,
  // },
  // {
  //   href: "/writing",
  //   label: "Writings",
  //   icon: Blog,
  // },
];

const Navigation: React.FC<NavigationProps> = ({ url }) => {
  const isScrolling = useIsScrolling(100);
  const menuId = React.useId();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      data-scrolling={isScrolling}
      className={[
        "group has-checked:bg-background fixed isolate z-50 transition-all duration-300 max-lg:inset-x-0 max-lg:top-0 lg:top-4 lg:left-1/2 lg:flex lg:h-16 lg:w-full lg:max-w-6xl lg:-translate-x-1/2 lg:flex-row lg:items-center lg:justify-between lg:rounded-full lg:border lg:border-transparent lg:p-4 lg:ring lg:ring-transparent lg:duration-400 lg:ease-out",
        "data-[scrolling=true]:bg-background/80 lg:data-[scrolling=true]:ring-border data-[scrolling=true]:shadow-md lg:data-[scrolling=true]:max-w-4xl lg:data-[scrolling=true]:border-white lg:data-[scrolling=true]:shadow-2xl lg:data-[scrolling=true]:backdrop-blur-sm",
      ].join(" ")}
    >
      {/* Header bar */}
      <div className="flex h-16 flex-row items-center justify-between px-6 py-4 lg:contents">
        <a href="/" className="flex items-center lg:ms-4 lg:mt-1">
          {/* <Logo className="h-10 w-20 mask-b-to-black/75 opacity-80" /> */}
        </a>

        <input
          type="checkbox"
          id={menuId}
          className="peer sr-only lg:hidden"
          aria-label="Toggle menu"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
        />

        <div className="max-lg:bg-background group contents max-lg:absolute max-lg:bottom-2 max-lg:left-0 max-lg:grid max-lg:w-full max-lg:translate-y-full max-lg:grid-rows-[0fr] max-lg:backdrop-blur-lg max-lg:transition-all max-lg:duration-300 max-lg:ease-out max-lg:peer-checked:grid-rows-[1fr]">
          <div className="contents max-lg:block max-lg:min-h-0 max-lg:overflow-hidden">
            <ul className="max-lg:group-peer-checked:animate-in max-lg:fill-mode-both max-lg:group-peer-checked:slide-in-from-bottom-10 max-lg:group-peer-checked:fade-in flex flex-col items-center gap-x-4 gap-y-2 max-lg:w-full max-lg:items-start max-lg:p-4 max-lg:delay-250 max-lg:duration-500 max-lg:ease-out lg:flex-row">
              {NAVIGATION_LINKS.map(({ icon: Icon, href, label }) => {
                return (
                  <li key={href}>
                    <a
                      aria-current={
                        url.pathname.startsWith(href) ? "page" : undefined
                      }
                      href={href}
                      className={[
                        "text-foreground flex transform-gpu flex-row items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                        "aria-[current=page]:text-primary aria-[current=page]:bg-foreground/4 aria-[current=page]:border-border aria-[current=page]:inset-shadow-md not-aria-[current=page]:text-secondary-foreground hover:text-primary border border-transparent ring ring-transparent active:opacity-50 aria-[current=page]:ring-white/20",
                      ].join(" ")}
                    >
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <Button className="max-lg:hidden">Navigation CTA</Button>
          </div>
        </div>

        <label
          htmlFor={menuId}
          className="flex cursor-pointer items-center justify-center bg-transparent lg:hidden"
        >
          <Menu className="text-secondary-foreground size-6 transition-all duration-300 ease-out group-has-checked:pointer-events-none group-has-checked:-rotate-45 group-has-checked:opacity-0" />
          <Close className="text-secondary-foreground absolute size-6 rotate-45 opacity-0 transition-all duration-300 ease-out group-has-checked:pointer-events-auto group-has-checked:rotate-0 group-has-checked:opacity-100" />
        </label>
      </div>

      <input
        type="checkbox"
        id={menuId}
        className="peer sr-only lg:hidden"
        aria-label="Toggle menu"
        checked={isMenuOpen}
        onChange={(e) => setIsMenuOpen(e.target.checked)}
      />
    </nav>
  );
};

export default Navigation;
