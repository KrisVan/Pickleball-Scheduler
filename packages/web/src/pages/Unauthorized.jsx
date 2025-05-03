import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <h2>Unauthorized</h2>
      <b>You do not have access to view the requested page.</b>
      <Button
        onClick={goBack}
        variant="contained"
        sx={{ my: 2, color: 'inherit', display: 'block' }}
      >
        Go Back
      </Button>
    </div>
  );
}
