import { useRouter } from "next/router";
import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={outfit.className}>
      <Component {...pageProps} />
      <ToastContainer />
    </main>
  );
}
