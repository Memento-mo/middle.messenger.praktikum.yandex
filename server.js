import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const staticFilesPath = path.join(__dirname, 'dist');

app.use(cors())

app.use(express.static(staticFilesPath))

app.get('/', (req, res) => {
  res.status(200).send(200)
})

app.get('/sign-up', (req, res) => {
  res.status(200).send(200)
})

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(staticFilesPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
})
