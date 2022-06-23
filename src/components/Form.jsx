import React, { useState } from "react";
import {FormGroup, TextField, Grid, Button} from "@mui/material";
import { styled } from '@mui/material/styles';

const CustomForm = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const CustomButton = styled(Button)`
  transition: ease 1s;
  background: #3dd5a8;
  &:hover {
    color: white;
    
  }
`;

const cardNumberFormatter = (number) => {
    const cardNumber = number.replace(/\D/g, '');
    let resultValue = '';
    for(let i = 0; i < cardNumber.length; i++) {
        resultValue += (i%4==0 && i != 0 ? ' ' : '') + cardNumber[i];
    }

    return resultValue;
}

const expDateFormatter = (date) => {
    const dateDigits = date.replace(/\D/g, '');
    let resultValue = '';
    for(let i = 0; i < dateDigits.length; i++) {
        if (i === 2) {
            resultValue += `/${dateDigits[i]}`
        } else {
            resultValue += dateDigits[i];
        }
    }

    return resultValue;
}

const cvvFormatter = (cvv) => cvv.replace(/\d{4}/g, '');

const amountFormatter = (amount) => {
    const stringAmount = '' + amount;
    const result = stringAmount.replace(/\D/g, '');

    return +result;
}

const cardNumberValidator = (number) => {
    const cardNumber = number.replace(/\D/g, '');
    return cardNumber.length !== 16  ? 'Card number must contain 16 digits.' : '';
}

const dateValidator = (number) => {
    const dateDigits = number.replace(/\D/g, '');
    const month = dateDigits.substr(0, 2);
    const year = dateDigits.substr(2, 4);
    let message = '';

    if (+month > 12 || +month < 1) {
        message = 'Incorrect month number.';
    }

    if (+year < 2022) {
        message = 'Year must be greater than 2021.';
    }

    if (+year > 2035) {
        message = 'Year must be lower than 2035.';
    }

    if (dateDigits.length < 6) {
        message = 'Fill date in format 12/2022.';
    }

    return message;
}

const amountValidator = (amount) => +amount === 0 ? 'Amount must be greater than 0.' : '';
const cvvValidator = (cvv) => cvv.length !== 3 ? 'CVV must contain 3 numbers.' : '';

const Form = () => {
    const [formValues, setFormValues] = useState({
        CardNumber: '',
        ExpDate: '',
        Cvv: '',
        Amount: 0
    });

    const [inputsStatus, setInputsStatus] = useState({
        CardNumber: {
            message: '',
            isError: false,
            isTouched: false
        },
        ExpDate: {
            message: '',
            isError: false,
            isTouched: false
        },
        Cvv: {
            message: '',
            isError: false,
            isTouched: false
        },
        Amount: {
            message: '',
            isError: false,
            isTouched: false
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsStatus({
            ...inputsStatus,
            [name]: {
                message: '',
                isError: false,
                isTouched: false
            }
        })
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleInputTouched = (e) => {
        const { name, value } = e.target;
        let message = '';
        switch (name) {
            case 'CardNumber':
                message = cardNumberValidator(value);
                break;
            case 'ExpDate':
                message = dateValidator(value);
                break;
            case 'Amount':
                message = amountValidator(value);
                break;
            case 'Cvv':
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
    }

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
            <Grid container columnSpacing={2} >
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
            <CustomButton>Pay</CustomButton>
        </CustomForm>
    );
}

export default Form
