import AdminNav from "@/components/admin/layout/Nav";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative pl-[20vw]">
      <AdminNav />
      <Toaster />
      {children}
    </section>
  );
}
