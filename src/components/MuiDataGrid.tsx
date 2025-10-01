import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

type DataGridProps = {
    columns:any[],
    rows:any[]
}
export default function MuiDataGrid({columns, rows}: DataGridProps) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',  // light gray
                color: '#333',                // text color
                fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                lineHeight: '1.4',
            },
        }}
      />
    </Box>
  );
}
