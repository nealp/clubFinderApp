import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className={`w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 ${className}`}>
        {children}
      </div>
    </main>
  );
}
