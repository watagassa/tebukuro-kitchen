import Link from "next/link"
import { usePathname } from "next/navigation"

const SwitchMode = () => {
    const pathName = usePathname()

    return (
        <div className='bg-white w-full p-2'>
            <div className='flex'>

                <div className='w-1/2 px-4 flex justify-center text-black'>
                    <Link className={`px-4 py-2 ${pathName === '/' ? 'border-b-4 border-orange-400' : 'border-b-4 border-white'}`}
                        href={'/'}>
                        レシピ
                    </Link>
                </div>

                <div className='w-1/2 px-4 flex justify-center text-black'>
                    <Link className={`px-4 py-2 ${pathName === '/favorites' ? 'border-b-4 border-orange-500' : 'border-b-4 border-white'}`}
                        href={'/favorites'}>
                        お気に入り
                    </Link>
                </div>

            </div>
        </div >
    )
}

export default SwitchMode