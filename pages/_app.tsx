import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { AppContextProvider } from "../context" 
import MainLayout from '../components/MainLayout';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ChainId.FantomTestnet} >
      <AppContextProvider>
        <MainLayout>
          <Component {...pageProps} />  
        </MainLayout>
      </AppContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp
