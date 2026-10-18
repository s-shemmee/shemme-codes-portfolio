import Header from '@/components/Header';
import Sides from '@/components/section/Sides';
import Footer from '@/components/section/Footer';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Sides />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
