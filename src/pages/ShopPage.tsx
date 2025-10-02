import { useEffect, useState } from "react";
import api from "../services/config.services";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import PageShell from "../components/layout/PageShell";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await api.get("/shop/products")
      // console.log("All products data: ", response.data)
      setAllProducts(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <PageShell>
        <Box sx={{ display: "flex", flexDirection: 'column', gap: '25px' }}>
          {/* Filter and search box */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderRadius: '5px', p: '10px', }}>

            {/* Category select (dropdown) */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth >
                <InputLabel id="category-select">Kategorie</InputLabel>
                <Select
                  labelId="category-select"
                  id="category-select"
                  // value={age}
                  label="Kategorie"
                // onChange={handleChange}
                >
                  <MenuItem value={"HERBS"}>Kräuter</MenuItem>
                  <MenuItem value={"SPICES"}>Gewürze</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Products  gallery container */}
          <Box sx={{display:'flex',  flexWrap:'wrap', gap:'40px'}} >
            {allProducts.length >= 0 &&
              allProducts.map(eachProduct => (
                <ProductCard key={eachProduct.id} product={eachProduct} />
              ))
            }
          </Box>
        </Box>
      </PageShell>
    </>
  )
}
export default ShopPage