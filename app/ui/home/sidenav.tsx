
import { PowerIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            'use server'
            cookies().delete('access_token');
      
            redirect('/login');
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-black p-3 text-sm font-medium text-white hover:bg-gray-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
