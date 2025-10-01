// components/VariantsEditor.tsx
import { useState } from "react";
import {  Box, TextField, Select, MenuItem, Switch,
  IconButton, Typography, Button, FormControl, InputLabel
} from "@mui/material";
import Grid from "@mui/material/Grid"

import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import type { ProductVariantDTO } from "../types/Product";

type Props = {
  value: ProductVariantDTO[];
  onChange: (next: ProductVariantDTO[]) => void;
};

const emptyVariant: ProductVariantDTO = {
  name: "",
  packSizeGrams: 0,
  price: 0,              // euros (e.g., 7.5)
  currency: "EUR",
  taxClass: "REDUCED",
  active: true,
};

export default function VariantsEditor({ value, onChange }: Props) {
  const [local, setLocal] = useState<ProductVariantDTO[]>(value.length ? value : [emptyVariant]);

  const commit = (next: ProductVariantDTO[]) => {
    setLocal(next);
    onChange(next);
  };

  const addRow = () => commit([...local, { ...emptyVariant }]);
  const removeRow = (idx: number) => commit(local.filter((_, i) => i !== idx));

  const updateField = <K extends keyof ProductVariantDTO>(idx: number, key: K, v: ProductVariantDTO[K]) => {
    const next = [...local];
    next[idx] = { ...next[idx], [key]: v };
    commit(next);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
        <Typography variant="h6">Varianten</Typography>
        <Button startIcon={<AddIcon />} size="small" onClick={addRow}>
          Variante hinzufügen
        </Button>
      </Box>

      {local.map((row, idx) => (
        <Box key={idx} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Variantenname"
                placeholder='z. B. "100 g"'
                fullWidth
                value={row.name}
                onChange={(e) => updateField(idx, "name", e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Packungsgröße (g)"
                type="number"
                fullWidth
                inputProps={{ min: 1 }}
                value={row.packSizeGrams}
                onChange={(e) => updateField(idx, "packSizeGrams", Number(e.target.value))}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Preis (EUR)"
                type="number"
                fullWidth
                inputProps={{ step: "0.01", min: 0 }}
                value={row.price}
                onChange={(e) => updateField(idx, "price", Number(e.target.value))}
                required
                helperText="Bruttopreis, z. B. 7.50"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel id={`currency-${idx}`}>Währung</InputLabel>
                <Select
                  labelId={`currency-${idx}`}
                  label="Währung"
                  value={row.currency}
                  onChange={(e) => updateField(idx, "currency", e.target.value as ProductVariantDTO["currency"])}
                >
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel id={`tax-${idx}`}>Steuerklasse</InputLabel>
                <Select
                  labelId={`tax-${idx}`}
                  label="Steuerklasse"
                  value={row.taxClass}
                  onChange={(e) => updateField(idx, "taxClass", e.target.value as ProductVariantDTO["taxClass"])}
                >
                  <MenuItem value="REDUCED">Ermäßigt</MenuItem>
                  <MenuItem value="STANDARD">Standard</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Switch
                checked={row.active}
                onChange={(e) => updateField(idx, "active", e.target.checked)}
              />
              <Typography variant="body2">Aktiv</Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 'auto'}}>
              <IconButton aria-label="remove variant" onClick={() => removeRow(idx)} disabled={local.length === 1}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
