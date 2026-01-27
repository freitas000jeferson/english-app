'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

function getPageTitle(pathname: string): string {
  const map: Record<string, string> = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/vocabulary': 'Vocabulary',
    '/exercices': 'Exercices',
    '/resources': 'Resources',
    '/settings': 'Settings'
  };
  if (map[pathname]) {
    return map[pathname];
  }

  // match rotas dinâmicas
  for (const route in map) {
    if (route.includes('[id]')) {
      const regex = new RegExp('^' + route.replace('[id]', '[^/]+') + '$');

      if (regex.test(pathname)) {
        return map[route];
      }
    }
  }

  return 'Page';
}

export function AppHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
