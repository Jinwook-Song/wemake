import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/message-page';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Form } from 'react-router';
import { Textarea } from '~/common/components/ui/textarea';
import { Button } from '~/common/components/ui/button';
import { SendIcon } from 'lucide-react';
import { MessageBubble } from '../components/message-bubble';
import { browserClient, makeSSRClient, type Database } from '~/supa-client';
import {
  getCurrentUserId,
  getMessagesByMessageRoomId,
  getRoomsParticipant,
} from '../queries';
import { sendMessageToRoom } from '../mutations';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '~/hooks/use-auth';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message | wemake' },
    { name: 'description', content: 'View message details' },
  ];
};

// default: true
export const shouldRevalidate = () => false;
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const messageRoomId = params.messageRoomId;
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: parseInt(messageRoomId),
    userId,
  });

  const participant = await getRoomsParticipant(client, {
    messageRoomId: parseInt(messageRoomId),
    userId,
  });
  return { messages, participant };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const messageRoomId = params.messageRoomId;
  const formData = await request.formData();
  const message = formData.get('message');
  await sendMessageToRoom(client, {
    messageRoomId: parseInt(messageRoomId),
    content: message as string,
    senderId: userId,
  });
  return { ok: true };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { participant } = loaderData;
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, name, avatar } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const changes = browserClient
      .channel(`room:${userId}-${participant?.profile.profile_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Database['public']['Tables']['messages']['Row'],
          ]);
        },
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  return (
    <div className='h-full flex flex-col relative'>
      <Card className='absolute w-full top-0 bg-card/50 z-10 backdrop-blur'>
        <CardHeader className='flex flex-row gap-4 items-center bg-transparent'>
          <Avatar className='size-14'>
            <AvatarFallback>{participant?.profile?.name?.[0]}</AvatarFallback>
            <AvatarImage src={participant?.profile?.avatar ?? ''} />
          </Avatar>
          <div className='flex flex-col'>
            <CardTitle>{participant?.profile?.name}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='overflow-y-auto pt-10 flex flex-col gap-4 grow mt-20'>
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={
              message.sender_id === userId
                ? avatar ?? ''
                : participant.profile.avatar ?? ''
            }
            username={
              message.sender_id === userId
                ? name ?? ''
                : participant.profile.name
            }
            message={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card className='fixed w-[calc(100%-16rem)] bottom-0 left-0 right-0 ml-auto bg-transparent hover:bg-card/50 focus-within:bg-card/50'>
        <CardHeader>
          <Form
            ref={(node) => {
              formRef.current = node;
              if (actionData?.ok) formRef.current?.reset();
            }}
            method='post'
            className='relative flex justify-end items-center'
          >
            <Textarea
              required
              name='message'
              placeholder='Write a message...'
              rows={2}
              className='resize-none'
            />
            <Button type='submit' size={'icon'} className='absolute right-4'>
              <SendIcon size={12} />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
