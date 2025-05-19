
import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = req.nextUrl.pathname.split("/")[3];

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(req) {
  const userId = req.nextUrl.pathname.split("/")[3];

  try {
    const requestBody = await req.json();

    if (!requestBody || Object.keys(requestBody).length === 0) {
      return NextResponse.json({ error: 'Request body is missing or invalid' }, { status: 400 });
    }

    if (requestBody?.notificationId) {
      const updatedNotification = await prisma.notification.update({
        where: { id: requestBody.notificationId },
        data: { read: true },
      });

      return NextResponse.json({ success: true, notification: updatedNotification });
    } else {
      await prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true },
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Error marking as read:", error);
    return NextResponse.json({ error: "Failed to mark notification(s) as read" }, { status: 500 });
  }
}
