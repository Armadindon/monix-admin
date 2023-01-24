import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentPage, Pages } from "../Model/ApplicationSlice";

export type PageNavigatorProps = {
  pages: { [pageIndex in Pages]: JSX.Element };
};

/** Utility component for making transitions */
const PageNavigator = ({
  pages,
  children,
}: React.PropsWithChildren<PageNavigatorProps>) => {
  const currentPage = useSelector(getCurrentPage);
  const [inTransitionOut, setInTransitionOut] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(
    pages[currentPage]
  );

  // At the end of the out animation, we change the component
  const onExited = () => {
    if (!inTransitionOut) return;
    console.log("Animation Ended");
    setInTransitionOut(false);
    setCurrentComponent(pages[currentPage]);
  };

  useEffect(() => {
    if (currentComponent.type !== pages[currentPage].type) {
      setInTransitionOut(true);
    }
    // On ignore, car on veut pas retrigger le useEffect dans le cas de changement de composant ou la liste de pages (qui est fixe logiqument)
  }, [currentPage]);

  return (
    <Slide
      in={!inTransitionOut}
      appear={false}
      direction={inTransitionOut ? "right" : "left"}
      mountOnEnter
      onExited={onExited}
    >
      <Box>
        {children}
        {currentComponent}
      </Box>
    </Slide>
  );
};

export default PageNavigator;
