import { Github, } from 'lucide-react';

import {
  buttonVariants,
 
} from '@/components/ui';
import { cn } from '@/lib/utils';

export const Socials = () => (
  <div className='absolute right-2 top-24 lg:right-6 lg:top-0 lg:bottom-0 flex items-center z-30'>
    <div className='flex flex-col gap-4'>
      <a
        href='https://github.com/bidlomenetil'
        className={cn(
          buttonVariants({ size: 'icon' }),
          'bg-gradient-to-r from-gray-700 to-black text-white'
        )}
        rel='noreferrer'
        target='_blank'
      >
        <Github className='size-5' />
      </a>

   

      
    </div>
  </div>
);
