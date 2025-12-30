'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { SITE_CONFIG, EXTERNAL_LINKS } from '../../constants';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <footer className='border-t border-purple-500/20 bg-[#0f0a1f] py-12'>
      <div className='mx-auto max-w-5xl px-5'>
        <div className='flex flex-col items-center gap-6 text-center'>
          {/* 로고 */}
          <Link
            href='/'
            onClick={handleLogoClick}
            className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-black text-transparent'
          >
            {SITE_CONFIG.name}
          </Link>

          {/* 링크 */}
          <nav className='flex flex-wrap justify-center gap-6'>
            <Link
              href={EXTERNAL_LINKS.feedback}
              className='text-sm text-gray-500 transition-colors hover:text-purple-400'
            >
              피드백 보내기
            </Link>
            <Link
              href={EXTERNAL_LINKS.updateNote}
              className='text-sm text-gray-500 transition-colors hover:text-purple-400'
            >
              업데이트 노트
            </Link>
            <Link
              href={EXTERNAL_LINKS.email}
              className='text-sm text-gray-500 transition-colors hover:text-purple-400'
            >
              문의하기
            </Link>
          </nav>

          {/* 저작권 */}
          <p className='text-xs text-gray-600'>© 2025 {SITE_CONFIG.name} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
