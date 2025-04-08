import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const data = [
  {
    from: 'Wed Feb 26 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    to: 'Mon Mar 03 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    name: 'Ron',
    color: '#baffc9',
  },
  {
    from: 'Thu Apr 24 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    to: 'Sat Apr 26 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    name: 'Hermione',
    color: '#ffdad5',
  },
  {
    from: 'Mon Apr 28 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    to: 'Fri May 02 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    name: 'Harry',
    color: '#ece6ff',
  },
  {
    from: 'Mon Apr 28 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    to: 'Fri May 02 2025 00:00:00 GMT+0800 (Singapore Standard Time)',
    name: 'Luna',
    color: '#ffb3ba',
  },
];

export default data;
