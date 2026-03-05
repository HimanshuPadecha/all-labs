import { users } from "@/db/schema";
import { db } from "@/index";
import { WebhookEvent } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    // Do something with payload
    // For this guide, log payload to console

    if (!evt || !evt.data) {
      return new NextResponse("Event not found !!", { status: 404 });
    }

    console.log(evt);
    const { type } = evt;

    if (type === "user.created") {
      const { email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;

      const {
        id: clerkId,
        first_name,
        last_name,
        image_url: profileImage,
      } = evt.data;

      if (!clerkId || !email || !first_name || !last_name || !profileImage) {
        return new NextResponse("Important fields not found !!", {
          status: 400,
        });
      }

      const [user] = await db
        .insert(users)
        .values({
          clerkId,
          name: `${first_name} ${last_name}`,
          email,
          profileImage,
        })
        .returning();

      return new NextResponse("User created successfully !!", { status: 200 });
    }

    if (type === "user.deleted") {
      const { id: clerkId } = evt.data;

      if (!clerkId) {
        return new NextResponse("clerk id not found", { status: 404 });
      }

      const [user] = await db
        .delete(users)
        .where(eq(users.clerkId, clerkId))
        .returning();

      return new NextResponse("User deleted successfully !!", { status: 200 });
    }

    if (type === "user.updated") {
      const { email_addresses } = evt.data;
      const email = email_addresses[0]?.email_address;

      const {
        id: clerkId,
        first_name,
        last_name,
        image_url: profileImage,
      } = evt.data;

      if (!clerkId || !email || !first_name || !last_name || !profileImage) {
        return new NextResponse("Important fields not found !!", {
          status: 400,
        });
      }

      const [user] = await db
        .update(users)
        .set({
          name: `${first_name} ${last_name}`,
          email,
          profileImage,
        })
        .where(eq(users.clerkId, clerkId))
        .returning();

      return new NextResponse("User updated successfully !!", { status: 200 });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
