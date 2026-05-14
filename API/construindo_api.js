//1º Passo: criação do servidor
//2º Passo: Exibir rotas e método
//3º Passo: Atribuir o metodo GET
//4º Passo: Atribuir o metodo POST
//5º Passo: Atribuir o metodo PUT
//6º Passo: Atribuir o metodo DELET

const http = require("http");
const url = require("url");

let pedidos = [
  {
    id: 0,
    cliente: "Vinicius",
    produto: "Note",
    status: "Pendente",
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/JSON");

  const urlCompleta = url.parse(req.url, true);

  const rota = urlCompleta.pathname;
  const metodo = req.method;
res.setHeader("Access-Control-Allow-Origion","*");
res.setHeader("Access-Control-Allow-Methds", "GET POST, PUT, DELETE, OPTIONS")
res.setHeader("Access-Control-Allow-Headers", "Content-Type")
if (metodo === "OPTIONS"){
    res.statusCode = 204;
    res.end();
    return;
}



  if (rota === "/pedidos" && metodo === "GET") {
    res.end(
      JSON.stringify({
        Mensagem: "Lista de pedidos",
        dados: pedidos,
      }),
    );

    return;
  }

  if (rota === "/pedidos" && metodo === "POST") {
    let body = "";

    req.on("data", (parte) => {
      body += parte;
    });
    req.on("end", () => {
      const novoPedido = JSON.parse(body);
      pedidos.push(novoPedido);
      res.statusCode = 201;

      res.end(
        JSON.stringify({
          Mensagem: "Página  encontrada!",
          pedidos: novoPedido,
        }),
      );
    });
    return;
  }

  if (rota === "/pedidos" && metodo === "PUT") {
    let body = "";
    req.on("data", (parte) => {
      body += parte;
    });
    req.on("end", () => {
      const dados = JSON.parse(body);
      let encontrado = false;

      //pedidos está recebendo o mapeamento do array pedidos
      // pedido(no singular) - cada objeto do array
      pedidos = pedidos.map((pedido) => {
        // Comparação de ID para ser possível substituir.
        if (pedido.id === dados.id) {
          encontrado = true; // quando localizado vira true
          // retornara todos os dados que não foram alterados + status de cada um deles
          return {
            ...pedido,
            status: dados.status,
          };
        }
        return;
      });
      if (!encontrado) {
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            mensagem: "Pedido Não encontrado",
          }),
        );
        return;
      }
      res.end(
        JSON.stringify({
          Mensagem: "Pedido atualizado com sucesso",
          daos: pedidos,
        }),
      );
    });
    return;
  }

  if (rota === "/pedidos" && metodo === "DELETE") {
    let body = "";
    req.on("data", (parte) => {
      body += parte;
    });
    req.on("end", () => {
      const dados = JSON.parse(body);
      const tamanhoAntes = pedidos.length;
      pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
      if (pedidos.length === tamanhoAntes) {
        res.statusCode = 404;
        res.end(JSON.stringify({ mensagem: "Pedido não encontrado!" }));
        return;
      }
      res.end(
        JSON.stringify({
          mensagem: "Pedido removido",
          dados: pedidos,
        }),
      );
    });
    return;
  }

  res.statusCode = 404;
  res.end(
    JSON.stringify({
      Mensagem: "Página não encontrada!",
    }),
  );
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
