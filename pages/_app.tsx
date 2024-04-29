import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains"
import { AppContextProvider } from "../context" 
import MainLayout from '../components/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ScrollSepoliaTestnet} >
      <AppContextProvider>
        <MainLayout>
          <Component {...pageProps} /> 
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" /> 
        </MainLayout>
      </AppContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp
