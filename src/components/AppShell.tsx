"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * App Shell - Client Component
 * Wraps the app with ErrorBoundary and layout components
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <ErrorBoundary>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
    </ErrorBoundary>
  );
}

