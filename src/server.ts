import express, { type Application, type Request, type Response } from 'express'
const app: Application = express()
const port = 3000

app.get('/', (req : Request, res : Response) => {
  res.send('Hello Everyone, Welcome to DevPluse Verse!')
})

app.listen(port, () => {
  console.log(`Server Running on port ${port}`)
})
