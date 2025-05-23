const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tarefas = [];

function menu() {
  console.log("\n==== MENU ====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Listar tarefas");
  console.log("3 - Marcar como concluída");
  console.log("4 - Remover tarefa");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    tratarOpcao(opcao.trim());
  });
}

function tratarOpcao(opcao) {
  switch (opcao) {
    case "1":
      rl.question("Descrição da tarefa: ", (desc) => {
        rl.question("Prioridade (baixa/media/alta): ", (prioridade) => {
          const p = prioridade.toLowerCase().trim();
          if (!["baixa", "media", "alta"].includes(p)) {
            console.log("Prioridade inválida! Use baixa, media ou alta.");
            return menu();
          }
          tarefas.push({ descricao: desc.trim(), prioridade: p, concluida: false });
          console.log("Tarefa adicionada com sucesso!");
          menu();
        });
      });
      break;

    case "2":
      if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
      } else {
        console.log("\n=== Lista de Tarefas ===");
        tarefas.forEach((t, i) => {
          const status = t.concluida ? "✔️" : "❌";
          console.log(`${i + 1}. [${status}] ${t.descricao} (${t.prioridade})`);
        });
      }
      menu();
      break;

    case "3":
      if (tarefas.length === 0) {
        console.log("Nenhuma tarefa para marcar como concluída.");
        menu();
      } else {
        rl.question("Número da tarefa para marcar como concluída: ", (num) => {
          const i = parseInt(num.trim()) - 1;
          if (i >= 0 && i < tarefas.length) {
            tarefas[i].concluida = true;
            console.log("Tarefa marcada como concluída!");
          } else {
            console.log("Número inválido.");
          }
          menu();
        });
      }
      break;

    case "4":
      if (tarefas.length === 0) {
        console.log("Nenhuma tarefa para remover.");
        menu();
      } else {
        rl.question("Número da tarefa para remover: ", (num) => {
          const i = parseInt(num.trim()) - 1;
          if (i >= 0 && i < tarefas.length) {
            tarefas.splice(i, 1);
            console.log("Tarefa removida com sucesso!");
          } else {
            console.log("Número inválido.");
          }
          menu();
        });
      }
      break;

    case "0":
      console.log("Saindo...");
      rl.close();
      break;

    default:
      console.log("Opção inválida, tente novamente.");
      menu();
  }
}

menu();
