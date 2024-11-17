import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LabNotes() {
  return (
    <div>
      <div className="absolute bg-black h-full w-full top-0 opacity-80 z-5"></div>
      <div
        className="text-white z-50 relative p-4 md:p-24"
        style={{ fontFamily: `sour_gummy, sans-serif` }}
      >
        <div className="max-w-4xl mx-auto ">
          <h1 className="font-bold text-5xl mb-4">
            <Link href="/">
              <button title="back">
                <ArrowLeft />
              </button>
            </Link>
            WIP <span className="text-sm">(come back later)</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
