import { Menu } from "@/icons";

import {
  Sheet,
  SheetContent,
  type SheetContentProps,
  SheetTrigger,
} from "@/components/ui/Sheet";

interface NavigationMenuProps {
  children: React.ReactNode;
  side?: SheetContentProps["side"];
}

export function NavigationBar({ side, children }: NavigationMenuProps) {
  return (
    <>
      <div className="md:contents hidden">{children}</div>
      <div className="md:hidden contents">
        <Sheet>
          <SheetTrigger className="flex cursor-pointer justify-center items-center">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent className="size-full" side={side}>
            {children}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
