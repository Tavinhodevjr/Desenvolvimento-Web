//Exercício Individual Node - Método GET - Lista 01
// Otávio Pampolha - RA 235040 - N1 Web Front-End

//Arquivo com as funções

function vogais(palavra) {
    palavra = palavra.toLowerCase()
    const vogais = ['a', 'e', 'i', 'o', 'u']
    let contador = 0

    for (let char of palavra){
        if (vogais.includes(char)) {
            contador++            
        }
    }    
    return contador;
}

function investimento(capital,juros,tempo) {
        const decimal = juros / 100
        const montante = capital * Math.pow((1 + decimal, tempo))

        return montante.toFixed(2)
}

function contagem(palavra, caractere) {
    let contador = 0
    for (let char of palavra){
        if(char === caractere){
            contador++
        }
    }
    return contador
}

function ano(ano) {
    if((ano % 4 === 0 & ano % 100 !== 0) || (ano % 400 === 0)){
        return `${ano} é um ano bissexto.`
    } else {
        return `${ano} não é um ano bissexto.`
    }
}

function maiormenor(numeros) {
    if(numeros.length === 0){
        return "Array Null."
    }

    const menor = Math.min(...numeros)
    const maior = Math.max(...numeros)

    return `Menor número: ${menor} & Maior número: ${maior}.`
}

function loteria() {
    const numeros = new Set()

    while(numeros.size < 6){
        const numero = Math.floor(Math.random() * 60) + 1
        numeros.add(numero)
    }

    return Array.from(numeros)

    function acertos(usuario, sorteados) {
        
        const acertos = usuario.filter(numero => sorteados.includes(numero))
        return acertos.length
    }    
}

export {vogais, investimento, contagem, ano, maiormenor, loteria}