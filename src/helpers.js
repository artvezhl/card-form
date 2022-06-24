export const cardNumberFormatter = (number) => {
  const cardNumber = number.replace(/\D/g, "");
  let resultValue = "";
  for (let i = 0; i < cardNumber.length; i++) {
    resultValue += (i % 4 == 0 && i != 0 ? " " : "") + cardNumber[i];
  }

  return resultValue;
};

export const expDateFormatter = (date) => {
  const dateDigits = date.replace(/\D/g, "");
  let resultValue = "";
  for (let i = 0; i < dateDigits.length; i++) {
    if (i === 2) {
      resultValue += `/${dateDigits[i]}`;
    } else {
      resultValue += dateDigits[i];
    }
  }

  return resultValue;
};

export const cvvFormatter = (cvv) => cvv.replace(/\d{4}/g, "");

export const amountFormatter = (amount) => {
  const stringAmount = "" + amount;
  const result = stringAmount.replace(/\D/g, "");

  return +result;
};

export const cardNumberValidator = (number) => {
  const cardNumber = number.replace(/\D/g, "");
  return cardNumber.length !== 16 ? "Card number must contain 16 digits." : "";
};

export const dateValidator = (number) => {
  const dateDigits = number.replace(/\D/g, "");
  const month = dateDigits.substr(0, 2);
  const year = dateDigits.substr(2, 4);
  let message = "";

  if (+month > 12 || +month < 1) {
    message = "Incorrect month number.";
  }

  if (+year < 2022) {
    message = "Year must be greater than 2021.";
  }

  if (+year > 2035) {
    message = "Year must be lower than 2035.";
  }

  if (dateDigits.length < 6) {
    message = "Fill date in format 12/2022.";
  }

  return message;
};

export const amountValidator = (amount) =>
  +amount === 0 ? "Amount must be greater than 0." : "";
export const cvvValidator = (cvv) =>
  cvv.length !== 3 ? "CVV must contain 3 numbers." : "";

export const isFormReady = ({ CardNumber, ExpDate, Cvv, Amount }) => {
  const cardNumber = CardNumber.replace(/\D/g, "");
  const data = ExpDate.replace(/\D/g, "");
  const month = data.substr(0, 2);
  const year = data.substr(2, 4);

  const result =
    cardNumber.length === 16 &&
    month > 0 &&
    month < 13 &&
    year > 2021 &&
    year < 2035 &&
    Cvv.length === 3 &&
    Amount > 0;

  return result;
};
