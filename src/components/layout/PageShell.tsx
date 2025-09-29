import { Box, Container, Paper } from '@mui/material';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
