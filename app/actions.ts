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

export async function getScores() {
  try {
    const scores = await sql`SELECT * FROM Game ORDER BY score DESC LIMIT 20`;

    const { rows } = scores;

    return rows;
  } catch (e) {
    console.log("ERROR", e);
    return { message: "Failed to get scores" };
  }
}

export async function getDailyScores() {
  try {
    const scores =
      await sql`SELECT * FROM Game WHERE DATE(created_at) = DATE(NOW()) ORDER BY score DESC LIMIT 20;`;

    const { rows } = scores;

    return rows;
  } catch (e) {
    console.log("ERROR", e);
    return { message: "Failed to get scores" };
  }
}
