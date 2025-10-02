import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Product } from "../types/Product"
import { Link } from "react-router"



type ProductCardProps = {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <>
            <Card sx={{ width: 320, borderColor: 'gray.main' }}
            >
                <CardActionArea component={Link} to={`/${product.slug}`} sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        image={
                            product.images && product.images.length > 0
                                ? product.images[0]?.url
                                : undefined
                        }
                        alt="alt"
                        sx={{
                            maxHeight: 200,
                            // maxWidth:400,
                            objectFit: 'contain',
                            // backgroundColor: '#f5f5f5',
                            padding: '2px 10px'
                            }}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" color="gray.main"
                            sx={{
                                // fontSize:'1.3rem',
                                lineHeight: 1,
                                // fontWeight: 'bold',
                                // mb:'1rem'
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Typography
                            // variant="cardDescription"   
                            // variant="body1"   
                            sx={{
                                margin: '0.5rem auto',
                                fontSize: '0.7rem',
                                lineHeight: 1.3,
                                textAlign: 'justify'
                            }}
                        >
                            {product.descriptionMd}
                        </Typography>
                        <Typography color="gray.main" sx={{ fontSize: '1.3rem' }} >
                            ab <span style={{ fontWeight: 'bold' }}>{product.variants[0].price} €</span>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.5rem',
                                color: "#798490",
                                lineHeight: 0.5
                            }}
                        >
                            Für {product.variants[0].packSizeGrams}g
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}
export default ProductCard