"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export async function sendScore({ user_name, score, time }) {
  const schema = z.object({
    user_name: z.string(),
    score: z.number(),
    time: z.number(),
  });

  console.log("XXXX", user_name, score, time);

  const data = schema.parse({
    user_name,
    score,
    time,
  });

  console.log("DATA", data);
  try {
    await sql`INSERT INTO Game (user_name, score, time) VALUES (${
      data.user_name
    }, ${Math.round(Number(data.score))}, ${data.time})`;
    console.log("DATA", data);
    revalidatePath("/");
    return { message: "Game created successfully" };
  } catch (e) {
    console.log("ERROR", e);
    return { message: "Failed to create todo" };
  }
}
