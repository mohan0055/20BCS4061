import express from "express";
import axios from "axios";

const app = express();

app.get("/numbers", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("URL parameter is missing");
    return;
  }

  const urls = Array.isArray(url) ? url : [url];
  const value = new Set();

  for await (const prop of urls) {
    try {
      const response = await axios.get(prop);
      const val = response.data.numbers;
      for (const i of val) {
        value.add(i);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }
  }
  const ans = Array.from(value).sort((a, b) => a - b);
  res.status(200).send({ numbers: ans });
});

app.listen("8008", () => console.log("Server is running in port 8008"));
