
import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)

const {
    "MONGO_USER": dbuser,
    "MONGO_PASSWORD": dbpass,
    "MONGO_HOST": dbhost,
    "MONGO_PORT": dbport,
    "MONGO_DB": db
} = process.env;


const uri: string = `mongodb://${dbhost}:${dbport}/${db}?retryWrites=true&w=majority`

console.log(`Connecting to: ${uri}`)

const options = { 
    user: dbuser,
    pass: dbpass,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })