import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.static('dist'))

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
})
