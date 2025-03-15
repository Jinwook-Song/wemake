import { Link } from 'react-router';
import { Separator } from './ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

const menus = [
  {
    name: 'Products',
    to: '/products',
    items: [
      {
        name: 'Leaderboards',
        description: 'See the leaderboards',
        to: '/products/leaderboards',
      },
      {
        name: 'Categories',
        description: 'See the categories',
        to: '/products/categories',
      },
      {
        name: 'Search',
        description: 'Search for a product',
        to: '/products/search',
      },
      {
        name: 'Submit a Product',
        description: 'Submit a product to our community',
        to: '/products/submit',
      },
      {
        name: 'Promote',
        description: 'Promote your product to our community',
        to: '/products/promote',
      },
    ],
  },
  {
    name: 'Jobs',
    to: '/jobs',
    items: [
      {
        name: 'Remote Jobs',
        description: 'See the remote jobs',
        to: '/jobs?location=remote',
      },
      {
        name: 'Full-time Jobs',
        description: 'See the full-time jobs',
        to: '/jobs?type=full-time',
      },
      {
        name: 'Part-time Jobs',
        description: 'See the part-time jobs',
        to: '/jobs?type=part-time',
      },
      {
        name: 'Internships',
        description: 'See the internships',
        to: '/jobs?type=internship',
      },
      {
        name: 'Submit a Job',
        description: 'Submit a job to our community',
        to: '/jobs/submit',
      },
    ],
  },
  {
    name: 'Community',
    to: '/community',
    items: [
      {
        name: 'All Posts',
        description: 'See all posts in our community',
        to: '/community/',
      },
      {
        name: 'Top Posts',
        description: 'See the top posts in our community',
        to: '/community?sort=top',
      },
      {
        name: 'New Posts',
        description: 'See the new posts in our community',
        to: '/community?sort=new',
      },
      {
        name: 'Create a Post',
        description: 'Create a post in our community',
        to: '/community/create',
      },
    ],
  },
  {
    name: 'IdeasGPT',
    to: '/ideas',
  },
  {
    name: 'Teams',
    to: '/teams',
    items: [
      {
        name: 'All Teams',
        description: 'See the teams in our community',
        to: '/teams',
      },
      {
        name: 'Create a Team',
        description: 'Create a team in our community',
        to: '/teams/create',
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  name,
  username,
  avatar,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  name?: string;
  username?: string;
  avatar?: string | null;
}) {
  return (
    <nav className='flex px-5 sm:px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 ring-0 z-50 bg-background/50 w-full'>
      <div className='flex items-center'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          wemake
        </Link>
        <Separator orientation='vertical' className='h-6 mx-4' />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to} prefetch='intent'>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className='grid w-[600px] font-light gap-3 p-4 grid-cols-2'>
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn([
                              'select-none rounded-md transition-colors hover:bg-accent focus:bg-accent',
                              (item.to === '/products/promote' ||
                                item.to === '/jobs/submit') &&
                                'col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20',
                            ])}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className='p-3 space-y-1 block leading-none no-underline outline-none'
                                to={item.to}
                              >
                                <span className='text-sm font-medium leading-none'>
                                  {item.name}
                                </span>
                                <p className='text-sm leading-snug text-muted-foreground'>
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className='flex items-center gap-2'>
          <Button size={'icon'} variant={'ghost'} asChild className='relative'>
            <Link to='/my/notifications'>
              <BellIcon className='size-4' />
              {hasNotifications && (
                <div className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full' />
              )}
            </Link>
          </Button>
          <Button size={'icon'} variant={'ghost'} asChild className='relative'>
            <Link to='/my/messages'>
              <MessageCircleIcon className='size-4' />
              {hasMessages && (
                <div className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full' />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer'>
              <Avatar>
                {avatar ? (
                  <AvatarImage src={avatar} />
                ) : (
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel className='flex flex-col'>
                <span className='font-medium'>{name}</span>
                <span className='text-xs text-muted-foreground'>
                  @{username}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/dashboard'>
                    <BarChart3Icon className='size-4 mr-2' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/profile'>
                    <UserIcon className='size-4 mr-2' />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/settings'>
                    <SettingsIcon className='size-4 mr-2' />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to='/auth/logout'>
                  <LogOutIcon className='size-4 mr-2' />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <Button asChild variant='outline'>
            <Link to='/auth/login'>Login</Link>
          </Button>
          <Button asChild variant='default'>
            <Link to='/auth/join'>Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
