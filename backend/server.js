//chammando o express e guardando ele em uma variavel
const express = require("express")
const cors = require("cors")

//criando aplicação da API
/*Essa variável app agora controla tudo:

rotas

requisições

respostas

servidor*/
const app = express()

/*
Permitir que a API receba dados

Nesse caso ele:

recebe o JSON
transforma em objeto
coloca dentro de:*/
app.use(express.json())

app.use(cors())
let tarefas = []

/* req → request (pedido do cliente)
res → response (resposta do servidor)

cliente → request → servidor
servidor → response → cliente*/
app.get("/", (req, res) => { res.send("funcionando") })

//estou chamando tarefas
app.get("/tarefas", (req, res) => { res.json(tarefas) })

//criando a rota post
app.post("/tarefas", (req, res) => {
    //Ler os dados enviados
    const tarefa = req.body.tarefa

    //puxando os dados para o array
    tarefas.push({
        id: Date.now(),
        tarefa: tarefa,
        concluida: false
    })

    //respondendo a requisição
    res.json({ mensagem: "tarefa criada" })
})

//atualizando o estado de conclusao
app.put("/tarefas/:id", (req, res) => {
    const id = req.params.id
    //find pega o primeiro item q corresponde com a exigencia
    const tarefa = tarefas.find(t => t.id == id)

    if (tarefa.concluida === false) {
        tarefa.concluida = true
        res.json({mensagem: "tarefa concluida"})
    } else {
        tarefa.concluida = false     
        res.json({mensagem: "tarefa desconcluida"})   
    }
})

//deletando tarefas
app.delete("/tarefas/:id", (req, res) => {
    //aqui sera guardado os id da requisição 
    const id = req.params.id

    //deletando uma tarefa recriando a lista
    //filter cria uma nova lista de acordo com as expecificações 
    tarefas = tarefas.filter(t => t.id != id)

    res.json({ mensagem: "tarefa removida" })
})

//ligando o server mandando ele ouvir a porta 3000
app.listen(3000, () => { console.log("servidor rodando") })