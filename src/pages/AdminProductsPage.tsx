import { useEffect, useState } from "react";
import api from "../services/config.services";
import { Link as RouterLink } from 'react-router';
import Button from '@mui/material/Button';
import PageShell from "../components/layout/PageShell";
import { Typography } from "@mui/material";
import { type Product } from "../types/Product";
import MuiDataGrid from "../components/MuiDataGrid";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';



function AdminProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await api.get("/admin/products")
      console.log("All products: ", response.data)
      setAllProducts(response.data)

    } catch (error) {
      console.log(error)
    }
  }
  const addProductVariant = async (productId: string) => {
    const newVariant = {
      "name": "100g",
      "packSizeGrams": 100,
      "price": 7.50
    }
    try {
      const response = await api.post(`/products/:${productId}/variants`, newVariant)
      console.log("New variant added: ", response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleClickAddProduct = () => {

  }

  type ProductRow = Omit<Product, 'variants' | 'images'>
  const columns: GridColDef<ProductRow>[] = [
    // { field: 'id', headerName: 'ID', width: 90},
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'latinName', headerName: 'Latin name', width: 100 },
    { field: 'bulkGrams', headerName: 'Lagerbestand (g)', type: 'number', width: 150 },
    { field: 'reorderAtGrams', headerName: 'Mindestbestand (g)', type: 'number', width: 120 },
    { field: 'originCountry', headerName: 'Herkunft', width: 110 },
    { field: 'organicCert', headerName: 'Bio', width: 50 },
    { field: 'slug', headerName: 'Slug', width: 90, editable: false },
    { field: 'active', headerName: 'Sichtbar im Shop', width: 90, editable: false },
  ];

  const rows = allProducts.map(({ descriptionMd, variants, images, categories, ...rest }) => rest);

  return (
    <PageShell>
      <Typography variant="h4"> Alle Produkte</Typography>
      {
        allProducts.map(eachProduct => (
          <Typography key={eachProduct.id}>{eachProduct.name}</Typography>
        ))
      }
      <MuiDataGrid columns={columns} rows={rows} />
      <Button
        variant="contained"
        component={RouterLink}
        to={`/admin/products/create`}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '10px'

        }}
      // onClick={handleClickAddProduct}
      > Produkt hinzufügen
      </Button>
      <Button
        variant="contained"
        component={RouterLink}
        to={`/admin/products/create`}
      // onClick={handleClickAddProduct}
      > Produkt bearbeiten
      </Button>
    </PageShell>
  )
}
export default AdminProducts