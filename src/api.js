const requestURL = "http://localhost:8000/api";

export const sendCardData = async ({ CardNumber, ExpDate, Cvv, Amount }) => {
  const response = await fetch(`${requestURL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      CardNumber: CardNumber,
      ExpDate: ExpDate,
      Cvv: Cvv,
      Amount: Amount
    })
  });

  try {
    response.json().then((item) => console.log("item is", item));
  } catch (e) {
    console.log("error is", e);
  }
};
