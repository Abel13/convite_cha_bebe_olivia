"use client";

import { ParallaxProvider } from "react-scroll-parallax";

export function ParallaxWrapper({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
