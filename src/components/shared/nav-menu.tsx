'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';
import { SideBarMenuItems } from './app-sidebar';

export function NavMain() {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{SideBarMenuItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								className={
									pathname === item.url
										? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear'
										: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/90 active:text-accent-foreground min-w-8 duration-200 ease-linear'
								}
								asChild={true}
								tooltip={item.title}
							>
								<Link href={item.url}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
