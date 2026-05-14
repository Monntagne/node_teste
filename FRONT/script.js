// Função responsável por buscar os pedidos na API e exibir na tela
function listarPedidos() {
  //Busca no HTML o elemento onde a lista será exxibida
  const lista = document.getElementById("lista");

  // Limpa a lista antes de exibir os pedidos.
  lista.innerHTML = "Carregando pedidos...";

  //Aqui vai a URL precisa substituir xxxx pela URL
  //Faz a requisição GET para a API com a URL dela publicada (ou local)
  fetch(xxxx)
    //Converte a resposta da API para JSON
    .then((res) => res.JSON())

    //Vamos trabalhar com o resultado da API
    .then((resultado) => {
      //Limpando a lisra para preecher com os pedidos
      lista.innerHTML = "";

      //Percorrendo o array de pedidos recebido da API
      resultado.dados.forEach((pedido) => {
        // Cria um item de lista para cada pedido
        const item = document.createElement("li");

        //Definindo como o texto será exibido na tela
        item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status} `;

        //Adiconando item criado
        lista.appendChild(item);
      });
    })
    //Caso o front não consiga acesaar a API para trazer os dados
    .catch(() => {
      lista.innerHTML = "Erro ao carregar pedidos";
    });
}

//CRIAR PEDIDO (´POST)
//Funcção responsável por cadastar um novo pedido

function cadastrarPedido() {
  //pega os valores digitados no input do html e depois limpa
  const cliente = document.getElementById("cliente").value;
  const produto = document.getElementById("produto").value;

  (fetch(xxxxxxx,
    {
      method: "POST",
      //Informa que os dados enviados estão em JSON
      headers: {
        "Content-Type": "application/JSON",
      },
      //COnverte o objeto Javascript em JSON para enviar no body
      body: JSON.stringify({
        id: Date.now(),
        cliente: cliente,
        produto: produto,
        status: "Pendente",
      }),
    })

      //converte a resposta da API para JSON
      .then((res) => res.json())

      //Depois que o item for cadastrado atualiza a lista na tela
      .then(() => {
        //limpa os inputs apos o envio do cadastro
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";

        //atualiza a lista na tela
        listarPedidos();
      })

      //Alerta ao usuario caso nãoi seja possível realizar o cadastro do pedido
      .catch(() => {
        alert("Erro ao cadastrar pedido!");
      }));
}





// ATUALIZAR PEDIDO (PUT)
//Função responsável por atualizar o status do pedido 

function atualizarPedido(){

    //Pega o id informado e força a ser um numero 
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido digitado no input 
    const status = document.getElementById("statusAtualizar").value;

    //Envia uma requisição PUT para a API   
fetch(xxxxxxxxxxxxx,{
    method: "PUT", 
    headers: {
         "Content-Type": "application/JSON",
    },
    body: JSON.stringify({
        id: id,
        status: status
    })
})

.then(res => res.json())
.then(()=>{
    document.getElementById("idAtualizar").value ="";
    document.getElementById("statusAtualizar").value ="";
    listarPedidos()
})
.catch(() =>{
    alert("Erro ao editar pedido")
})
}



function removerPedido() {

    //Pega o ID informado no input
    const id = Number(document.getElementById("idRemover").value);

    //Envia uma requisição DELETE para a API
    fetch(xxxxxxxxxxx, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        })
    })

    .then(res => res.json())
    .then(() => {

        //Limpa o campo do input
        document.getElementById("idRemover").value = "";

        //Atualiza a lista de pedidos
        listarPedidos();

    })

    .catch(() => {
        alert("Erro ao deletar pedido");
    });

    listarPedidos()
}