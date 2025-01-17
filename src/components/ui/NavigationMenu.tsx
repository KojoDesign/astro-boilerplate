import { cva } from "class-variance-authority";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronDown } from "@/icons";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const mediaQuery = "(max-width: 48rem)";

const MobileContext = React.createContext(false);

const NavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const isMobile = useMediaQuery(mediaQuery);

  if (isMobile) {
    return (
      <MobileContext.Provider value={true}>
        <Accordion
          type="single"
          className={cn("pt-12", className)}
          {...props}
          ref={ref}
        >
          {children}
        </Accordion>
      </MobileContext.Provider>
    );
  }

  return (
    <MobileContext.Provider value={false}>
      <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className,
        )}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </NavigationMenuPrimitive.Root>
    </MobileContext.Provider>
  );
});

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const isMobile = React.useContext(MobileContext);

  if (isMobile) {
    return (
      <div className="w-full h-full flex-col flex justify-center items-center">
        {children}
      </div>
    );
  }

  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className,
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.List>
  );
});

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const id = React.useId();
  const isMobile = React.useContext(MobileContext);

  if (isMobile) {
    return (
      <AccordionItem
        value={id}
        className={cn("border-none w-full", className)}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {children}
      </AccordionItem>
    );
  }

  return (
    <NavigationMenuPrimitive.Item ref={ref} className={className} {...props}>
      {children}
    </NavigationMenuPrimitive.Item>
  );
});

NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

const navigationMenuTriggerStyle = cva(
  "group inline-flex cursor-pointer h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const navigationMenuLinkStyle = cva(
  "flex items-center cursor-pointer justify-center w-max h-9 px-4 text-sm rounded-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const isMobile = React.useContext(MobileContext);

  if (isMobile) {
    return (
      <AccordionTrigger
        {...props}
        className={cn(
          navigationMenuTriggerStyle(),
          "justify-between",
          className,
        )}
        ref={ref}
      >
        {children}
      </AccordionTrigger>
    );
  }

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  const isMobile = React.useContext(MobileContext);

  if (isMobile) {
    return (
      <AccordionContent
        className={cn("pb-0", className)}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      />
    );
  }

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
        className,
      )}
      {...props}
    />
  );
});

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, asChild, children, ...props }, ref) => {
  const isMobile = React.useContext(MobileContext);

  if (isMobile) {
    const Tag = asChild ? Slot : "div";

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          navigationMenuLinkStyle(),
          "w-full justify-start",
          className,
        )}
      >
        {children}
      </Tag>
    );
  }

  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      asChild={asChild}
      className={cn(navigationMenuLinkStyle(), className)}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Link>
  );
});

NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative  mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-max overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out data-[state=open]:zoom-in-95 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
