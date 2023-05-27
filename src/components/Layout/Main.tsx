import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto px-10 py-10 md:max-w-4xl md:px-0">{children}</main>
  );
}
