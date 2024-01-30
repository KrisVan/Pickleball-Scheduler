import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken';
import useUser from '../../hooks/useUser';
import SimpleBackdrop from '../SimpleBackDrop/SimpleBackdrop';

// Wrap around protected routes that require login
export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user, persist } = useUser();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      }
      catch (error) {
        console.error(error);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }
    // Only run verifyRefreshToken if no access token or persist true
    !user?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => isMounted = false;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
            ? <SimpleBackdrop />
            : <Outlet />
      }
    </>
  );
}
