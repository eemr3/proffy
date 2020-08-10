import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json()) //Configurando o express para entender o formato json
app.use(routes)

//Ligando o servidor
app.listen(process.env.PORT || 3333, () => {
  console.log('Server rodando na porta 3333')
})
