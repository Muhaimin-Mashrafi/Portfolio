import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CollaborationCta, ContactLinks } from "@/components/contact/ContactLinks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Abdullah Al Muhaimin — LinkedIn, GitHub and collaboration enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader label="Contact" title="Let's talk." />
      <div className="mx-auto max-w-7xl space-y-10 px-5 py-14 sm:px-8 md:py-20">
        <CollaborationCta />
        <ContactLinks />
      </div>
    </>
  );
}
