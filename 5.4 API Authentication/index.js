import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "binnu";
const yourPassword = "binnu";
const yourAPIKey = "7bc076de-4719-4fe9-92b9-20347176e7df";
const yourBearerToken = "87350f2f-6e4a-4293-ba59-522867fe669b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message, });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        }
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const response = await axios.get(API_URL + "/filter",
      {
        params: { apiKey: yourAPIKey, score: 8 },
      });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch {
    res.status(404).send(error.message);
  }
});
app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const response = await axios.get(API_URL + "/secrets/2",
      {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
