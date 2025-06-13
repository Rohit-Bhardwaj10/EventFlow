"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          // Blend with events page: use darker base, reduce white/blue
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              // Reduce white and blue, use more subtle gradients
              "--aurora":
                "repeating-linear-gradient(100deg,#23272F_10%,#23272F_15%,#23272F_20%,#23272F_25%,#23272F_30%,#3b82f6_32%,#a5b4fc_34%,#23272F_40%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#181A20_0%,#181A20_7%,transparent_10%,transparent_12%,#181A20_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_2%,transparent_4%,transparent_12%,#fff_14%)",
              "--blue-300": "#23272F",
              "--blue-400": "#23272F",
              "--blue-500": "#23272F",
              "--indigo-300": "#23272F",
              "--violet-200": "#23272F",
              "--black": "#181A20",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_2%,var(--transparent)_4%,var(--transparent)_12%,var(--white)_14%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
