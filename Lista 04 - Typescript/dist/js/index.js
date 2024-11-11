"use strict";
//declare uma váriavel que pode conter uma string ou um numero
let valor;
valor = 10;
console.log(valor);
//Crie uma função que receba dois números e retorne a soma deles
function soma(a, b) {
    return (a + b);
}
console.log(soma(1, 2));
class Pessoa {
    constructor(nome, idade) {
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
    constructor(especie) {
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
let numeros = [1, 2, 3, 4, 5];
function maiorValor(numeros) {
    return Math.max(...numeros);
}
console.log(maiorValor(numeros));
//Crie um enum para representar as cores: vermelho, verde e azul
var cores;
(function (cores) {
    cores["VM"] = "Vermelho";
    cores["VD"] = "Verde";
    cores["AZ"] = "Azul";
})(cores || (cores = {}));
const papel = {
    cor: cores.AZ
};
console.log(papel);
function parametro(valor) {
    if (typeof valor === "string") {
        return valor.length;
    }
    else if (typeof valor === "number") {
        return valor * 2;
    }
}
console.log(parametro("Olá"));
console.log(parametro(10));
