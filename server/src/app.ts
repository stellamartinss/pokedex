import express from "express";
import pokemon from "./routes/pokemon";
import cors from "cors"



const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/_health', (_req, res) => {
  res.send('Server is running!')
})

app.use('/pokemon', pokemon);

app.listen(PORT, () => {
  console.log(`App Listening on Port: ${PORT}`);
});
