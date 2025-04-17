'use server'

import { neon } from '@neondatabase/serverless';
// import { LeaveDB, LeaveWithUserDB, TakenLeaveDB } from './types';

// const sql = neon(process.env.DATABASE_URL)

export async function authenticate(username, password) {
  try {
    return {
        user: {name: 'hermione'},
        token: 'test123'
    };

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch leave data.')
  }
}