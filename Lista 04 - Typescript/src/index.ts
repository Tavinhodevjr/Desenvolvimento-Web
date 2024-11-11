//declare uma váriavel que pode conter uma string ou um numero
let valor: string | number
valor = 10
console.log(valor);

//Crie uma função que receba dois números e retorne a soma deles
function soma(a: number, b: number): number {
    return (a + b);
}
console.log(soma(1, 2));

//Crie uma interface para representar uma pessoa com nome e idade, ambos obrigatórios
interface I_Pessoa {
    nome: string,
    idade: number
}

class Pessoa {
    nome: string;
    idade: number;
    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    exibir() {
        return `Nome: ${this.nome} - Idade: ${this.idade}`;
    }
}

let pessoa = new Pessoa('Otávio', 20);
console.log(pessoa.exibir());

/*Crie uma classe Animal com um método falar. Depois crie uma classe Cachorro que
herda de Animal e sobrescreva o método falar para imprimir "Au Au"*/

class Animal {
    especie: string;
    constructor(especie: string) {
        this.especie = especie;
    }
    falar() {
        return `Fala: ${this.especie}`;
    }
}

class Cachorro extends Animal {
    constructor() {
        super("Cachorro"); 
    }
    falar() {
        return "Au Au";
    }
}
const cachorro = new Cachorro();
console.log(cachorro.falar()); 


//Crie uma função que receba um array de números e retorne o maior valor
let numeros: number[] = [1, 2, 3, 4, 5];

function maiorValor(numeros: number[]): number {
    return Math.max(...numeros);
}
console.log(maiorValor(numeros));

//Crie um enum para representar as cores: vermelho, verde e azul
enum cores {
    VM = 'Vermelho',
    VD = 'Verde',
    AZ = 'Azul'
}

const papel = {
    cor: cores.AZ
}
console.log(papel);

function parametro(valor: string | number) {
    if (typeof valor === "string") {
        return valor.length;  
    } else if (typeof valor === "number") {
        return valor * 2;  
    }
}
console.log(parametro("Olá"));  
console.log(parametro(10));     
