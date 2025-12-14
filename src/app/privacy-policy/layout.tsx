import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "River Paws privacy policy. Learn how we collect, use, and protect your personal information when you use our dog grooming and hiking services in Waunakee, WI.",
  alternates: {
    canonical: "https://www.riverpaws.dog/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

