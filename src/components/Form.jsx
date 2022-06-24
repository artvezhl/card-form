import React, { useState, useMemo } from "react";
import { FormGroup, TextField, Grid, Button } from "@mui/material";
import {
  cardNumberFormatter,
  cardNumberValidator,
  amountFormatter,
  amountValidator,
  cvvFormatter,
  cvvValidator,
  dateValidator,
  expDateFormatter,
  isFormReady
} from "../helpers";
import { sendCardData } from "../api";
import { styled } from "@mui/material/styles";

const CustomForm = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const CustomButton = styled(Button)`
  transition: 1s ease-in;
  background-image: linear-gradient(
    90deg,
    #395492 0,
    #395492 50%,
    #3dd5a8 50%,
    #3dd5a8 100%
  );
  background-position-x: 100%;
  background-size: 200%;
  &:hover {
    color: white;
    background-position-x: 0;
  }
  &:disabled {
    background: aliceblue;
  }
`;

const Form = () => {
  const [formValues, setFormValues] = useState({
    CardNumber: "",
    ExpDate: "",
    Cvv: "",
    Amount: 0
  });

  const [inputsStatus, setInputsStatus] = useState({
    CardNumber: {
      message: "",
      isError: false,
      isTouched: false
    },
    ExpDate: {
      message: "",
      isError: false,
      isTouched: false
    },
    Cvv: {
      message: "",
      isError: false,
      isTouched: false
    },
    Amount: {
      message: "",
      isError: false,
      isTouched: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputsStatus({
      ...inputsStatus,
      [name]: {
        message: "",
        isError: false,
        isTouched: false
      }
    });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const isButtonActive = useMemo(() => isFormReady(formValues), [formValues]);

  const handleInputTouched = (e) => {
    const { name, value } = e.target;
    let message = "";
    switch (name) {
      case "CardNumber":
        message = cardNumberValidator(value);
        break;
      case "ExpDate":
        message = dateValidator(value);
        break;
      case "Amount":
        message = amountValidator(value);
        break;
      case "Cvv":
        message = cvvValidator(value);
        break;
      default:
        return;
    }

    setInputsStatus({
      ...inputsStatus,
      [name]: {
        isError: !!message,
        message: message,
        isTouched: true
      }
    });
  };

  const submitHandler = () => {
    sendCardData(formValues).then((res) => {
      console.log("res is", res);
    });
    setFormValues({
      CardNumber: "",
      ExpDate: "",
      Cvv: "",
      Amount: 0
    });
  };

  return (
    <CustomForm>
      <TextField
        name="CardNumber"
        label="Card number"
        variant="outlined"
        value={cardNumberFormatter(formValues.CardNumber)}
        error={inputsStatus.CardNumber.isError}
        helperText={inputsStatus.CardNumber.message}
        required
        onChange={handleInputChange}
        onBlur={handleInputTouched}
      />
      <Grid container columnSpacing={2}>
        <Grid item>
          <TextField
            name="ExpDate"
            label="Expiration Date"
            size="small"
            value={expDateFormatter(formValues.ExpDate)}
            variant="filled"
            error={inputsStatus.ExpDate.isError}
            helperText={inputsStatus.ExpDate.message}
            required
            onChange={handleInputChange}
            onBlur={handleInputTouched}
          />
        </Grid>
        <Grid item>
          <TextField
            name="Cvv"
            label="CVV"
            size="small"
            variant="filled"
            value={cvvFormatter(formValues.Cvv)}
            error={inputsStatus.Cvv.isError}
            helperText={inputsStatus.Cvv.message}
            required
            onChange={handleInputChange}
            onBlur={handleInputTouched}
          />
        </Grid>
      </Grid>
      <TextField
        name="Amount"
        label="Amount"
        variant="outlined"
        required
        value={amountFormatter(formValues.Amount)}
        error={inputsStatus.Amount.isError}
        helperText={inputsStatus.Amount.message}
        onChange={handleInputChange}
        onBlur={handleInputTouched}
      />
      <CustomButton disabled={!isButtonActive} onClick={submitHandler}>
        Pay
      </CustomButton>
    </CustomForm>
  );
};

export default Form;
