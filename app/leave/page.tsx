'use client';

import { Datepicker } from 'flowbite-react';
import { useState } from 'react';
import LeaveTable from './components/leave-table';
import Link from 'next/link';
import { format } from 'date-fns';
import { Leave as LeaveType, TakenLeaveDB } from '../lib/types';
import { fetchTakenLeaves, addLeave } from '@/app/lib/data';
import { NoSlotModal } from './components/no-slot-modal';

export default function Leave() {
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());
  const [name, setName] = useState(''); 
  const [list, setList] = useState<LeaveType[]>([]);
  const [showNoSlot, setShowNoSlot] = useState<boolean>(false);
  const [takenLeaves, setTakenLeaves] = useState<TakenLeaveDB[]>([]);
  const [minToDate, setMinToDate] = useState<Date>(new Date());

  function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }

  function handleFromDatepicker(date: Date | null) {
    if (!date) date = new Date();
    setFrom(date);
    setMinToDate(date);
  }

  function handleToDatepicker(date: Date | null) {
    if (!date) date = new Date();
    setTo(date);
  }

  async function handleLeaveBooking() {
    const details = {
      name,
      from,
      to,
    };
    const takenLeaves: TakenLeaveDB[] = await fetchTakenLeaves(formatDate(from), formatDate(to));
    if (takenLeaves.length > 0) {
      handleNoSlotModal();
      setTakenLeaves(takenLeaves);

    } else {
      await addLeave(from, to);
      setList([...list, details]);
    }
    
    
  }

  function handleNameChange(name: string) {
    setName(name);
  }

  function handleNoSlotModal() {
    setShowNoSlot(!showNoSlot);
  
  }

  return (
    <div className="m-5">
      <Link
        href="/"
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mt-3"
      >
        <p>Back</p>
      </Link>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            From
          </label>
          <Datepicker onChange={handleFromDatepicker} minDate={new Date()} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            To
          </label>
          <Datepicker onChange={handleToDatepicker} minDate={from} />
        </div>
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleLeaveBooking}
      >
        Book
      </button>
      <LeaveTable list={list} />
      <NoSlotModal openModal={showNoSlot} handleModal={handleNoSlotModal} takenDates={takenLeaves} />
    </div>
  );
}
