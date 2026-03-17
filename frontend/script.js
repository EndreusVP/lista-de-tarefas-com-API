const lista = document.getElementById("lista")
const input = document.getElementById("tarefa")

async function criarTarefa() {
    const texto = input.value

    //esta sendo criado o metodo POST para adicionar uma tarefa
    await fetch("http://localhost:3000/tarefas", {
        //diz o metodo POST
        method: "POST",
        //dizendo q esta sendo enviado um JSON
        headers: {
            "content-type": "application/json"
        },
        //convertendo o objeto para JSON
        body: JSON.stringify({
            tarefa: texto
        })
    })

    input.value = ""

    carregarTarefas()
}

async function deletarTarefa(id) {

    await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
    })

    carregarTarefas()

}

async function concluirTarefa(id){
    await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT"
    })

    carregarTarefas()
}

//async eh usado para fzr requisições de API, pq podemos usar o await dps q facilita mto
async function carregarTarefas() {

    lista.innerHTML = ""
    //cria uma requisição, essa linha eh o msm q GET / tarefas
    const resposta = await fetch("http://localhost:3000/tarefas")

    //transforma a requisição q vem em json para array 
    const tarefas = await resposta.json()

    console.log(tarefas)

    //forEach percorre a lista
    tarefas.forEach(tarefa => {

        let estilo = ""
        let estiloSpan = ""

        if(tarefa.concluida){
            estilo = "text-decoration: line-through"
            estiloSpan += "background-color: #a0aa00; color: white"

        } else {
            estilo = ""
            estiloSpan += "background-color: white; color: white"
        }
        
        lista.innerHTML += `<li style="${estilo}">
            <span srtyle="${estiloSpan}">✓</span>
            ${tarefa.tarefa}
            <button onclick="deletarTarefa(${tarefa.id})">x</button>
            <button onclick="concluirTarefa(${tarefa.id})">✓</button>
            <hr>
        </li>`
    });

}

carregarTarefas()




