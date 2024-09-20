    // criando classe

    class Funcionario {
      constructor(cargo, nome, idade) {
        this._cargo = cargo;

        this._nome = nome;

        this._idade = idade;

        this.trabalhando = false;
      }

      get cargo() {
        return this._cargo;
      }

      get nome() {
        return this._nome;
      }

      get idade() {
        return this._idade;
      }

      set idade(idade) {
        this._idade = idade;
      }

      set cargo(cargo) {
        this._cargo = cargo;
      }

      trabalhar() {
        if (!this.trabalhando) {
          this.trabalhando = true;

          return this._iniciarTrabalho();
        } else {
          this.trabalhando = false;

          return this._pararTrabalho();
        }
      }

      _iniciarTrabalho() {
        throw new Error("Este método deve ser implementado na subclasse.");
      }

      _pararTrabalho() {
        throw new Error("Este método deve ser implementado na subclasse.");
      }
    }

    // criando subclasses

    class Gerente extends Funcionario {
      constructor(nome, idade, departamento) {
        super("gerente", nome, idade);

        this._departamento = departamento;

        this.gerenciando = false;
      }

      get departamento() {
        return this._departamento;
      }

      set departamento(departamento) {
        this._departamento = departamento;
      }

      seApresentar() {
        return `

              <li><strong>Cargo</strong>: Gerente</li>\n

              <li><strong>Nome</strong>: ${this.nome}</li>\n

              <li><strong>Idade</strong>: ${this.idade}</li>\n

              <li><strong>Departamento</strong>: ${this.departamento}</li>\n

          `;
      }

      gerenciar() {
        return this.trabalhar();
      }

      _iniciarTrabalho() {
        this.gerenciando = this.trabalhando = true;

        return `${this._nome} começou a gerenciar o departamento ${this.departamento}.`;
      }

      _pararTrabalho() {
        this.gerenciando = this.trabalhando = false;

        return `${this._nome} parou de gerenciar o departamento ${this.departamento}.`;
      }
    }

    class Desenvolvedor extends Funcionario {
      constructor(nome, idade, linguagem) {
        super("desenvolvedor", nome, idade);

        this._linguagem = linguagem;

        this.programando = false;
      }

      get linguagem() {
        return this._linguagem;
      }

      set linguagem(linguagem) {
        this._linguagem = linguagem;
      }

      seApresentar() {
        return `

              <li><strong>Cargo</strong>: Desenvolvedor</li>\n

              <li><strong>Nome</strong>: ${this.nome}</li>\n

              <li><strong>Idade</strong>: ${this.idade}</li>\n

              <li><strong>Linguagem</strong>: ${this.linguagem}</li>\n

          `;
      }

      programar() {
        return this.trabalhar();
      }

      _iniciarTrabalho() {
        this.programando = this.trabalhando = true;

        return `${this._nome} começou a programar em ${this.linguagem}.`;
      }

      _pararTrabalho() {
        this.programando = this.trabalhando = false;

        return `${this._nome} parou de programar em ${this.linguagem}.`;
      }
    }

    // criando funções

    function main() {
      let select = document.getElementById("campoCargo");

      const botaoEnviar = document.getElementById("botao-enviar");

      const botaoLimpar = document.getElementById("botao-limpar");

      select.addEventListener("change", (event) => {
        try {
          let escolha = event.target.value.toLowerCase().trim();

          defineForm(escolha);
        } catch (error) {
          alert(error);
        }
      });

      botaoEnviar.addEventListener("click", function (event) {
        event.preventDefault();

        enviar();
      });

      botaoLimpar.addEventListener("click", function (event) {
        event.preventDefault();

        limpar();
      });
    }

    function defineForm(cargo) {
      let campoDepartamento = document.getElementById("campoDepartamento");

      let campoLinguagem = document.getElementById("campoLinguagem");

      if (cargo === "gerente") {
        let inputDepartamento = document.getElementById(
          "campoDepartamentoInput"
        );

        inputDepartamento.value = "";

        campoDepartamento.style.display = "block";

        campoLinguagem.style.display = "none";
      } else if (cargo === "desenvolvedor") {
        let inputLinguagem = document.getElementById("campoLinguagemInput");

        inputLinguagem.value = "";

        campoLinguagem.style.display = "block";

        campoDepartamento.style.display = "none";
      } else {
        throw new Error("Cargo inválido.");
      }
    }

    function enviar() {
      let select = document.getElementById("campoCargo");

      let cargo = select.value.toLowerCase().trim();

      let nome = document.getElementById("campoNomeInput").value.trim();

      let idade = document.getElementById("campoIdadeInput").valueAsNumber;

      let departamento;

      let linguagem;

      try {
        exibirErro(cargo, nome, idade);

        if (cargo === "gerente") {
          departamento = document

            .getElementById("campoDepartamentoInput")

            .value.trim();
        } else if (cargo === "desenvolvedor") {
          linguagem = document

            .getElementById("campoLinguagemInput")

            .value.trim();
        }

        criarLi(cargo, nome, idade, departamento, linguagem);
        limpar();
      } catch (error) {
        alert(error);
      }
    }

    function limpar() {
      let select = document.getElementById("campoCargo");
      let cargo = select.value.toLowerCase();

      switch (cargo) {
        case "gerente":
          document.getElementById("campoDepartamentoInput").value = "";
          campoDepartamento.style.display = "none";
          break;

        case "desenvolvedor":
          document.getElementById("campoLinguagemInput").value = "";
          campoLinguagem.style.display = "none";

          break;

        default:
          console.log("Houve um erro com a função limpar().");
          break;
      }

      campoCargo.value = "";

      document.getElementById("campoNomeInput").value = "";

      document.getElementById("campoIdadeInput").value = "";
    }

    function exibirErro(cargo, nome, idade) {
      const linguagem = document

        .getElementById("campoLinguagemInput")

        .value.trim();

      const departamento = document

        .getElementById("campoDepartamentoInput")

        .value.trim();

      const displayDepartamento =
        document.getElementById("campoDepartamento").style.display;

      const displayLinguagem =
        document.getElementById("campoLinguagem").style.display;

      idade = Number(idade);

      if (cargo === "") {
        throw new Error("Primeiro, escolha o cargo para o funcionário(a).");
      } else if (cargo !== "gerente" && cargo !== "desenvolvedor") {
        throw new Error("Cargo não identificado.");
      } else if (
        (displayDepartamento === "none" &&
          (nome === "" || idade === "" || linguagem === "")) ||
        (displayLinguagem === "none" &&
          (nome === "" || idade === "" || departamento === ""))
      ) {
        throw new Error(
          "Preencha todos os campos para adicionar funcionário(a)."
        );
      } else if (nome.split(" ").length < 2) {
        throw new Error("Por favor, forneça nome e sobrenome.");
      } else if (isNaN(idade)) {
        throw new Error("Por favor, digite um número válido para a idade.");
      } else if (!Number.isInteger(idade)) {
        throw new Error("Por favor, digite um número inteiro para a idade.");
      } else if (idade <= 0) {
        throw new Error("Por favor, digite um número positivo para a idade.");
      } else if (idade < 18) {
        throw new Error("O funcionário(a) precisa ser maior de idade.");
      } else if (idade > 120) {
        throw new Error("Por favor, digite a idade verdadeira.");
      }
    }

    function criarLi(cargo, nome, idade, departamento, linguagem) {
      let li = document.createElement("li");

      let funcionario;

      if (cargo === "gerente") {
        funcionario = new Gerente(nome, idade, departamento);
      } else if (cargo === "desenvolvedor") {
        funcionario = new Desenvolvedor(nome, idade, linguagem);
      } else {
        throw new Error("Cargo inválido.");
      }

      let contagem = 0;

      function alternarTrabalho() {
        contagem = Number(this.getAttribute("data-contagem"));

        contagem++;

        if (contagem % 2 === 0) {
          funcionario.trabalhando = true;
        } else {
          funcionario.trabalhando = false;
        }

        this.setAttribute("data-contagem", contagem);

        alert(funcionario.trabalhar());
      }

      let botao = document.createElement("button");

      botao.setAttribute("data-contagem", contagem);

      botao.textContent = "Começar/Terminar Trabalho";

      botao.addEventListener("click", alternarTrabalho);

      li.innerHTML = funcionario.seApresentar() + " - ";

      li.appendChild(botao);

      document.getElementById("funcionario-list").appendChild(li);
    }

    //chamando a função main

    document.addEventListener("DOMContentLoaded", () => {
      main();
    });