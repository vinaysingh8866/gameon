import "../styles/globals.css";

import type { AppProps } from "next/app";
import { NativeBaseProvider } from "native-base";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NativeBaseProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

export default MyApp;
