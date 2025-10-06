import { useEffect, useState, type ReactEventHandler } from "react";
import api from "../services/config.services";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import PageShell from "../components/layout/PageShell";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchedValue, setSearchedValue] = useState("");

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
  const filteredProducts = allProducts
    .filter((product) => (searchedValue ? product.name.toLowerCase().includes(searchedValue.toLowerCase()) : true))

  return (
    <>
      <PageShell>
        <Box sx={{ display: "flex", flexDirection: 'column', gap: '25px' }}>
          
          {/* Filter and search box */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderRadius: '5px', p: '10px', }}>
            <Box sx={{ minWidth: 120}}>
              <FormControl fullWidth >
                {/* <InputLabel id="search-input">Produkt suchen</InputLabel> */}
                <TextField
                  id="search-input"
                  label="Produkt suchen"
                  value={searchedValue}
                  size="small"
                  onChange={(e) => setSearchedValue(e.target.value)}
                >
                </TextField>
              </FormControl>
            </Box>
          </Box>

          {/* Products  gallery container */}
          {/* //TODO: Adjust minHeight  */}
          <Box sx={{minHeight:'500px',display:'flex', flexWrap:'wrap', justifyContent:'center', margin:'auto', gap:'40px', padding:'20px', borderRadius: 3, border:'1px solid #e1dfd7'}} >
            {filteredProducts.length >= 0 &&
              filteredProducts.map(eachProduct => (
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