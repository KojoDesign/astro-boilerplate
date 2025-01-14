import { Menu } from "@/icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

interface NavigationMenuProps {
  desktop?: React.ReactNode;
  mobile?: React.ReactNode;
}

export function NavigationMenu({ desktop, mobile }: NavigationMenuProps) {
  return (
    <>
      <div className="contents laptop:hidden">{desktop}</div>
      <div className="hidden laptop:contents">
        <Sheet>
          <SheetTrigger className="flex justify-center items-center">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent>{mobile}</SheetContent>
        </Sheet>
      </div>
    </>
  );
}
