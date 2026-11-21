import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Visit & contact | TeddyPups U.A.E.",
  description:
    "Visit our boutique showroom in Downtown Dubai or write to our adoption team on WhatsApp.",
};

export default function ContactPage() {
  return <ContactForm />;
}
