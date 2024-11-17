"use client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Auth() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    // If the wallet is connected, redirect to the homepage
    if (isConnected) {
      router.push("/");
    }
  }, [isConnected, router]); // Depend on isConnected and router

  return (
    <>
      <div className="absolute bg-black h-full w-full top-0 opacity-80 z-5"></div>
      <div>
        <ConnectButton />
      </div>
    </>
  );
}
