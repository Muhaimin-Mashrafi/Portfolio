import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHeader label="Error 404" title="This page doesn't exist." lead="It may have moved, or it was never published." />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8"><TextLink href="/">Back to home</TextLink></div>
    </>
  );
}
