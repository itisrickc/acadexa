import AIWorkspace from "@/components/ai/AIWorkspace";

type Props = {
  params: Promise<{
    conversationId: string;
  }>;
};

export default async function ConversationPage({
  params,
}: Props) {
  const { conversationId } = await params;

  return (
   <AIWorkspace
  initialConversationId={conversationId}
/>
  );
}