'use client';

import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function getPageTitle(pathname: string): string {
	const map: Record<string, string> = {
		'/': 'Home',
		'/dashboard': 'Dashboard',
		'/vocabulary': 'Vocabulary',
		'/exercices': 'Exercices',
		'/resources': 'Resources',
		'/settings': 'Settings',
	};
	if (map[pathname]) {
		return map[pathname];
	}

	// match rotas dinâmicas
	for (const route in map) {
		if (route.includes('[id]')) {
			const regex = new RegExp(`^${route.replace('[id]', '[^/]+')}$`);

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
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<h1 className="text-base font-medium">{title}</h1>
				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}

function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		const enabled = stored === 'dark' || (!stored && prefersDark);
		document.documentElement.classList.toggle('dark', enabled);
		setIsDark(enabled);
	}, []);

	function toggleTheme() {
		const next = !isDark;
		document.documentElement.classList.toggle('dark', next);
		localStorage.setItem('theme', next ? 'dark' : 'light');
		setIsDark(next);
	}
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline" size="icon" onClick={toggleTheme}>
					{isDark ? <Sun /> : <Moon />}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Toogle Mode</p>
			</TooltipContent>
		</Tooltip>
	);
}
