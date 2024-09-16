import Link from 'next/link';
import NavLinks from './navlink';
import { auth } from '@/auth'
import { fetchNotice } from '@/data/actions/notice';
import Image from 'next/image';


export default async function NavBar() {
    const notice: any = await fetchNotice();
    let n: string = '';
    let val: any = null;
    let linki = '/login', la = 'Login';
    val = await auth()
    if (val !== null) {
        linki = '/dashboard',
            la = " Go to Dashboard"
    }
    return (<>
        <div className="flex grow  bg-green-100 mb-2 mx-1">
            <Image
                src='/logo.png'
                className="flex justify-center rounded-lg"
                width={70}
                height={70}
                alt='logo image'
            />
            <div className='w-full'>
                {
                    notice ? <>
                        {
                            notice.map((note: any) => {
                                <div>{note.message}</div>
                                n = n + ' ' + note.message
                            })
                        }
                        <div className="marquee-container justify-center">
                            <div className=" w-full marquee-text justify-center text-red-600 text-lg font-semibold">
                                {n}
                            </div>
                        </div>
                    </> : <></>
                }
                <div className='flex justify-around'>
                    <div className='flex justify-center'>
                        <NavLinks />
                    </div>
                    <div>
                        <Link className="flex h-[48px] w-full grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-sky-300 md:flex-none md:justify-start md:p-2 md:px-3" href={linki}>{la} </Link>
                    </div>
                </div>

            </div>
        </div >
    </>)
}