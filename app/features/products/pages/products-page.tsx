import { redirect } from 'react-router';

// redirect from server
export function loader() {
  return redirect('/products/leaderboards');
}
