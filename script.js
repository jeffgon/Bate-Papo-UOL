// variáveis globais
let mensagem = [];
let nome;


// entrando na sala
function entrarSala() {
    nome = prompt("Qual seu nome?")

    let novoNome = {name: nome}

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoNome)
    promessa.then(entradaOK)
    promessa.catch(entradaErro)
}
entrarSala()

function entradaOK(deuCerto){
    console.log(deuCerto)
}
function entradaErro(erro){
    alert("Tente outro nome!")
    entrarSala();
}

// buscando mensagens
function pegarMensagem() {
    let mensagemChat = {from: nome, to: "Todos", text: "text", type: "status", time: "time"}

    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemChat);
    promessa.then(mensagensCarregadas);
    promessa.catch(deuErro)
}
pegarMensagem()

function mensagensCarregadas(resposta){
    mensagem = resposta.data;
    renderizarMensagens()
}
function deuErro(erro) {
    alert("Error "+erro.response.status+", tente novamente mais tarde!")
}

setInterval(pegarMensagem, 3000)

// imprimindo mensagem
function renderizarMensagens() {
    const mensagemRender = document.querySelector(".chat")

    mensagemRender.innerHTML = "";
    
    for (let i = 0; i < mensagem.length; i++){
        let msg = mensagem[i]

        mensagemRender.innerHTML += `
        <div class="msg ${msg.type}">
            <p class="time">(${msg.time})</p>
            <span><b class="negrito">${msg.from} </b> para <b class="negrito">${msg.to}: </b>${msg.text}</span>
        </div>
        `
    }

    const ultimaMensagem = document.querySelector(".chat div:last-of-type")
    ultimaMensagem.scrollIntoView();
}

// mantendo conexão
function manterConexao() {
    const nomeNovo = {name: nome}

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeNovo);
    promessa.then(conexaoEstavel);
    promessa.catch(conexaoRuim);
}

function conexaoEstavel(tudoOK){
    console.log("Online")
}
function conexaoRuim(deuRuim){
    alert("Você saiu")
    window.location.reload()
}
setInterval(manterConexao, 5000)


// enviando mensagem
function enviarMensagem(elemento) {
    const inputMensagem = document.querySelector("input").value

    const novaMensagem = {from: nome, to: "Todos", text: inputMensagem, type: "message"}

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)
    promessa.then(mensagemEnviada)
    promessa.catch(mensagemNaoEnviada)

    renderizarMensagens();
}

function mensagemEnviada(resposta){
    let input = document.querySelector("input").value="";
}
function mensagemNaoEnviada(resposta){
    alert("Mensagem não enviada!")
}
