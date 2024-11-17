"use client"
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

// Custom Theme Configuration
const myCustomTheme = lightTheme({
  accentColor: '#EF4444', // Change this to your desired button color
  accentColorForeground: '#ffffff', // The text color on the button
  borderRadius: 'small', // Can be 'small', 'medium', or 'large'
  fontStack: 'system',   // Can be 'system' or 'rounded'
  overlayBlur: 'small',
});

export default function RainbowkitWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={myCustomTheme}>
             
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
 
  );
}
