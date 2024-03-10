import { Typography } from "@mui/material"

export default function EventInfo({ event }) {
  return (
    <>
      <Typography sx={{color: 'text.secondary'}}>{event.username}</Typography>
    </>
  );
}
