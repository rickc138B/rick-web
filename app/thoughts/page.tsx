"use client";
import { useEffect, useMemo, useState } from "react";
import { PinataSDK, PinListItem } from "pinata-web3";
import MarkdownFromIPFS from "../components/MarkdownFromIPFS";
import AddThoughtDialog from "../components/AddThoughtDialog";
import { useAccount } from "wagmi";

export default function Thoughts() {
  const [files, setFiles] = useState<PinListItem[]>([]);
  const [open, setOpen] = useState(false);
  const { isConnected } = useAccount();
  const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT;
  const pinataGateway = process.env.NEXT_PUBLIC_GATEWAY_URL;

  // Memoize the pinata object to avoid creating a new instance on every render
  const pinata = useMemo(() => {
    return new PinataSDK({
      pinataJwt,
      pinataGateway,
    });
  }, [pinataJwt, pinataGateway]); // Dependencies are the JWT and gateway URL

  useEffect(() => {
    async function getFiles() {
      const files = await pinata.listFiles();
      setFiles(files);
    }

    getFiles();
  }, [pinata]);

  // console.log(process.env.NEXT_PUBLIC_PINATA_JWT)

  // uploadFile();
  return (
    <>
      <div className="absolute bg-black h-full w-full top-0 opacity-80 z-5"></div>
      <div
        className="text-white z-50 relative p-4 md:p-24"
        style={{ fontFamily: `sour_gummy, sans-serif` }}
      >
        <div className="max-w-4xl mx-auto ">
          <h1 className="font-bold text-5xl mb-4">Thoughts</h1>
          <div
            className=" overflow-y-scroll scrollbar-hide"
            style={{ height: "70vh" }}
          >
            {isConnected ? (
              <AddThoughtDialog
                pinata={pinata}
                open={open}
                setIsOpen={setOpen}
                lastUid={files[0]?.metadata.keyvalues?.uid}
              />
            ) : null}
            {files.length === 0
              ? Array.from({ length: 2 }).map((_, index) => (
                  <MarkdownSkeleton key={index} />
                ))
              : files.map((item) => (
                  <MarkdownFromIPFS
                    cid={item.ipfs_pin_hash}
                    timestamp={item.date_pinned}
                    uid={item.metadata.keyvalues?.uid}
                    tag={item.metadata.keyvalues?.tag}
                    key={item.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

const MarkdownSkeleton = () => (
  <div className="my-10 animate-pulse">
    <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded-md"></div>
    <div className="bg-gray-300 h-6 w-2/3 rounded-md"></div>
    <hr className="w-full border-gray-300 border-1 mt-4 mb-2" />
    <div className="flex justify-between text-lg">
      <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
      <div className="bg-gray-300 h-4 w-16 rounded-md"></div>
    </div>
  </div>
);
