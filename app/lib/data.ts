'use server'

import { neon } from '@neondatabase/serverless';

const sql = neon('postgres://neondb_owner:npg_A7i2VXOglauM@ep-soft-pine-a1c3he82-pooler.ap-southeast-1.aws.neon.tech/neondb')

export async function fetchLeaves() {
  console.log("here")
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
