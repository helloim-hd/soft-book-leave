'use client';

import { Datepicker } from 'flowbite-react';
import { useState } from 'react';
import LeaveTable from './components/leave-table';
import Link from 'next/link';

export default function Leave() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  function handleFromDatepicker(date: string) {
    setFrom(date);
  }

  function handleToDatepicker(date: string) {
    setTo(date);
  }

  function addLeave() {
    const details = {
      name,
      from,
      to,
    };
    // check if date can be booked . if yes, set list else show error message
    for (let x of list) {
      if ((from >= x.from && from <= x.to) || (to >= x.from && to <= x.to)) {
        console.log('cannot book');
        break;
      }
    }
    setList([...list, details]);
    console.log(list);
  }

  function handleNameChange(name: string) {
    // alert(name);
    setName(name);
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
          <Datepicker onChange={handleFromDatepicker} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            To
          </label>
          <Datepicker onChange={handleToDatepicker} />
        </div>
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={addLeave}
      >
        Book
      </button>
      <LeaveTable leaveList={list} />
    </div>
  );
}
