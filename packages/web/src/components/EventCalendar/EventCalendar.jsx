import { useEffect, useRef, useState } from "react"
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"

import { Calendar, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import parseISO from "date-fns/parseISO"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "./EventCalendarDark.css"

import EventInfo from "../EventInfo/EventInfo"
import AddEventModal from "../AddEventModal/AddEventModal"
import EditEventModal from "../EditEventModal/EditEventModal";
import EventInfoModal from "../EventInfoModal/EventInfoModal"

import useUser from "../../hooks/useUser";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAxiosFunction from '../../hooks/useAxiosFunction';

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function EventCalendar() {
  const [openSlot, setOpenSlot] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState([]);


  const { user } = useUser();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const effectRan = useRef(false);
  const [SessionsResponse, SessionsError, SessionsLoading, SessionsAxiosFetch] = useAxiosFunction();
  const [, SessionCreateError, SessionCreateLoading, SessionCreateAxiosFetch] = useAxiosFunction();
  const [, SessionUpdateError, SessionUpdateLoading, SessionUpdateAxiosFetch] = useAxiosFunction();
  const [, SessionDeleteError, SessionDeleteLoading, SessionDeleteAxiosFetch] = useAxiosFunction();
  
  const currentFormattedDate = format(new Date(), "MMMM d, yyyy");

  // Fetch sessions
  const getSessions = () => {
		SessionsAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'GET',
			url: 'api/sessions',
		});
	}

	// Get sessions on mount
	useEffect (() => {
		if (effectRan.current === false) {
			getSessions();
		}
		return () => {
			effectRan.current = true;
		}
		// eslint-disable-next-line
	},[]);

  // Set sessions after mount
	useEffect (() => {
		if (SessionsResponse?.length !== 0) {
      // Convert times to date objects
      const SessionsDateObj = SessionsResponse.map(obj => ({
        ...obj,
        startTime: parseISO(obj.startTime),
        endTime: parseISO(obj.endTime),
      }));
			setEvents(SessionsDateObj);
		}
	},[SessionsResponse]);

  // Event and modal handlers
  const handleSelectSlot = (event) => {
    setOpenSlot(true)
    setCurrentEvent(event)
  }

  const handleSelectEvent = (eventInfo) => {
    setCurrentEvent(eventInfo)
    setEventInfoModal(true)
  }

  const handleEditSlot = (event) => {
    setEventInfoModal(false)
    setOpenEditModal(true);
  }

  const handleEditSlotClose = (event) => {
    setOpenEditModal(false)
  }

  const handleClose = () => {
    setOpenSlot(false)
  }


  // Create event
  const onAddEvent = (e) => {
    e.preventDefault()
    const data = {
      id: crypto.randomUUID(),
      username: user?.username,
      startTime: currentEvent?.start,
      endTime: currentEvent?.end,
    }
    const newEvents = [...events, data]
    setEvents(newEvents)
    handleClose()
    SessionCreateAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `api/users/${user.username}/sessions`,
      requestConfig: data,
    });
  }

  // Edit event
  const onEditEvent = (e) => {
    e.preventDefault()
    const data = {
      id: currentEvent.id,
      username: currentEvent?.username,
      startTime: currentEvent?.startTime,
      endTime: currentEvent?.endTime,
    }
    // Close info and open editor
    handleEditSlotClose()
    SessionUpdateAxiosFetch({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `api/sessions/${currentEvent?.id}`,
      requestConfig: data,
    });
    const newEvents = events.map((event) => (event.id === data.id ? data : event))
    setEvents(newEvents)

  }

  const onDeleteEvent = () => {
    SessionDeleteAxiosFetch({
			axiosInstance: axiosPrivate,
			method: 'DELETE',
			url: `api/sessions/${currentEvent.id}`,
		});
    setEvents(() => [...events].filter((e) => e.id !== currentEvent.id))
    setEventInfoModal(false)
  }
  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Calendar" subheader={currentFormattedDate} />
          <Divider />
          <CardContent>
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
              onAddEvent={onAddEvent}
            />
            <EditEventModal
              open={openEditModal}
              handleClose={handleEditSlotClose}
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
              onEditEvent={onEditEvent}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              handleEditSlot={handleEditSlot}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent}
              events={events}
            />
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="startTime"
              components={{ event: EventInfo }}
              endAccessor="endTime"
              defaultView="week"
              eventPropGetter={(event) => {
                const isUserEvent = user?.username === event.username;
                return {
                  style: {
                    backgroundColor: isUserEvent ? user?.color : "#4e4d59",
                    borderColor: "#ffffff",
                  },
                }
              }}
              style={{
                height: 1100,
              }}
            />
          </CardContent>
        </Card>
      </Container>
      {/* Refresh token errors */}
      {!SessionsLoading && SessionsError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
      {!SessionCreateLoading && SessionCreateError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
      {!SessionUpdateLoading && SessionUpdateError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
      {!SessionDeleteLoading && SessionDeleteError.includes("500") &&
        <Navigate to="/login" replace state={{ from: location }} />}
    </Box>
  );
}
