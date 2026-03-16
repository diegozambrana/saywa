import { Suspense } from "react";
import { FooterPublic } from "@/components/layout/Footer";

import { PublicHeader } from "@/components/layout/Header/PublicHeader";
import { Home } from "@/features/Home";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 w-full">
        <Home />
        {/* <ContactSection /> */}
      </main>
      <Suspense>
        <FooterPublic />
      </Suspense>
    </div>
  );
}
