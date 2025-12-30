'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SITE_CONFIG } from '../../constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleNavClick = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${hash}`);
    }
  };

  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b border-purple-500/10 bg-[#0f0a1f]/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-5'>
        {/* 로고 */}
        <Link
          href='/'
          onClick={handleLogoClick}
          className='bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-black text-transparent'
        >
          {SITE_CONFIG.name}
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className='hidden items-center gap-6 md:flex'>
          <Link href='/#tests' onClick={handleNavClick('tests')} className='text-sm text-gray-400 transition-colors hover:text-white'>
            테스트
          </Link>
          <Link href='/#about' onClick={handleNavClick('about')} className='text-sm text-gray-400 transition-colors hover:text-white'>
            소개
          </Link>
        </nav>

        {/* 햄버거 메뉴 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='flex flex-col gap-1.5 md:hidden'
          aria-label='메뉴'
        >
          <span
            className={`h-0.5 w-6 bg-purple-400 transition-all ${
              isMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-purple-400 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-purple-400 transition-all ${
              isMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav className='border-t border-purple-500/10 bg-[#0f0a1f] md:hidden'>
          <div className='mx-auto max-w-5xl px-5 py-4'>
            <div className='flex flex-col gap-4'>
              <Link
                href='/#tests'
                className='text-sm text-gray-400 transition-colors hover:text-white'
                onClick={handleNavClick('tests')}
              >
                테스트
              </Link>
              <Link
                href='/#about'
                className='text-sm text-gray-400 transition-colors hover:text-white'
                onClick={handleNavClick('about')}
              >
                소개
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
