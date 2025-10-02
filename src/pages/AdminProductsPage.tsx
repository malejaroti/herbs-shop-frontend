import { useEffect, useState } from "react";
import api from "../services/config.services";
import { Link as RouterLink } from 'react-router';
import Button from '@mui/material/Button';
import PageShell from "../components/layout/PageShell";
import { Typography } from "@mui/material";
import { Product } from "../types/Product";
import FullFeaturedCrudGrid from "../components/DataGridActions";

function AdminProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // getAllProducts()
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

  return (
    <PageShell>
      <Typography variant="h4"> Alle Produkte</Typography>
      {/* {
        allProducts.map(eachProduct => (
          <Typography key={eachProduct.id}>{eachProduct.name}</Typography>
        ))
      } */}
      {/* <MuiDataGrid columns={columns} rows={rows} /> */}
      <FullFeaturedCrudGrid/>
      <Button
        variant="contained"
        component={RouterLink}
        to={`/admin/products/create`}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '10px'

        }}
      > Produkt hinzufügen
      </Button>

    </PageShell>
  )
}
export default AdminProducts