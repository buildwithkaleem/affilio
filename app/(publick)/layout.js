import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";


export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}