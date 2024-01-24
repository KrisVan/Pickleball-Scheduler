import { Link as RouterLink} from 'react-router-dom'
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to="/about">
        PickLeTime
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}