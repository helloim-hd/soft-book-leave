'use server'

import { neon } from '@neondatabase/serverless';
import { LeaveDB, LeaveWithUserDB, TakenLeaveDB } from './types';

const sql = neon(process.env.DATABASE_URL)

export async function fetchLeaves() {
  try {
    const data = await sql<LeaveWithUserDB[]>`
    SELECT users.name, users.color, users.text_color, leaves.from, leaves.to
    FROM users
    INNER JOIN leaves
    ON users.id = leaves.user_id
    `
    return data;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch leave data.')
  }
}

export async function fetchTakenLeaves(from: string, to: string) {
  try {
    const data = await sql<TakenLeaveDB[]>`
    WITH requested_dates AS (
      SELECT generate_series(${from}::date, ${to}::date, '1 day') AS date
    ),
    existing_leave_counts AS (
        SELECT d.date, COUNT(*) AS count
        FROM requested_dates d
        JOIN leaves lr
          ON d.date BETWEEN lr.from AND lr.to
        GROUP BY d.date
    )
    SELECT *
    FROM existing_leave_counts
    WHERE count >= 2;
    `
    return data;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to check taken leaves.')
  }
}

export async function addLeave(from: Date, to: Date) {
  try {
    const data = await sql<[]>`
    INSERT INTO leaves (user_id, "from", "to")
    VALUES (1, ${from}, ${to});
    `
    return data;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to check taken leaves.')
  }
}
