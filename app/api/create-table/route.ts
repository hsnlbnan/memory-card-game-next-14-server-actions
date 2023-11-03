import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE Game ( 
        id serial PRIMARY KEY,
        created_at timestamp default current_timestamp,
        user_name varchar(255),
        score int,
        time int
       );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
