"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function AIMessage({
  role,
  content,
}: Props) {
  const isAI = role === "assistant";

  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div
      className={`flex items-start gap-4 ${
        isAI ? "" : "flex-row-reverse"
      }`}
    >
      {/* Avatar */}

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg shadow-lg ${
          isAI
            ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        {isAI ? "🤖" : "👤"}
      </div>

      {/* Message */}

      <div
        className={`relative max-w-[80%] rounded-2xl px-5 py-4 shadow ${
          isAI
            ? "bg-gray-100 text-black"
            : "bg-blue-600 text-white"
        }`}
      >
        {isAI && (
          <button
            onClick={copyText}
            className="absolute right-3 top-3 rounded-md border bg-white px-2 py-1 text-xs transition hover:bg-gray-100"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>
        )}

        {isAI ? (
          <article className="prose prose-slate max-w-none pr-16">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );

                  if (!inline && match) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  }

                  return (
                    <code
                      className="rounded bg-gray-200 px-1 py-0.5"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>

          </article>
        ) : (
          <p className="whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}