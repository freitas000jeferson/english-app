import {
  Home,
  Book,
  Dumbbell,
  Settings,
  Database,
  Blocks,
  BrainCircuit
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { NavMain } from './nav-menu';

export const SideBarMenuItems = [
  {
    icon: Home,
    title: 'Home',
    url: '/'
  },
  {
    icon: Blocks,
    title: 'Dashboard',
    url: '/dashboard'
  },
  {
    icon: Book,
    title: 'Vocabulary',
    url: '/vocabulary'
  },
  {
    icon: Dumbbell,
    title: 'Exercices',
    url: '/exercices'
  },
  {
    icon: Database,
    title: 'Resources',
    url: '/resources'
  },
  {
    icon: Settings,
    title: 'Settings',
    url: '/settings'
  }
];
const user = {
  name: 'patman',
  email: 'freitas000jeferson@gmail.com',
  avatar: '/avatar.png'
} as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <BrainCircuit className="!size-5" />
                <span className="text-base font-semibold">My <span className='bg-primary text-primary-foreground'> English</span> App.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}