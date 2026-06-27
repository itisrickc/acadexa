"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AIChat from "./AIChat";
import ConversationSidebar from "./ConversationSidebar";

type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  initialConversationId?: string;
};

export default function AIWorkspace({
  initialConversationId,
}: Props) {
  const router = useRouter();

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState<string | undefined>(
    initialConversationId
  );

  const [loading, setLoading] =
    useState(true);

  const loadConversations =
    useCallback(async () => {
      try {
        const res = await fetch(
          "/api/ai/conversations",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to load conversations."
          );
        }

        const data: Conversation[] =
          await res.json();

        setConversations(data);

        if (
          !selectedConversation &&
          data.length > 0
        ) {
          setSelectedConversation(
            data[0].id
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [selectedConversation]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (initialConversationId) {
      setSelectedConversation(
        initialConversationId
      );
    }
  }, [initialConversationId]);

  const selectConversation = (
    id: string
  ) => {
    setSelectedConversation(id);

    router.push(`/dashboard/ai/${id}`);
  };
    const createConversation = async () => {
    try {
      const res = await fetch(
        "/api/ai/conversations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create conversation."
        );
      }

      const conversation: Conversation =
        await res.json();

      setConversations((prev) => [
        conversation,
        ...prev,
      ]);

      setSelectedConversation(
        conversation.id
      );

      router.push(
        `/dashboard/ai/${conversation.id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteConversation =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Delete this conversation?"
        );

      if (!confirmed) {
        return;
      }

      try {
        const res = await fetch(
          `/api/ai/conversations/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to delete conversation."
          );
        }

        const updated =
          conversations.filter(
            (c) => c.id !== id
          );

        setConversations(updated);

        if (
          selectedConversation === id
        ) {
          if (updated.length > 0) {
            setSelectedConversation(
              updated[0].id
            );

            router.replace(
              `/dashboard/ai/${updated[0].id}`
            );
          } else {
            setSelectedConversation(
              undefined
            );

            router.replace(
              "/dashboard/ai"
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

  const refreshSidebar =
    useCallback(async () => {
      await loadConversations();
    }, [loadConversations]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading conversations...
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">

      <ConversationSidebar
        conversations={conversations}
        currentId={
          selectedConversation
        }
        onSelect={
          selectConversation
        }
        onNewChat={
          createConversation
        }
        onDelete={
          deleteConversation
        }
      />

      <div className="flex flex-1 overflow-hidden">
            {selectedConversation ? (
          <AIChat
            key={selectedConversation}
            conversationId={
              selectedConversation
            }
            onConversationUpdated={
              refreshSidebar
            }
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="max-w-md text-center">

              <h2 className="text-2xl font-bold">
                Welcome to ACADEXA AI
              </h2>

              <p className="mt-3 text-gray-500">
                Create a new conversation to
                start chatting with ACADEXA AI.
              </p>

              <button
                onClick={
                  createConversation
                }
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                + New Chat
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}