import Link from 'next/link';
import { SITE_CONFIG } from '../../constants';

export default function Header() {
  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b border-purple-500/10 bg-[#0f0a1f]/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-5'>
        <Link
          href='/'
          className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-black text-transparent'
        >
          {SITE_CONFIG.name}
        </Link>
        <nav className='flex items-center gap-6'>
          <Link href='/#tests' className='text-sm text-gray-400 transition-colors hover:text-white'>
            테스트
          </Link>
          <Link href='/#about' className='text-sm text-gray-400 transition-colors hover:text-white'>
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
