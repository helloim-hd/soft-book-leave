'use server'

import { neon } from '@neondatabase/serverless';
import { LeaveDB, LeaveWithUserDB } from './types';

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
    const data = await sql<LeaveDB[]>`
    SELECT *
    FROM leaves 
    WHERE ('${from}' <= leaves.from AND '${to}' >= leaves.from)
    OR ('${from}' < leaves.to AND '${to}' >= leaves.to)
    OR ('${from}' >= leaves.from AND '${to}' < leaves.to)
    `
    return data;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to check taken leaves.')
  }
}
