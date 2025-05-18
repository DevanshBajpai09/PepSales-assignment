import { prisma } from "@/lib/prisma";  
import { sendNotificationToQueue } from "@/lib/rabbitmqProducer"; 
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId, message, type, email, phoneNumber } = body;

  if (!userId || !message || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const notification = await prisma.notification.create({
      data: { userId, message, type },
    });

    await sendNotificationToQueue({ userId, message, type, email, phoneNumber });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}
