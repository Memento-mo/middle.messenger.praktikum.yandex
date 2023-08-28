import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.status().send(200)
})

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
})
