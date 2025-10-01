import { FormContainer, FormHeader } from "./FormStyledComponents"
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
import Box from "@mui/material/Box"
import { useParams } from "react-router"
import { useState } from "react"
import type { Product, ProductCreateDTO, ProductVariantDTO } from "../types/Product"
import PageShell from "./layout/PageShell"
import VariantsEditor from "./VariantsEditor"

const newProduct: ProductCreateDTO = {
    name: "",
    slug: "",
    latinName: "",
    bulkGrams: 10000,
    reorderAtGrams: 500,
    descriptionMd: "",
    originCountry: "Deutschland",
    organicCert: "None",
    active: false,
    variants:  [],
    categories: "HERBS",
    images: []

}

const categories = ["Kräuter", "Gewürze"]

function ProductForm() {
    const {formType, product} = useParams()
    const [formData, setFormData] = useState<ProductCreateDTO | Product>(
        newProduct
    );
    // formType === "create" ? { ...newProduct } : { product}
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [errorMessageServer, setErrorMessageServer] = useState<string>("");
    const [helperTextTitleInput, setHelperTextTitleInput] = useState<string | null>(null);
    const [variants, setVariants] = useState<ProductVariantDTO[]>([]);

    const handleFormDataChange = ( event: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement > ) => {
        const { name, value } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSelectChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
        const { target: { value } } = event;
        setSelectedCategories(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChipDelete = (chipToDelete: string) => {
        setSelectedCategories((chips) =>
            chips.filter((chip) => chip !== chipToDelete)
        );
    };

    return (
        <PageShell>
        <FormHeader>
            <Typography gutterBottom variant="h4" component="div">
                {formType === 'create' ? '➕ Neues Produkt anlegen' : '✒️ Produkt bearbeiten'}
            </Typography>
        </FormHeader>
        <FormContainer>
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
                        {(categories ?? []).map((category) => <MenuItem key={category} value={category} > {category} </MenuItem> )}
                    </Select>
              </FormControl>

            </div>

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
                    aria-describedby="productDescription-helper-text"
                    // sx={responsiveStyles.formInput}
                    // value={formData.description}
                    // onChange={handleFormDataChange}
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
                    // onClick={props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    size="medium"
                    // sx={responsiveStyles.formInput}
                    // onClick={formType === "create" ? handleSubmit : handleTimelineUpdate}
                >
                    {formType === 'create' ? 'Produkt erstellen' : 'Änderungen speichern'}
                </Button>
            </Box>
        </FormContainer>
        </PageShell>
    )
}
export default ProductForm