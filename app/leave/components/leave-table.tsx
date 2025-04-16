import { useEffect } from 'react';
import { format } from 'date-fns';
import { Leave, LeaveList } from '@/app/lib/types';

export default function LeaveTable({list}: LeaveList) {
  useEffect(() => {}, [list]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
              To
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(x => (
            <>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {x.name}
                </th>
                <td className="px-6 py-4">{format(x.from, 'dd MMMM yyyy')}</td>
                <td className="px-6 py-4">{format(x.to, 'dd MMMM yyyy')}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
