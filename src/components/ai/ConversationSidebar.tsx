"use client";

type Conversation = {
  id: string;
  title: string;
};

type Props = {
  conversations: Conversation[];
  currentId?: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
};

export default function ConversationSidebar({
  conversations,
  currentId,
  onSelect,
  onNewChat,
  onDelete,
}: Props) {
  return (
    <aside className="flex h-full w-72 flex-col border-r bg-white">
      <div className="border-b p-4">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {conversations.length === 0 ? (
          <p className="mt-6 text-center text-sm text-gray-500">
            No conversations yet.
          </p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group flex items-center justify-between rounded-xl p-3 transition ${
                  currentId === conversation.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <button
                  onClick={() => onSelect(conversation.id)}
                  className="flex-1 truncate text-left text-sm font-medium"
                >
                  {conversation.title}
                </button>

                <button
                  onClick={() => onDelete(conversation.id)}
                  className="ml-2 rounded p-1 text-red-500 opacity-0 transition group-hover:opacity-100 hover:bg-red-50"
                  title="Delete chat"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}