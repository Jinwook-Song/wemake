import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import type { Route } from './+types/dashboard-layout';
import { Link, Outlet, useLocation } from 'react-router';
import { HomeIcon, PackageIcon, RocketIcon, SparklesIcon } from 'lucide-react';

export default function DashboardLayout({}: Route.ComponentProps) {
  const location = useLocation();
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] min-h-full overflow-hidden'>
      <Sidebar className='pt-16' variant={'floating'}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/my/dashboard'}
                >
                  <Link to='/my/dashboard'>
                    <HomeIcon className='size-4' />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/my/dashboard/ideas'}
                >
                  <Link to='/my/dashboard/ideas'>
                    <SparklesIcon className='size-4' />
                    <span>Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Products Analytics</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/my/dashboard/products/1'}
                >
                  <Link to='/my/dashboard/products/1'>
                    <RocketIcon className='size-4' />
                    <span>Product 1</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='h-full flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
