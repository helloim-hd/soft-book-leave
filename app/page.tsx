'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { CalendarDetails } from './lib/types';
import { fetchLeaves as fetchLeavesDB } from '@/app/lib/data';

export default function Home() {
  const [leaves, setLeaves] = useState<CalendarDetails[]>([]);
  const runCount = useRef<number>(0);

  useEffect(() => {
    async function fetchLeaves() {
      const response = await fetchLeavesDB();
      const leaves = response.map((x) => {
        return {
          title: x.name,
          start: format(x.from, 'yyyy-MM-dd'),
          end: format(x.to, 'yyyy-MM-dd'),
          backgroundColor: x.color,
          borderColor: x.color,
          textColor: 'black',
        };
      });
      setLeaves(leaves);
    }

    if (runCount.current !== 0) {
      fetchLeaves();
    }
    runCount.current++;
  }, []);

  return (
    <div className="m-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={leaves}
      />

      <Link
        href="/leave"
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mt-3"
      >
        <p>Soft Book</p>
      </Link>
    </div>
  );
}
