import { Resend } from 'resend';
import type { Route } from './+types/welcome-user';
import { render } from '@react-email/components';
import WelcomeUser from 'react-email-starter/emails/welcome-user';
const client = new Resend(process.env.RESEND_API_KEY!);

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { username } = params;
  //   const emailHtml = await render(WelcomeUser({ userFirstname: username }));
  const { data, error } = await client.emails.send({
    from: 'Jinwook <jw@mail.jw-song.info>',
    to: ['wlsdnr129@naver.com'],
    subject: 'Welcoe to Wemake',
    react: WelcomeUser({ userFirstname: username }),
    // html: emailHtml,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data });
};
