import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from '~/common/components/ui/sidebar';
import type { Route } from './+types/messages-layout';
import { Outlet, useOutletContext } from 'react-router';

import { MessageCard } from '../components/message-card';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId, getMessages } from '../queries';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const messages = await getMessages(client, { userId });
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { messages } = loaderData;
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] min-h-full overflow-hidden'>
      <Sidebar className='pt-16' variant={'floating'}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {messages.map((message) => (
                <MessageCard
                  key={message.message_room_id}
                  id={message.message_room_id}
                  avatarUrl={message.avatar}
                  username={message.name}
                  lastMessage={message.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='h-full flex-1 overflow-y-auto'>
        <Outlet context={{ userId }} />
      </div>
    </SidebarProvider>
  );
}
