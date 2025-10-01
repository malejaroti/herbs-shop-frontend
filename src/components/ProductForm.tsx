import { FormContainer, FormHeader } from "./styled/FormStyledComponents"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import FormHelperText from "@mui/material/FormHelperText"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box"
import Alert from '@mui/material/Alert';

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import type { Category, Product, ProductCreateDTO, ProductVariantDTO } from "../types/Product"
import PageShell from "./layout/PageShell"
import VariantsEditor from "./VariantsEditor"
import ImageUploader from "./ImageUploader"
import api from "../services/config.services"
import Spinner from "./Spinner"

const newProduct: ProductCreateDTO = {
    name: "",
    slug: "",
    latinName: "",
    bulkGrams: 10000,
    reorderAtGrams: 500,
    descriptionMd: "",
    originCountry: "Deutschland",
    organicCert: "Keine",
    active: false,
    variants:  [],
    categories: [],
    images: []

}

type ProductCategoriesGermanNames = "Kräuter" | "Gewürze";
const categoriesGermanNames: ProductCategoriesGermanNames[] = ["Kräuter", "Gewürze"]

// Record<K, T> is a TS utility type that creates an object type with keys of type K and values of type T.
const categoryMap: Record<ProductCategoriesGermanNames, Category> = {
  "Kräuter": "HERBS",
  "Gewürze": "SPICES",
};

// Use existing categoryMap to create reverse mapping
const reverseMap = Object.fromEntries(
    Object.entries(categoryMap).map(([german, english]) => [english, german])
) as Record<Category, ProductCategoriesGermanNames>;

type ProductFormProps = {
    formType : string
    productId? : string
}
function ProductForm({formType, productId}: ProductFormProps) {
    const [isFetching, setIsFetching] = useState(formType === "edit");
    // To avoid FormData state to initially be null, initialize first with "values"  for a new product while data from product loads, in case the form is used for editing
    const [formData, setFormData] = useState<ProductCreateDTO | Product >({ ...newProduct }); 
    const [selectedCategories, setSelectedCategories] = useState<ProductCategoriesGermanNames[]>([]);
    const [errorMessageServer, setErrorMessageServer] = useState("");
    const [helperTextTitleInput, setHelperTextTitleInput] = useState<string | null>(null);
    const [variants, setVariants] = useState<ProductVariantDTO[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false); // for a loading animation effect in the "Submit" button while image uploads to cloudinary and URL is generated
    const navigate = useNavigate()

    // Another option for FormData initialization. 
    // Initialiye formData with newProduct for create, or null for edit (until product loads)
    // const [formData, setFormData] = useState<ProductCreateDTO | Product >(
    //     formType === "create" ? { ...newProduct } : null
    // );

    useEffect(() => {
        if (formType === "edit" && productId) {
            getProductDetails();
        }
    }, [formType, productId]);

    const getProductDetails = async () => {
        setIsFetching(true)
        try {
            const response = await api.get(`/admin/products/${productId}`)
            setIsFetching(false)
            console.log("Product details: ", response.data);
            const productData = response.data;

            // Process the received data before setting it to formData
            const processedProductData = {
                ...productData,
                organicCert: productData.organicCert ?? "Keine", // Convert null to "Keine"
            };
            
            const categoriesInGerman = (productData.categories as Category[]).map(categoryInEnglish => {
                for (const germanCatName in categoryMap){
                    if(categoryMap[germanCatName as ProductCategoriesGermanNames]  === categoryInEnglish ){
                        return germanCatName
                    }
                } return undefined;
                }
            )

            // const germanCategories = productData.categories
            //     ?.map((cat: Category) => reverseMap[cat])
            //     .filter(Boolean) || [];

            // Set formData once product is loaded
            setFormData(productData);
            setSelectedCategories(categoriesInGerman as ProductCategoriesGermanNames[]);

        } catch (error) {
            console.log(error)
        }finally {
            setIsFetching(false);
        }
    };

    // Show loading state while product is being fetched for edit mode
    if (isFetching) {
        const message = "Fetching product details"
        return <Spinner message={message} loadingState={isFetching} />
    }

    const handleFormDataChange = ( event: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement > ) => {
        const { name, value } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isGermanCategory = (v: string): v is ProductCategoriesGermanNames =>
        (["Kräuter", "Gewürze"] as const).includes(v as ProductCategoriesGermanNames);

    const handleSelectChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
        // const { target: { value } } = event;
        const value = event.target.value;
        const selected = typeof value === 'string' ? value.split(',') : value;

        // keep only valid keys, then map
        const mappedCategories = selected
            .filter(isGermanCategory)               
            .map((cat) => categoryMap[cat]);

        console.log(mappedCategories)
        setSelectedCategories(selected.filter(isGermanCategory)); // for chips/UI

        setFormData((prev) => ({
            ...prev,
            categories: mappedCategories,
        }));
    };

    const handleChipDelete = (chipToDelete: string) => {
        setSelectedCategories((chips) =>
            chips.filter((chip) => chip !== chipToDelete)
        );
    };

    const handleFileUpload = async (file: File) => {
        console.log('The file to be uploaded is: ', file);
        setIsUploading(true); // to start the loading animation
        const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
        uploadData.append('image', file);
        console.log('The upload data to be passed to Backend is: ', uploadData);

        try {
            const response = await api.post('/admin/upload', uploadData);
            // backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
            console.log('Response from endpoint POST upload: ', response);
            setIsUploading(false); // to stop the loading animation
            // Return the image URL instead of updating state here
            return response.data.imageUrl;
        } catch (error) {
            setIsUploading(false);
            setErrorMessageServer(typeof error === "string" ? error : (error instanceof Error ? error.message : JSON.stringify(error)))
            // navigate('/error');
            // throw error; // Re-throw to handle in handleSubmit
        }
    };

     const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let uploadedImageUrl = null;

        // Wait for file upload to complete before creating the item
        if (file !== null) {
        try {
            uploadedImageUrl = await handleFileUpload(file);
        } catch (error) {
            console.error('Image upload failed:', error);
            setErrorMessageServer("The product will be created without an image")
            // set availability to false because a product without an image should not be shown in store ? 
            // return; // Stop submission if image upload fails
        }
        }

        // Build the images array including any newly uploaded image
        const finalImages = uploadedImageUrl
        ? [...formData.images, {"url":uploadedImageUrl, "alt":formData.name}]
        : formData.images;

        const newProduct = {
            ...formData,
            organicCert: formData.organicCert === "None" ? null : formData.organicCert,
            images: finalImages, // Use the final images array
        };
        console.log('New product to be created: ', newProduct);

        try {
            const response = await api.post( `/admin/products/`, newProduct );
            console.log('Res POST new product: ', response);
            if(response.status === 201){

                navigate(`/admin/products`)
            }
            // Call the success callbacks
            // props.onRefresh(); // Refresh the timeline items
            // props.onSuccess(); // Close the drawer
            
        } catch (error) {
            if (typeof error === "object" && error !== null && "response" in error) {
                // @ts-ignore
                console.log('Error in the creation of a new product: ', error.response?.data?.errors);
            } else {
                console.log('Error in the creation of a new product: ', error);
            }
            // navigate('/error');
        }
    };

    return (
    <PageShell>
        <IconButton
            // variant="outlined"
            type="button"
            onClick={()=> {navigate(`/admin/products`)}}
            sx={{
                marginTop:'-30px',
                marginLeft:'-50px',
                background:'white',
                // marginBottom:'5px'
                fontSize:'1rem'
            }}
        >
            <ArrowBack/>Zurück
        </IconButton>

        <FormHeader>
            <Typography gutterBottom variant="h4" component="div" sx={{margin:'auto'}}>
                {formType === 'create' ? '➕ Neues Produkt anlegen' : '✒️ Produkt bearbeiten'}
            </Typography>
        </FormHeader>
        <Box
            sx={{
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "30px"
            }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="flex gap-[50px]">
                <FormControl sx={{width:'70%'}} error={helperTextTitleInput !== null}>
                    <FormLabel htmlFor="name" required >
                        Name
                    </FormLabel>
                    <OutlinedInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Produktname"
                        autoFocus={formType === "create"}
                        autoComplete="off"
                        required
                        size="small"
                        // sx={responsiveStyles.formInput}
                        value={formData.name}
                        onChange={handleFormDataChange}
                        aria-describedby="productName-helper-text"
                    />
                    <FormHelperText id="productName-helper-text">
                        {helperTextTitleInput !== null ? helperTextTitleInput : "Der Produktname wird im Shop angezeigt. Bitte eindeutig und aussagekräftig wählen."}
                    </FormHelperText>
                </FormControl>

                <FormControl sx={{width:'30%'}}>
                    <FormLabel htmlFor="categorySelector" required >
                        Kategorie
                    </FormLabel>
                    <Select
                        labelId="categorySelector"
                        id="users-selector-multiple-chip"
                        multiple
                        value={selectedCategories}
                        onChange={handleSelectChange}
                        size="small" 
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                                onMouseDown={(e) => e.stopPropagation()} 
                            >
                            {selected.map((value) => (
                                <Chip key={value} label={value} onDelete={() => handleChipDelete(value)}   />
                            ))}
                            </Box>
                        )}
                    >
                        {(categoriesGermanNames ?? []).map((category) => <MenuItem key={category} value={category} > {category} </MenuItem> )}
                    </Select>
              </FormControl>

            </div>
            
            <ImageUploader onFileSelect={setFile} />
            {errorMessageServer !== ""
                ? <Alert severity="error"> Bild-Upload fehlgeschlagen. Error: {errorMessageServer} </Alert>
                : null
            }

            <FormControl fullWidth >
                <FormLabel htmlFor="description">
                    Beschreibung
                </FormLabel>
                <OutlinedInput
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Z. B. Schonend getrocknete Blüten, ideal für aromatische Aufgüsse..."
                    size="small" //makes the placeholder look closer to the top border of the input
                    multiline
                    rows={3}
                    value={formData.descriptionMd}
                    onChange={handleFormDataChange}
                    aria-describedby="productDescription-helper-text"
                    // sx={responsiveStyles.formInput}
                    />
                <FormHelperText id="productDescription-helper-text">
                    Kurze, prägnante Beschreibung (max. 3–4 Zeilen). Wird direkt unter dem Produktnamen im Shop angezeigt.
                </FormHelperText>
            </FormControl>

            <div className="flex gap-[50px] ">
                <FormControl fullWidth >
                    <FormLabel htmlFor="bulkGrams">
                        Gesamtmenge (g)
                    </FormLabel>
                    <OutlinedInput
                        id="bulkGrams"
                        name="bulkGrams"
                        type="number"
                        placeholder="g"
                        value={formData.bulkGrams}
                        onChange={handleFormDataChange}
                        size="small" //makes the placeholder look closer to the top border of the input
                        aria-describedby="bulkGrams-helper-text"
                        // sx={responsiveStyles.formInput}
                    />
                    <FormHelperText id="bulkGrams-helper-text">
                        Gesamtmenge in Gramm, wird für Lagerbestand verwendet.
                    </FormHelperText>
                </FormControl>
                <FormControl fullWidth >
                    <FormLabel htmlFor="reorderAtGrams">
                        Mindestbestand (g)
                    </FormLabel>
                    <OutlinedInput
                        id="reorderAtGrams"
                        name="reorderAtGrams"
                        type="number"
                        placeholder="g"
                        value={formData.reorderAtGrams}
                        onChange={handleFormDataChange}
                        size="small" //makes the placeholder look closer to the top border of the input
                        aria-describedby="reorderAtGrams-helper-text"
                        // sx={responsiveStyles.formInput}
                    />
                    <FormHelperText id="reorderAtGrams-helper-text">
                        Menge in Gramm, ab der der Bestand als niedrig gilt.
                    </FormHelperText>
                </FormControl>
            </div>
            
            <div className="flex gap-[50px] ">
                <FormControl fullWidth >
                    <FormLabel htmlFor="originCountry">
                        Herkunftland
                    </FormLabel>
                    <OutlinedInput
                        id="originCountry"
                        name="originCountry"
                        type="text"
                        // placeholder=""
                        value={formData.originCountry}
                        onChange={handleFormDataChange}
                        size="small" //makes the placeholder look closer to the top border of the input
                        aria-describedby="originCountry-helper-text"
                        // sx={responsiveStyles.formInput}
                    />
                    <FormHelperText id="originCountry-helper-text">
                        {/* Gesamtmenge in Gramm, wird für Lagerbestand verwendet. */}
                    </FormHelperText>
                </FormControl>
                <FormControl fullWidth >
                    <FormLabel htmlFor="organicCert">
                        Bio-Zertifizierung
                    </FormLabel>
                    <OutlinedInput
                        id="organicCert"
                        name="organicCert"
                        type="text"
                        // placeholder=""
                        value={formData.organicCert}
                        onChange={handleFormDataChange}
                        size="small" //makes the placeholder look closer to the top border of the input
                        aria-describedby="organicCert-helper-text"
                        // sx={responsiveStyles.formInput}
                    />
                    <FormHelperText id="organicCert-helper-text">
                        Falls vorhanden, bitte die Nummer eintragen (z. B. DE-ÖKO-001)
                    </FormHelperText>
                </FormControl>
            </div>
            <VariantsEditor value={variants} onChange={setVariants} />
            {/* {errorMessageServer !== ""
                ? <Alert severity="error"> {errorMessageServer} </Alert>
                : null
            } */}

            <Box
                // component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
                className=''
            >
                <Button
                    variant="outlined"
                    type="button"
                    size="medium"
                    // sx={responsiveStyles.formInput}
                    onClick={()=> {navigate(`/admin/products`)}}
                >
                    Abbrechen
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    size="medium"
                    // sx={responsiveStyles.formInput}
                    // onClick={formType === "create" ? handleSubmit : handleTimelineUpdate}
                    // onClick={handleSubmit}
                    loading={isUploading}
                >
                    {formType === 'create' ? 'Produkt erstellen' : 'Änderungen speichern'}
                </Button>
            </Box>
        </Box>
    </PageShell>
    )
}
export default ProductForm