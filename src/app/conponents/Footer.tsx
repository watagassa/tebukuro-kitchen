import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import Link from 'next/link';

type FooterProps = {
  pathName: string;
};

const Footer = (props: FooterProps) => {
  const { pathName } = props;
  const iconsize = 22;

  return (
    <div className='border-t-2 border-gray-400 w-full h-16 pt-1 flex justify-center bg-white'>

      <Link className='w-1/3' href={`/`}>
        <FiSearch 
          size={iconsize} 
          className={`mx-auto w-fit ${ pathName === '/' || pathName === '/favorites' ? 'text-orange-600' : 'text-gray-600'}`}/>
        <div className={`text-xs w-fit mx-auto ${ pathName === '/' || pathName === '/favorites' ? 'text-orange-600' : 'text-gray-600'}`}>
          さがす
        </div>
      </Link>

      <Link className='w-1/3' href={'/registration'}>
        <CgFileDocument 
          size={iconsize} 
          className={`mx-auto w-fit ${pathName==='/registration'?'text-orange-600' : 'text-gray-600'}` }/>
        <div className={`text-xs w-fit mx-auto ${pathName==='/registration'?'text-orange-600' : 'text-gray-600'}`}>
            登録
        </div>
      </Link>

      <Link className='w-1/3' href={'/future_user_id'}>
        <AiOutlineUser 
          size={iconsize} 
          className={`mx-auto w-fit ${pathName==='/future_user_id'?'text-orange-600' : 'text-gray-600'}`}/>
        <div className={`text-xs w-fit mx-auto ${pathName==='/future_user_id'?'text-orange-600' : 'text-gray-600'}`}>
          マイページ
        </div>
      </Link> 
    </div>
  );
}

export default Footer;
