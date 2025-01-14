import { Menu } from "@/icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

interface NavigationMenuProps {
  mobile?: React.ReactNode;
  children: React.ReactNode;
}

export function NavigationMenu({ children, mobile }: NavigationMenuProps) {
  return (
    <>
      <div className="contents laptop:hidden">{children}</div>
      <div className="hidden laptop:contents">
        <Sheet>
          <SheetTrigger className="flex justify-center items-center">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent>{mobile ?? children}</SheetContent>
        </Sheet>
      </div>
    </>
  );
}
