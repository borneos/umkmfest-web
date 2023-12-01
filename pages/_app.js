import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "@/components/Analytics";
import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    router.events.on('routeChangeComplete', logPageView);
  }, [router.events]);

  return (
    <main className={outfit.className}>
      <Component {...pageProps} />
    </main>
  );
}
