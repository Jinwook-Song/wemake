import { redirect } from 'react-router';

export const loader = () => {
  return redirect(`/my/dashboard`);
};
