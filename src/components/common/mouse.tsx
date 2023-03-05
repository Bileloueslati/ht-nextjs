import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";

export default function Mouse() {
  const pointerRingRef = useRef<HTMLElement>(null);

  const pointerDotRef = useRef<HTMLElement>(null);

  const {
    palette: { secondary },
  } = useTheme();

  useEffect(() => {
    const pointerRing = pointerRingRef.current;

    const pointerDot = pointerDotRef.current;

    document.addEventListener("mousemove", (e) => {
      pointerRing?.setAttribute(
        "style",
        `top:  ${e.pageY}px; left: ${e.pageX}px;`
      );

      pointerDot?.setAttribute(
        "style",
        `top:  ${e.pageY - 20}px; left: ${e.pageX - 20}px;`
      );
    });
  }, []);

  return (
    <Box
      sx={{
        display: {
          md: "block",
          xs: "none",
        },
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 4,
          border: `2px solid ${alpha(secondary.main, 0.3)}`,
          borderRadius: "50%",
          position: "absolute",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
          animation: "cursor-animate 550ms infinite alternate;",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        ref={pointerRingRef}
      />

      <Box
        sx={{
          width: 50,
          height: 50,
          border: `2.5px solid #f1f1f1`,
          borderRadius: "50%",
          position: "absolute",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
          animation: "cursor-animate 550ms infinite alternate;",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        ref={pointerDotRef}
      />
    </Box>
  );
}
