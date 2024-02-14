import useUser from '../hooks/useUser';
import Landing from './Landing';

export default function Home() {
  const { user } = useUser();

  return(
    // If not logged in, show landing, else show dashboard
    user?.accessToken
      ? <b>Welcome {user.username}</b>
      : <Landing />
  )
}
