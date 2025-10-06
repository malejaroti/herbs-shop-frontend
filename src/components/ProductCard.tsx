import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Link } from "react-router"
import { Product } from "../types/Product"



type ProductCardProps = {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <>
            <Card sx={{ width: 320, borderColor: 'gray.main', display: 'flex', flexDirection: 'column'  }}
            >
                <CardActionArea component={Link} to={`/${product.slug}`} 
                    sx={{ height: '100%', 
                            display:'flex', 
                            flexDirection:'column',
                            alignItems: 'stretch',
                            flexGrow: 1 
                        }}>
                    <CardMedia
                        component="img"
                        src={
                            product.images && product.images.length > 0
                                ? product.images[0]?.url
                                : undefined
                        }
                        alt="alt"
                        sx={{
                            height: '150px',
                            width: '150px',
                            mx:'auto',
                            // maxWidth:400,
                            // NO borderRadius; let the mask make the circle + fade
                            display: 'block',
                            maskImage: 'radial-gradient(circle, black 65%, transparent 69%)',
                            }}
                    >
                    </CardMedia>
                    <CardContent sx={{flexGrow: 1, display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                        <Box sx={{flex:1}}>
                            <Typography variant="h6" color="gray.main" sx={{ lineHeight: 1 }}>
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
                        </Box>
                        <Box>
                            <Typography color="gray.main" sx={{ fontSize: '1.3rem' }} >
                                ab <span style={{ fontWeight: 'bold' }}>{product.variants[0]?.price} €</span>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '0.7rem',
                                    color: "#798490",
                                    lineHeight: 0.5
                                }}
                            >
                                Für {product.variants[0]?.packSizeGrams}g
                            </Typography>
                        </Box>

                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}
export default ProductCard