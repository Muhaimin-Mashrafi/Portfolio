import { CollaborationCta, ContactLinks } from "@/components/contact/ContactLinks";
import { Section } from "@/components/ui/Section";

export function ContactSection() {
  return (
    <Section id="contact" label="Contact" border={false}>
      <CollaborationCta />
      <div className="mt-8"><ContactLinks /></div>
    </Section>
  );
}
