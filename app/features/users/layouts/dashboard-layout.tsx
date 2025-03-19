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
import { HomeIcon, RocketIcon, SparklesIcon } from 'lucide-react';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId, getProductsByUserId } from '../queries';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const profileId = await getCurrentUserId(client);
  const products = await getProductsByUserId(client, {
    profileId,
  });

  return { products };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { products } = loaderData;
  return (
    <SidebarProvider className='h-full overflow-scroll'>
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
              {products.map((product) => (
                <SidebarMenuItem key={product.product_id}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname ===
                      `/my/dashboard/products/${product.product_id}`
                    }
                  >
                    <Link to={`/my/dashboard/products/${product.product_id}`}>
                      <RocketIcon className='size-4' />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='grow'>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
