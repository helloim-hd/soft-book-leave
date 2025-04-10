'use server'

import postgres from 'postgres';
import { LeaveDB } from './types';

const sql = postgres('postgres://neondb_owner:npg_A7i2VXOglauM@ep-soft-pine-a1c3he82-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require', { ssl: 'require' });

export async function fetchLeaves() {
  console.log("here")
  try {
    // const data = await sql<LeaveDB[]>`
    // SELECT Users.name, Leaves.from, Leaves.to
    // FROM Users
    // INNER JOIN Leaves
    // ON Users.id = Leaves.user_id
    // `

    const data = await sql<LeaveDB[]>`
    SELECT *
    FROM leaves
    `
    console.log("this is the data", data)
    return data;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch leave data.')
  }
}

// const data = [
//   {
//     from: 'Wed Feb 26 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     to: 'Mon Mar 03 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     name: 'Ron',
//     color: '#baffc9',
//   },
//   {
//     from: 'Thu Apr 24 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     to: 'Sat Apr 26 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     name: 'Hermione',
//     color: '#ffdad5',
//   },
//   {
//     from: 'Mon Apr 28 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     to: 'Fri May 02 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     name: 'Harry',
//     color: '#ece6ff',
//   },
//   {
//     from: 'Mon Apr 28 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     to: 'Fri May 02 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
//     name: 'Luna',
//     color: '#ffb3ba',
//   },
// ];

// export default data;
