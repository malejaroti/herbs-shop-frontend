import { Box, Container, Paper } from '@mui/material';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ margin:{xs:'0px'},
      minHeight: '100dvh', minWidth: '100dhp', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container >
        <Paper sx={{ position:'relative', p: 4, borderRadius: 3 }}>
          {children}
        </Paper>
      </Container>
    </Box>
    // <Box sx={{ p: 1, borderRadius: 3 , minHeight: '100dvh', minWidth: '100dhp', display: 'flex', alignItems: 'center', border:1, bgcolor: 'background.default' }}>
    //   {/* <Container >
    //     <Paper sx={{ p: 4, borderRadius: 3 }}> */}
    //       {children}
    //     {/* </Paper>
    //   </Container> */}
    // </Box>
  );
}
