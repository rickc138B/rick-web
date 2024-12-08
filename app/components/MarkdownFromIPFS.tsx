"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";

type MarkdownFromIPFSProps = {
  cid: string;
  timestamp: string;
  uid: string;
  tag: string;
};
const MarkdownFromIPFS = ({
  cid,
  timestamp,
  uid,
  tag,
}: MarkdownFromIPFSProps) => {
  const [, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  // Fetch markdown content from IPFS URL
  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
        if (!response.ok) {
          throw new Error(`Error fetching Markdown: ${response.statusText}`);
        }
        const markdown = await response.text();
        setMarkdownContent(markdown);

        // Convert markdown to HTML
        const html = marked(markdown);
        setHtmlContent(html as string);
      } catch (error) {
        console.error("Failed to fetch markdown from IPFS:", error);
      }
    };

    fetchMarkdown();
  }, [cid]);

  function formattedDate(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  }

  return (
    <div>
      {/* Render HTML content */}
      {htmlContent ? (
        <div className="my-10 ">
          <div
            className="md-container text-justify text-xl"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <hr className="w-full border-white border-1 mt-4 mb-2" />
          <div className="flex justify-between text-lg">
            <div>
              <span>#{uid}</span> &nbsp;/&nbsp;{" "}
              <span>{formattedDate(timestamp)}</span>
            </div>
            <div>{tag ? <span>#{tag}</span> : null}</div>
          </div>
        </div>
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default MarkdownFromIPFS;
