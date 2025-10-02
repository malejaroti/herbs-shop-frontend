import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
  GridRowEditStopReasons,
  type GridSlotProps,
  Toolbar,
  ToolbarButton,
} from '@mui/x-data-grid';

import type { Product } from '../types/Product';
import api from '../services/config.services';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import DeleteModal from './DeleteModal';


declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.floor(Math.random() * 300)
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function FullFeaturedCrudGrid() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<GridRowsProp>([]);  // Start with empty rows
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<GridRowId | null>(null);


  useEffect(() => {
    getAllProducts()
  }, []);

  type ProductRow = Omit<Product, 'active'> & {
    active: string
  }
  const getAllProducts = async () => {
    try {
      const response = await api.get("/admin/products")
      // console.log("Response (all products): ", response.data)
      const allProducts: Product[] = response.data

      const processedData = allProducts.map(product => product.active ? "Y" : "N")
      // setRows(response.data.map(({ descriptionMd, variants, images, categories, ...rest }) => rest))
      setRows(
        allProducts.map((product) => ({
          id: product.id,
          name: product.name,
          latinName: product.latinName,
          slug: product.slug,
          descriptionMd: product.descriptionMd,
          active: product.active ? "✅" : "❌",
          bulkGrams: product.bulkGrams,
          reorderAtGrams: product.reorderAtGrams,
          organicCert: product.organicCert,
          originCountry: product.originCountry,
          // course_id: typeof product.course === "object" ? product.course._id : product.course,

        })))
      // setRows(processedData)

    } catch (error) {
      console.log(error)
    }
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    navigate(`/admin/products/${id}/update`)
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    openDeleteModal(id)
    // setRows(rows.filter((row) => row.id !== id));
  };

  const openDeleteModal = (id: any) => {
    setDeleteId(id);
    setOpenModal(true)
  };

  const handleDeleteProduct = async (id: GridRowId) => {
    try {
      await api.delete(`/admin/products/${id}`);
      await getAllProducts();
    } catch (error) {
      console.error(error);
      // setShowErrorAlert(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      await handleDeleteProduct(deleteId);
      setDeleteId(null);
      setOpenModal(false);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // type ProductRow = Omit<Product, 'variants' | 'images'>
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90},
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'latinName', headerName: 'Latin name', width: 100 },
    { field: 'descriptionMd', headerName: 'Beschreibung', width: 250 },
    { field: 'bulkGrams', headerName: 'Lager bestand (g)', type: 'number', width: 75 },
    { field: 'reorderAtGrams', headerName: 'Mindestbestand (g)', type: 'number', width: 75 },
    // { field: 'originCountry', headerName: 'Herkunft', width: 110 },
    // { field: 'organicCert', headerName: 'Bio', width: 50 },
    { field: 'slug', headerName: 'URL', width: 90, editable: false },
    { field: 'active', headerName: 'Sichtbar im Shop', width: 90, editable: false },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: 'primary.main',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          // getRowHeight={() => 'auto'} // 👈 makes rows auto-size to content
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          showToolbar
          sx={{
            '&& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '&& .MuiDataGrid-columnHeader': {
              backgroundColor: '#e7e7e7', // ensure each header cell gets it
              color: '#333',
              fontWeight: 700,
            },
            '&& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.2',
              // textAlign:'center'
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.4',
            },
          }}
        />
      </Box>
      <DeleteModal modalState={openModal} modalStateSetter={setOpenModal} handleDelete={handleConfirmDelete} modalMessage={"product"} />
    </>
  );
}
