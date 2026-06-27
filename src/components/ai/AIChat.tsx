"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AIInput from "./AIInput";
import AIMessage from "./AIMessage";
import AILoading from "./AILoading";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type ConversationResponse = {
  id: string;
  title: string;
  messages: Message[];
};

type Props = {
  conversationId: string;
  onConversationUpdated?: () => void;
};

export default function AIChat({
  conversationId,
  onConversationUpdated,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [initialLoading, setInitialLoading] =
    useState(true);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const loadConversation =
    useCallback(async () => {
      try {
        setInitialLoading(true);

        const res = await fetch(
          `/api/ai/conversations/${conversationId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to load conversation."
          );
        }

        const data: ConversationResponse =
          await res.json();

        setMessages(data.messages);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    }, [conversationId]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) {
      return;
    }

    const optimisticUser: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt:
        new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      optimisticUser,
    ]);

    setInput("");

    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          message: text,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message.");
      }

      await res.json();

await loadConversation();

onConversationUpdated?.();
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "❌ Sorry, something went wrong while contacting ACADEXA AI.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <AILoading />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">

      <div className="flex-1 space-y-6 overflow-y-auto p-6">

        {messages.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            <h2 className="text-2xl font-bold">
              ACADEXA AI
            </h2>

            <p className="mt-2">
              Start a conversation by asking anything.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <AIMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && <AILoading />}

        <div ref={bottomRef} />

      </div>
            <AIInput
        value={input}
        loading={loading}
        onChange={setInput}
        onSend={sendMessage}
      />
    </div>
  );
}