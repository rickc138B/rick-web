"use client";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const YOUR_ADDRESS = "0x1e8aFdaE0Fc0d0A5C2d294864f95FC6173C04d1b"; // Replace with your actual address

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isConnected) {
      if (address?.toLowerCase() === YOUR_ADDRESS.toLowerCase()) {
        setMessage("Welcome back, Rick!");
      } else {
        setMessage("You are not Rick. You will never be Rick. BE GONE!");
        disconnect(); // Disconnect the wallet if the address does not match
      }
    }
  }, [address, isConnected, disconnect]);

  return (
    <div className="flex justify-between items:start md:items-center ">
      <Link href="/">
        <span
          className="font-bold text-4xl hover:text-red-500"
          style={{ fontFamily: `sour_gummy, sans-serif` }}
        >
          C138-B
        </span>
      </Link>
      <div>
        {isConnected ? (
          <>
            <ConnectButton /> {message && <p>{message}</p>}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ConnectWallet;
