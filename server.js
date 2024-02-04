import express, {json} from "express";
import cors from "cors";
import axios from "axios";
import qs from "query-string";

const app = express()
app.use(cors());
app.use(json());

app.post("/login", async (req, res) => {
  try {
    const token = await exchangeCodeForAccessToken(req.body.code);
    console.log("token", token);

    const user = await fetchUser(token);
    res.send(user);
  } catch(err) {
    if (err.response && err.response.data) {
      console.log("err", err.response.data);
    } else {
      console.error("Erro desconhecido:", err);
    }
    res.sendStatus(500);
  }
});


async function exchangeCodeForAccessToken(code) {
  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: "http://localhost:5173",
    client_id: "98347812d33e772baf1e", 
    client_secret: "2c77a7f6e97f87d0c071c76ac5525f25b5f3c601",
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token) {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

app.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
});