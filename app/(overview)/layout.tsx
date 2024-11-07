import { Providers } from "../themes/providers";
import NavigationBar from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Providers>
        <NavigationBar />
        {children}
        <div className="mb-3">
          <Footer />
        </div>
      </Providers>
    </div>
  );
}
