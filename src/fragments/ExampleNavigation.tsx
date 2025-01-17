import { NavigationBar } from "@/components/ui/NavigationBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/NavigationMenu";

export function ExampleNavigation() {
  return (
    <NavigationBar>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-1 flex flex-col">
                <NavigationMenuLink>Hello world</NavigationMenuLink>
                <NavigationMenuLink>Hello world</NavigationMenuLink>
                <NavigationMenuLink>Hello world</NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink>Team</NavigationMenuLink>
          <NavigationMenuLink>FAQ</NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </NavigationBar>
  );
}
