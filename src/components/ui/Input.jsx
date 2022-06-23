import React from "react";
import { TextField } from "@mui/material";

const Input = ({id, label, required, value, error, onChange, variant, text}) => {
    return (
        <TextField
            id={id}
            label={label}
            variant={variant}
            value={value}
            error={error}
            required={required}
            onChange={onChange}
            helperText={text}
        />
    )
}
