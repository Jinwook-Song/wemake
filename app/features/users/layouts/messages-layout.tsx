import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import type { Route } from './+types/messages-layout';
import { Outlet } from 'react-router';

import { MessageCard } from '../components/message-card';

export default function MessagesLayout({}: Route.ComponentProps) {
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] min-h-full overflow-hidden'>
      <Sidebar className='pt-16' variant={'floating'}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 30 }).map((_, index) => (
                <MessageCard
                  key={index}
                  id={index.toString()}
                  avatarUrl='https://github.com/jinwook-song.png'
                  username={`John Doe ${index}`}
                  lastMessage='Last message'
                />
              ))}
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
