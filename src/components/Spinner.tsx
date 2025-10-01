import { MoonLoader } from "react-spinners";
import PageShell from '../components/layout/PageShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type SpinnerProps = {
    message: string
    loadingState: boolean
}
function Spinner({message, loadingState}: SpinnerProps) {
  return (
    <PageShell>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center',
            maxWidth: '44rem',
            margin: '0 auto',
          }}
        >
          <MoonLoader
            color={'#79a4aa'}
            loading={loadingState}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <Typography variant='subtitle1'>
            {message}
          </Typography>
        </Box>
      </PageShell>
  )
}
export default Spinner