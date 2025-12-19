'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={setLight}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={setDark}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={setSystem}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
