import Image from 'next/image';
import Link from 'next/link';
import { lazy, useState } from 'react';

import { inter } from '@/lib/font';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [isLarge, setIsLarge] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-semibold">Hello World</h1>
      <Link href={'/'}>Home</Link>
      <input type="text" />
      <button
        className={cn('py-3 border px-2', {
          'py-2 px-4 rounded-lg': isLarge,
        })}
      >
        <p className="flex text-black"></p>
      </button>
    </div>
  );
}
