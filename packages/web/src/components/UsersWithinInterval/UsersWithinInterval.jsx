import { useState, useEffect } from 'react';

import { Box, Avatar, Typography } from "@mui/material";

import { format, isWithinInterval } from 'date-fns';

export default function EventsWithinInterval({currentEvent, events}) {
  const [eventsWithinInterval, setEventsWithinInterval] = useState([]);

  useEffect(() => {
    const currentEventStart = currentEvent?.startTime;
    const currentEventEnd = currentEvent?.endTime;
    const uniqueEvents = [];
    const uniqueUsernames = new Set();

    events.forEach(event => {
      const eventStart = event.startTime;
      const eventEnd = event.endTime;
      
      if (
        (isWithinInterval(eventStart, { start: currentEventStart, end: currentEventEnd }) ||
        isWithinInterval(eventEnd, { start: currentEventStart, end: currentEventEnd })) &&
        !uniqueUsernames.has(event.username)
      ) {
        uniqueUsernames.add(event.username);
        uniqueEvents.push(event);
      }
    });
    
    setEventsWithinInterval(uniqueEvents);
  }, [currentEvent, events]);

  return (
    <>
      {eventsWithinInterval.map((event, index) => (
        <Box
          key={index}
          display='flex'
          alignItems='center'
          flexWrap='wrap'
          minHeight={50}
          sx={{ px: 1 }}
        >
          <Avatar sx={{ color: 'inherit' }}>
            {event?.username && event?.username[0].toUpperCase()}
          </Avatar>
          <Box
            alignItems='left'
            sx={{ ml: 1.0, mr: 3}}
          >
            <Typography
              variant="body1"
              textAlign="left"
            >
              {event?.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="left"
            >
              {"@"+event?.username}
            </Typography>
            
          </Box>
          <Typography
            variant="body2"
            color="text.primary"
            textAlign="left"
            sx={{ml:'auto'}}
          >
            {format(event?.startTime,  "EE h':'mm '-' " )}
            {format(event?.endTime,  "EE h':'mm " )}
          </Typography>
        </Box>
      ))}
    </>
  );
}