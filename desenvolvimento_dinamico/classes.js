class Funcionario{
    constructor(nome, idade, cargo){
        this._nome = nome
        this._idade = idade
        this._cargo = cargo
        this.trabalhando = false
    }

    get nome(){
        return this._nome
    }
    get idade(){
        return this._idade
    }
    get cargo(){
        return this._cargo
    }

    set idade(idade){
        this._idade = idade
    }
    set cargo(cargo){
        this._cargo = cargo
    }

    seApresentar(){
        console.log(`Olá, meu nome é ${this.nome}. Eu sou ${this.cargo} e tenho ${this.idade} anos.`)
    }

    trabalhar(){
    this.trabalhando? console.log("Este funcionário já está trabalhando."):(this.trabalhando=true, console.log("Este funcionário começou a trabalhar."))
    }
}
class Gerente extends Funcionario{
    constructor(nome, idade, departamento){
        super(nome, idade, "gerente")
        this._departamento = departamento
        this.gerenciando = false
    }
    get departamento(){
        return this._departamento
    }
    set departamento(departamento){
        this._departamento = departamento
    }

    gerenciar(){
        this.gerenciando? console.log("Este funcionário já está gerenciando."):(this.gerenciando=true, console.log("Este funcionário começou o gerenciamento."))
    }
}
class Desenvolvedor extends Funcionario{
    constructor(nome, idade, linguagem){
        super(nome, idade, "desenvolvedor")
        this._linguagem = linguagem
        this.programando = false
    }
    get linguagem(){
        return this._linguagem
    }
    set linguagem(linguagem){
        this._linguagem = linguagem
    }

    programar(){
        this.programando? console.log("Este funcionário já está programando."):(this.programando=true, console.log("Este funcionário começou a programar."))
    }
}


//testes//

let gerente1 = new Gerente("Pedro Ramos", 42, "recursos humanos")

let desenvolvedor1 = new Desenvolvedor("Igor Durante", 24, "Javascript")

// Testes para Gerente
console.log("Esperado: Pedro Ramos");
console.log(gerente1.nome);

console.log("Esperado: gerente");
console.log(gerente1.cargo);

console.log("Esperado: 42");
console.log(gerente1.idade);

gerente1.idade = 38;
console.log("Esperado: 38");
console.log(gerente1.idade);

console.log("Esperado: recursos humanos");
console.log(gerente1.departamento);

gerente1.departamento = "vendas";
console.log("Esperado: vendas");
console.log(gerente1.departamento);

// Teste dos métodos de Gerente
console.log("Teste do método seApresentar:");
gerente1.seApresentar();

console.log("Teste do método trabalhar:");
gerente1.trabalhar(); 
gerente1.trabalhar(); 

console.log("Teste do método gerenciar:");
gerente1.gerenciar(); 
gerente1.gerenciar(); 

// Testes para Desenvolvedor
console.log("Esperado: Igor Durante");
console.log(desenvolvedor1.nome);

console.log("Esperado: desenvolvedor");
console.log(desenvolvedor1.cargo);

console.log("Esperado: 24");
console.log(desenvolvedor1.idade);

desenvolvedor1.idade = 20;
console.log("Esperado: 20");
console.log(desenvolvedor1.idade);

console.log("Esperado: Javascript");
console.log(desenvolvedor1.linguagem);

desenvolvedor1.linguagem = "Java";
console.log("Esperado: Java");
console.log(desenvolvedor1.linguagem);

// Teste dos métodos de Desenvolvedor
console.log("Teste do método seApresentar:");
desenvolvedor1.seApresentar(); 

console.log("Teste do método trabalhar:");
desenvolvedor1.trabalhar(); 
desenvolvedor1.trabalhar(); 

console.log("Teste do método programar:");
desenvolvedor1.programar(); 
desenvolvedor1.programar(); 
