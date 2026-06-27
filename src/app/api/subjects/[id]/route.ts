import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, color } = await request.json();

    const subject = await prisma.subject.update({
      where: {
        id,
      },
      data: {
        name,
        color,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update subject.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.subject.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete subject.",
      },
      {
        status: 500,
      }
    );
  }
}