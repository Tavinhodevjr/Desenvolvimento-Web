//Exercício Individual Node - Método GET - Lista 01
// Otávio Pampolha - RA 235040 - N1 Web Front-End

//Arquivo Index ("main")

const express = require('express');
const app = express();
const GET = require('./Lista 01 - Get/GET/GET.js');

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('BackEnd On');
});

// Rota vogais
app.get('/vogais/:palavra', (req, res) => {
    let palavra = req.params.palavra;
    res.send(`Número de vogais: ${GET.vogais(palavra)}`);
});

// Rota investimento
app.get('/investimento/:capital/:juros/:tempo', (req, res) => {
    let capital = parseFloat(req.params.capital);
    let juros = parseFloat(req.params.juros);
    let tempo = parseInt(req.params.tempo);
    res.send(`Montante final: R$ ${GET.investimento(capital, juros, tempo)}`);
});

// Rota contagem
app.get('/contagem/:palavra/:caractere', (req, res) => {
    let palavra = req.params.palavra;
    let caractere = req.params.caractere;
    res.send(`Número de ocorrências do caractere '${caractere}': ${GET.contagem(palavra, caractere)}`);
});

// Rota ano
app.get('/ano/:ano', (req, res) => {
    let ano = parseInt(req.params.ano);
    res.send(GET.ano(ano));
});

// Rota maiormenor
app.get('/maiormenor', (req, res) => {
    const numeros = req.query.numeros.split(',').map(Number);
    res.send(GET.maiormenor(numeros));
});

// Rota loteria
app.get('/loteria/:usuario', (req, res) => {
    let usuario = req.params.usuario.split(',').map(Number);
    let sorteados = GET.loteria();
    let acertos = GET.loteria.acertos(usuario, sorteados);
    res.send({
        numerosSorteados: sorteados,
        acertos: acertos
    });
});
