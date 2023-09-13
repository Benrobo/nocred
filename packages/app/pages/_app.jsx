import "@/styles/globals.css";
import { ppB, ppEB, ppReg } from "../config/font";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-ppReg: ${ppReg.style.fontFamily};
            --font-ppB: ${ppB.style.fontFamily};
            --font-ppEB: ${ppEB.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
