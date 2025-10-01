import { useEffect, useState } from "react";
import type { Product, ProductVariant } from "../types/Product";
import api from "../services/config.services";
import PageShell from "../components/layout/PageShell";
import { useParams } from "react-router";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


interface ProductDetailsProps {
  productId: string
}

function ProductDetails() {
  const { slug } = useParams();
  // console.log("slug: ", slug)
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isVariantSelected, setIsVariantSelected] = useState(false);

  useEffect(() => {
    getProduct()
    // setSelectedVariant(product.variants[0])
  }, [])

  const getProduct = async () => {
    try {
      const response = await api.get(`/shop/products/${slug}`)
      console.log("Product details: ", response.data)
      setProduct(response.data)
      setSelectedVariant(response.data.variants[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVariantSelection = (variant: ProductVariant) => {
    setSelectedVariant(variant)
  }

  const calculateKiloPriceForVariant = (variant: ProductVariant): number => {
    const timesVariantInKilo = 1000 / variant.packSizeGrams
    return variant.price * timesVariantInKilo
  }

  return (
    <>
      <PageShell>
        <div className="all-content flex flex-col items-center ">
          <div className="product-info flex gap-[50px]" >
            <div className="image">
              <img src={product?.images[0].url} alt={product?.images[0].alt} />
            </div>

            <div className="right-panel flex flex-col">
              <Typography variant="h5" color="gray.main" sx={{ fontWeight: 'bold' }} className="">{product?.name}</Typography>
              <Typography variant="h6" color="gray.main" className="italic">{product?.latinName}</Typography>
              <Typography variant="h5" color="gray.main" sx={{ mt: '10px', fontWeight: 'bold' }} className="">{selectedVariant?.price} €</Typography>
              <Typography variant="h5" color="gray.light" sx={{ fontSize: '0.7rem' }} className="">{selectedVariant ? `${calculateKiloPriceForVariant(selectedVariant).toFixed(2)} €` : "j"} / 1 kg </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ my: '10px', textAlign: 'justify' }} className="">{product?.descriptionMd}</Typography>


              <Typography variant="body1" color="gray.main" sx={{ my: '10px' }} className="">Packungsgröße: {selectedVariant?.packSizeGrams}g</Typography>
              <div className="variants flex gap-3 mb-[20px]">
                {product?.variants.map(eachVariant => (
                  <div key={eachVariant.id}
                    className={`cursor-pointer border py-3 border-gray-300 rounded p-1 ${selectedVariant === eachVariant ? `bg-lime-900/30` : `bg-none`}`}
                    onClick={() => handleVariantSelection(eachVariant)}>
                    <p className="text-xl ">{eachVariant.price} €</p>
                    <p className="text-[0.7rem] text-gray-500">Inhalt: {eachVariant.packSizeGrams} g</p>
                  </div>
                ))
                }
              </div>
              <div className="menge-warenkorbButton flex  gap-[10px] justify-between">
                {/* <input type="text" placeholder="Menge" className="border rounded w-[100px] text-center" /> */}
                <TextField type="text" placeholder="Menge" sx={{ width: '100px' }}></TextField>
                <Button variant="contained" className="flex-1">In den Warenkorb</Button>
              </div>
              {/* <button className="h-[2rem] bg-[#eafcea] rounded"> In den Warenkorb</button> */}

            </div>
          </div>
        </div>
      </PageShell>
    </>
  )
}
export default ProductDetails