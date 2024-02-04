import Server  from "express";
import cors from "cors"

const App = Server()

const PORT = 3000

App.use(cors())

App.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT ", PORT);
})