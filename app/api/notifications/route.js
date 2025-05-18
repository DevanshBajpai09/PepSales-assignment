import { prisma } from "@/lib/prima";
import { sendNotificationToQueue } from "@/lib/rabbitmqProducer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId, message, type, email, phoneNumber } = body;

  if (!userId || !message || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const notification = await prisma.notification.create({
    data: { userId, message, type },
  });

  try {
    await sendNotificationToQueue({
      userId,
      message,
      type,
      email,
      phoneNumber
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to enqueue notification" }, { status: 500 });
  }

  return NextResponse.json(notification, { status: 201 });
}
