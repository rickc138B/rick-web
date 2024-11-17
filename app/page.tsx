"use client";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // const router = useRouter();
  const typewriterText = "Hello I’m \n S Rick C138-B E \nWelcome to\nMy LAB"; // Text to display
  const typingSpeed = 100; // Speed in ms per character
  const [displayedText, setDisplayedText] = useState(""); // Tracks text being displayed
  const [cursorVisible, setCursorVisible] = useState(true); // Tracks cursor visibility

  useEffect(() => {
    setDisplayedText("");
    let index = 0; // Tracks the current character
    const typeWriter = () => {
      if (index < typewriterText.length) {
        const currentChar = typewriterText[index];
        setDisplayedText(
          (prev) =>
            prev +
            (currentChar === "\n"
              ? "<br />"
              : currentChar === "S"
              ? `<span class="text-red-500">`
              : currentChar === "E"
              ? `</span>`
              : currentChar)
        );
        index++;
        setTimeout(typeWriter, typingSpeed);
      }
    };

    typeWriter();
    return () => {
      // Cleanup function in case component unmounts during typing
      index = typewriterText.length; // Stop typing effect
    };
  }, [typewriterText]); // Runs once on mount

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div className="absolute bg-black h-full w-full top-0 opacity-50 z-5"></div>
      <div className="flex flex-wrap items-center h-full px-2 md:px-12 gap- relative">
        <div
          className="w-full md:min-h-96 xl:w-5/12 md:my-0 md:my-16 p-6 rounded-lg py-12 opacity-80"
          style={{
            background: `radial-gradient(circle, #ffffff, #afffff, #0b0e0e)`,
            fontFamily: `sour_gummy, sans-serif`,
          }}
        >
          {/* <p id="typewriter"  dangerouslySetInnerHTML={{ __html: displayedText }} className="text-center text-6xl md:text-7xl font-bold">
      
          </p> */}
          <p
            id="typewriter"
            dangerouslySetInnerHTML={{
              __html: `${displayedText}${cursorVisible ? "_" : " "}`, // Add blinking cursor
            }}
            className="text-center text-5xl md:text-7xl font-bold"
          ></p>

          <div className="flex w-full justify-between text-xl md:text-3xl text-center mt-12 md:px-12">
            <button disabled className="border-2 border-black p-2 rounded-md hover:text-white hover:bg-black hover:border-white">
              Work
            </button>

            <button disabled className="border-2 border-black p-2 rounded-md hover:text-white hover:bg-black hover:border-white">
              Lab Notes
            </button>
            <Link href="/thoughts">
              <button className="border-2 border-black p-2 rounded-md hover:text-white hover:bg-black hover:border-white">
                Thoughts
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center w-full xl:w-5/12 xl:-mx-32 z-10">
          <Image
            className=""
            src="/rick.png"
            alt="rick character"
            width={180}
            height={38}
            priority
          />
        </div>
      </div>
    </>
  );
}
