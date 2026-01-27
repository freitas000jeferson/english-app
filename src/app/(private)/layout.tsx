import { AppFooter } from '@/components/shared/app-footer';
import { AppHeader } from '@/components/shared/app-header';
import { AppSidebar } from '@/components/shared/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';

export default function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)'
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="">
          <AppHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
