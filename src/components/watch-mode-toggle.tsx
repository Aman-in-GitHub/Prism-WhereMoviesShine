import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useMedia } from '@/context/WatchContextProvider';
import { ArrowUpDown } from 'lucide-react';

export function WatchModeToggle() {
  const { media, setMedia } = useMedia();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="flex items-center gap-2">
          <span>{media == 'movie' ? 'Movies' : 'TV Shows'}</span>
          <span>
            <ArrowUpDown className="scale-[0.8]" />
          </span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setMedia('movie')}>
          Movies
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMedia('tv')}>
          TV Shows
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
