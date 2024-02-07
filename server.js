import express from "express";
import cors from "cors";
import axios from "axios";
import qs from "query-string";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("post", (socketContent) => {
    console.log("Received post:", socketContent);
    io.emit("newPost", socketContent);
  });
});


app.post("/login", async (req, res) => {
  try {
    const token = await exchangeCodeForAccessToken(req.body.code);
    console.log("token", token);

    const user = await fetchUser(token);
    res.send(user);
  } catch (err) {
    if (err.response && err.response.data) {
      console.log("err", err.response.data);
    } else {
      console.error("Unknown error:", err);
    }
    res.sendStatus(500);
  }
});

async function exchangeCodeForAccessToken(code) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const params = {
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5173",
    client_id: "98347812d33e772baf1e",
    client_secret: "2c77a7f6e97f87d0c071c76ac5525f25b5f3c601",
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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

httpServer.listen(5000, () => {
  console.log(`Server is up and running on port 5000`);
});