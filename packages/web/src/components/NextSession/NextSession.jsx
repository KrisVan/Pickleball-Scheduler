import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import {
  Button, Divider, Paper, Typography,
} from '@mui/material';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import differenceInMilliseconds from 'date-fns/differenceInDays';
import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import useUser from '../../hooks/useUser';
import UsersWithinInterval from '../UsersWithinInterval/UsersWithinInterval';

export default function NextSession() {
  const [SessionsResponse, SessionsError, SessionsLoading, SessionsAxiosFetch] = useAxiosFunction();

  const [events, setEvents] = useState([]);
  const [nextSession, setNextSession] = useState([]);
  const [nextSessionStartTime, setNextSessionStartTime] = useState('');
  const [timeUntilNextSession, setTimeUntilNextSession] = useState('');
  const effectRan = useRef(false);

  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { user } = useUser();

  // Fetch sessions
  const getSessions = () => {
    SessionsAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: 'api/sessions',
    });
  };

  // Sort sessions by closest date
  const findClosestSession = (sessionList) => {
    const currentDate = new Date();
    // Get future sessions
    const futureSessions = sessionList.filter(
      (session) => isAfter(session?.startTime, currentDate),
    );

    if (futureSessions.length === 0) {
      return null;
    }

    futureSessions.sort(
      (a, b) =>
        differenceInMilliseconds(a?.startTime, currentDate) - 
        differenceInMilliseconds(b?.startTime, currentDate)
    );

    return futureSessions[0];
  };

  // Calculate how long until a given time occurs
  const getTimeUntilNextSession = (session) => formatDistanceToNowStrict(session?.startTime);

  // Get sessions on mount
  useEffect(() => {
    if (effectRan.current === false) {
      getSessions();
    }
    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line
	},[]);

  // Set sessions after mount
  useEffect(() => {
    if (SessionsResponse?.length !== 0) {
      // Convert times to date objects
      const SessionsDateObj = SessionsResponse.map((obj) => ({
        ...obj,
        startTime: parseISO(obj.startTime),
        endTime: parseISO(obj.endTime),
      }));
      const UserSessionsDateObj = SessionsDateObj.filter((obj) => obj.username === user.username);
      // Get closest date
      const closestNextSession = findClosestSession(UserSessionsDateObj);
      setNextSession(closestNextSession);
      let timeString = '';
      if (closestNextSession) {
        timeString = getTimeUntilNextSession(closestNextSession);
        setNextSessionStartTime(format(closestNextSession?.startTime, "h:mmaa  'on' MMMM d, yyyy"));
      }

      setTimeUntilNextSession(timeString);
      setEvents(SessionsDateObj);
    }
  }, [SessionsResponse, user.username]);

  return (
    <>
      {SessionsLoading
        && (
        <Skeleton
          sx={{
            height: 280,
          }}
        />
        )}
      {!SessionsLoading && SessionsResponse.length !== 0 && timeUntilNextSession
        && (
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography component="h2" variant="h6" gutterBottom>
            Your next session is in...
          </Typography>
          <Typography variant="h3" gutterBottom>
            {timeUntilNextSession}
          </Typography>
          <Typography variant="h5">
            at
            {' '}
            {nextSessionStartTime}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <UsersWithinInterval
            currentEvent={nextSession}
            events={events}
          />
        </Paper>
        )}
      {!SessionsLoading && !timeUntilNextSession
        && (
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography component="h2" variant="h6" gutterBottom>
            No Sessions Scheduled
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={`/${'scheduler'}`}
            key="scheduler"
            sx={{ my: 4, mx: 2, py: 1 }}
          >
            Schedule one now
          </Button>
        </Paper>
        )}
      {/* Refresh token errors */}
      {!SessionsLoading && SessionsError.includes('500')
        && <Navigate to="/login" replace state={{ from: location }} />}

    </>
  );
}
