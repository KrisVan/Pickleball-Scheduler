import useUser from '../hooks/useUser';
import Landing from './Landing';
import UserDashboard from './UserDashboard';

export default function Home() {
  const { user } = useUser();

  return (
    // If not logged in, show landing, else show dashboard
    user?.accessToken
      ? <UserDashboard />
      : <Landing />
  );
}
