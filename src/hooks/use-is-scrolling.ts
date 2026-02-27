import * as React from "react";

export function useIsScrolling(threshold = 100): boolean {
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    function updateScroll() {
      setIsScrolling(window.scrollY > threshold);
    }

    window.addEventListener("scroll", updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [threshold]);

  return isScrolling;
}
