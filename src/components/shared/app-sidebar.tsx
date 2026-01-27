import {  Home, Book, Dumbbell } from "lucide-react"
import Image from "next/image";
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ROUTES } from "@/constants/routes";

export const SideBarMenuItems = [
  {
    icon: Home,
    title: 'Dashboard',
    url: ROUTES.dashboard
  },
  {
    icon: Book,
    title: 'Vocabulary',
    url: ROUTES.vocabulary
  },
  {
    icon: Dumbbell,
    title: 'Exercices',
    url: ROUTES.exercices
  }
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
         <Image
            className="dark:invert"
            src="/logo.png"
            alt="Next.js logo"
            height={40}
            width={180}
            priority
          />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}