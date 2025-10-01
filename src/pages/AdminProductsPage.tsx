import { useEffect, useState } from "react";
import api from "../services/config.services";
import { Link as RouterLink } from 'react-router';
import Button from '@mui/material/Button';
import PageShell from "../components/layout/PageShell";


function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);

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

  return (
    <PageShell>
      {/* {
        allProducts.map(eachProduct => {
          
        })
      } */}
      <Button
        variant="contained"
        component={RouterLink}
        to={`/admin/products/create`}
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