// components/VariantsEditor.tsx
import * as React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Switch,
  IconButton,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Divider,
  Stack,
} from "@mui/material";
// IMPORTANT: use Grid2 if you want the `size` prop like size={{ xs: 12, md: 3 }}
import Grid from "@mui/material/Grid";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import type { ProductVariant, ProductVariantDTO } from "../types/Product";

/**
 * A single source of truth, stateless VariantsEditor.
 * - Renders from `value` only
 * - Emits changes via `onChange(next)`
 * - No internal mirrors, no "commit", no "rows"
 */

// Allow both the DTO (no id/productId/sku) and the persisted entity
type VariantRow = ProductVariantDTO | ProductVariant;
type EditableKeys = keyof ProductVariantDTO; // fields we actually edit in the UI

type Props = {
  value: VariantRow[];
  onChange: (next: VariantRow[]) => void;
  // Optional UX niceties:
  title?: string;
  allowEmpty?: boolean; // if false, delete is disabled when length === 1
};

// A convenient starter for new rows
const EMPTY_VARIANT: ProductVariantDTO = {
  name: "",
  packSizeGrams: 0,
  price: 0,
  currency: "EUR",
  taxClass: "REDUCED",
  active: true,
};

// Safe number parser for text/number inputs
const toNumber = (v: string) => (v.trim() === "" ? 0 : Number(v));

export default function VariantsEditor({
  value,
  onChange,
  title = "Varianten",
  allowEmpty = false,
}: Props) {
  // --- Immutable helpers that produce the next array and call onChange ---

  // Normalize incoming value to an array to avoid runtime errors if parent passes an unexpected shape
  const rows: VariantRow[] = Array.isArray(value) ? value : [];

  const addVariant = React.useCallback(() => {
    onChange([...(rows ?? []), { ...EMPTY_VARIANT }]);
  }, [onChange, rows]);

  const removeVariant = React.useCallback(
    (idx: number) => {
      const next = rows.filter((_, i) => i !== idx);
      onChange(next);
    },
    [onChange, rows]
  );

  const updateVariant = React.useCallback(
    <K extends EditableKeys>(idx: number, key: K, nextValue: ProductVariantDTO[K]) => {
      const next = rows.map((row, i) => (i === idx ? { ...(row as VariantRow), [key]: nextValue } : row));
      onChange(next);
    },
    [onChange, rows]
  );

  // --- UI ---

  const hasRows = rows.length > 0;

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Button startIcon={<AddIcon />} size="small" onClick={addVariant}>
          Variante hinzufügen
        </Button>
      </Stack>

      {!hasRows ? (
        // Empty state (no internals—parent owns the array)
        <Box
          sx={{
            p: 2,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            Noch keine Varianten angelegt.
          </Typography>
          <Button startIcon={<AddIcon />} onClick={addVariant}>
            Erste Variante hinzufügen
          </Button>
        </Box>
      ) : (
        rows.map((row, idx) => {
          const canDelete = allowEmpty ? true : rows.length > 1;

          return (
            <Box
              key={idx}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                {/* Name */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Variantenname"
                    placeholder='z. B. "100 g"'
                    fullWidth
                    value={row.name}
                    onChange={(e) => updateVariant(idx, "name", e.target.value)}
                    required
                  />
                </Grid>

                {/* Pack size (g) */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Packungsgröße (g)"
                    type="number"
                    fullWidth
                    inputProps={{ min: 1 }}
                    value={row.packSizeGrams}
                    onChange={(e) => updateVariant(idx, "packSizeGrams", toNumber(e.target.value))}
                    required
                  />
                </Grid>

                {/* Price */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Preis"
                    type="number"
                    fullWidth
                    inputProps={{ step: "0.01", min: 0 }}
                    value={row.price}
                    onChange={(e) => updateVariant(idx, "price", toNumber(e.target.value))}
                    required
                    helperText="Bruttopreis (z. B. 7.50)"
                  />
                </Grid>

                {/* Currency */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`currency-${idx}`}>Währung</InputLabel>
                    <Select
                      labelId={`currency-${idx}`}
                      label="Währung"
                      value={row.currency}
                      onChange={(e) =>
                        updateVariant(idx, "currency", e.target.value as ProductVariantDTO["currency"])
                      }
                    >
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                    </Select>
                    <FormHelperText>Standard: EUR</FormHelperText>
                  </FormControl>
                </Grid>

                {/* Tax class */}
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`tax-${idx}`}>Steuerklasse</InputLabel>
                    <Select
                      labelId={`tax-${idx}`}
                      label="Steuerklasse"
                      value={row.taxClass}
                      onChange={(e) =>
                        updateVariant(
                          idx,
                          "taxClass",
                          e.target.value as ProductVariantDTO["taxClass"]
                        )
                      }
                    >
                      <MenuItem value="REDUCED">Ermäßigt</MenuItem>
                      <MenuItem value="STANDARD">Standard</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Active toggle */}
                <Grid size={{ xs: 12, md: 3 }} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Switch
                    checked={row.active}
                    onChange={(e) => updateVariant(idx, "active", e.target.checked)}
                  />
                  <Typography variant="body2">Aktiv</Typography>
                </Grid>

                {/* Remove */}
                <Grid size={{ xs: 12, md: "auto" }}>
                  <IconButton
                    aria-label="Variante entfernen"
                    onClick={() => removeVariant(idx)}
                    disabled={!canDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {/* Optional visual separator if you later show computed info */}
              <Divider sx={{ mt: 2 }} />
            </Box>
          );
        })
      )}
    </Box>
  );
}
