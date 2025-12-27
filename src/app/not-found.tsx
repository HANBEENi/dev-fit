import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: '찾으시는 페이지를 찾을 수 없습니다.',
  robots: {
    index: false, // 색인하지 않음
    follow: false, // 링크를 따라가지 않음
  },
};

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-linear-to-br from-black via-gray-800 to-purple-900 py-20'>
      <h2 className='text-3xl font-bold text-white uppercase'>Not Found</h2>
      <p className='max-w-md text-center text-lg text-gray-300'>
        Oops! 찾으시는 페이지를 찾을 수 없습니다. <br />
        입력하신 URL이 정확한지 확인하거나 홈으로 돌아가세요.
      </p>
      <Link href='/'>Home</Link>
    </div>
  );
}
