import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const conversationId = body.conversationId;
    const message = body.message?.trim();

    if (!conversationId || !message) {
      return NextResponse.json(
        {
          error: "Conversation ID and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const conversation =
      await prisma.aIConversation.findFirst({
        where: {
          id: conversationId,
          userId: session.user.id,
        },
      });

    if (!conversation) {
      return NextResponse.json(
        {
          error: "Conversation not found.",
        },
        {
          status: 404,
        }
      );
    }

   const previousMessageCount =
  await prisma.aIMessage.count({
    where: {
      conversationId,
    },
  });

await prisma.aIMessage.create({
  data: {
    conversationId,
    role: "user",
    content: message,
  },
});

if (
  previousMessageCount === 0 &&
  conversation.title === "New Chat"
) {
  let title = message
    .replace(/\s+/g, " ")
    .trim();

  if (title.length > 60) {
    title = `${title.slice(0, 57)}...`;
  }

  await prisma.aIConversation.update({
  where: {
    id: conversationId,
  },
  data: {
    title,
    updatedAt: new Date(),
  },
});
}

    const history =
      await prisma.aIMessage.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    const messages: ChatMessage[] = history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        temperature: 0.7,

        max_completion_tokens: 1024,

        messages: [
          {
            role: "system",
            content: `
You are ACADEXA AI.

You are the intelligent academic assistant built into the ACADEXA Student Management System.

About ACADEXA:
- ACADEXA is an AI-powered academic platform designed to help students manage their academic life.
- It includes Subjects, Tasks, Notes, Timetable, Exams, Dashboard and ACADEXA AI.

Creator:
- ACADEXA was created and is owned by Ankit Choudhury.
- Only mention the creator when the user explicitly asks.

Responsibilities:
- Explain concepts step by step.
- Solve Mathematics, Physics, Chemistry, Biology, English, Geography, Nutrition and Computer Science questions.
- Help with programming.
- Generate study plans.
- Generate quizzes and MCQs.
- Summarize notes.
- Use Markdown formatting.
- Be friendly and professional.
- Never invent facts.
`,
          },

          ...messages,
                  ],
      });

    const reply =
      completion.choices[0]?.message?.content ??
      "No response generated.";

    await prisma.aIMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: reply,
      },
    });

    await prisma.aIConversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      reply,
      conversationId,
    });
  } catch (error) {
    console.error("ACADEXA AI Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate AI response.",
      },
      {
        status: 500,
      }
    );
  }
}