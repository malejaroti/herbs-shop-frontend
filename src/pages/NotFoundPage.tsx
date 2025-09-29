import PageShell from '../components/layout/PageShell';
import { Box, Typography, Stack, Button } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router';

export function NotFoundPage() {
  return (
    <PageShell>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReportGmailerrorredIcon fontSize="large" />
          <Typography variant="h3" fontWeight={700}>404</Typography>
        </Box>

        <Typography variant="h5" fontWeight={600}>Página no encontrada</Typography>
        <Typography variant="body1" color="text.secondary">
          Lo sentimos, no pudimos encontrar lo que buscabas.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Volver al inicio
          </Button>
          <Button component={RouterLink} to="/contact" variant="outlined">
            Contactar soporte
          </Button>
        </Stack>
      </Stack>
    </PageShell>
  );
}
