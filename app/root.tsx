import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from 'react-router';

import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import Navigation from './common/components/navigation';
import { Settings } from 'luxon';
import { cn } from './lib/utils';
import { makeSSRClient } from './supa-client';
import { getNotificationsCount, getUserById } from './features/users/queries';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = 'ko-KR';
  Settings.defaultZone = 'Asia/Seoul';
  return (
    <html lang='en' className='dark'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    const profile = await getUserById(client, { profileId: user.id });
    const notificationsCount = await getNotificationsCount(client, {
      userId: user.id,
    });
    return { user, profile, notificationsCount };
  }
  return { user: null, profile: null, notificationsCount: 0 };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isAuthenticating = pathname.startsWith('/auth');
  const { user, profile, notificationsCount } = loaderData;
  const isLoggedIn = !!user;

  return (
    <div
      className={cn({
        'px-5 sm:px-20 py-28': !isAuthenticating,
        'transition-opacity animate-pulse': isLoading,
      })}
    >
      {!isAuthenticating && (
        <Navigation
          isLoggedIn={isLoggedIn}
          hasNotifications={notificationsCount > 0}
          hasMessages={true}
          name={profile?.name}
          username={profile?.username}
          avatar={profile?.avatar}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          name: profile?.name,
          username: profile?.username,
          avatar: profile?.avatar,
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
