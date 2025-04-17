'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // You can redirect or show a not authorized message
    return <p>Access Denied</p>;
  }

  return <div>Welcome, {session.user?.name}!</div>;
}


// import { getServerSession } from "next-auth/next"
// import type { NextRequest } from "next/server"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// export default async function Protected (req: NextRequest): Promise<any> {
//   const session = await getServerSession(authOptions)

//   return (
//     <div className='grid grid-cols-2 text-white p-4'>
//       <div>
//         {
//           session !== null
//             ? <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
//                 Hi {session?.user.name}!
//               </h1>
//             : <a className='btn btn-primary' href='/api/auth/signin'>Sign in</a>
//         }
//       </div>
//     </div>
//   )
// }