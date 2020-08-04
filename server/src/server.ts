import express from 'express'

const app = express()

//Configurando o express para entender o formato json
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

//Ligando o servidor
app.listen(3333, () => {
  console.log('Server rodando na porta 3333')
})
