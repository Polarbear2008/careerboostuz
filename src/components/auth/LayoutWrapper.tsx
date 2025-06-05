
import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return <div className="min-h-screen w-full flex overflow-hidden">{children}</div>;
};
