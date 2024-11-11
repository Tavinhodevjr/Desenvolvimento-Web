//Exercício Individual Node - API MOCKADA - Lista 02
// Otávio Pampolha - RA 235040 - N1 Web Front-End

const express = require('express');
const app = express();
//usando o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//simulando um banco de dados
let escola = [
    {
        ra: '1',
        nome: "João",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '2',
        nome: "Maria",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '3',
        nome: "Pedro",
        disciplinas: [
            { codigo: "CIE101", nome: "Ciências", professor: "Prof. João" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" },
            { codigo: "EDF101", nome: "Educação Física", professor: "Prof. Carlos" }
        ]
    }
];

//Daqui para baixo, enunciados de um a cinco - Exercício 02 - Node API Mockada

//Exibindo todos os alunos
app.get('/alunos', (req, res) => {
    console.log('GET /alunos')
    res.json(escola)

})

//exibindo um aluno específico pelo RA
app.get('/alunos/:ra', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra)
    if (aluno) {
        res.json(aluno)
    } else {
        res.status(404).send('Aluno não encontrado.')
    }
})

//exibindo as disciplinas de um aluno específico
app.get('/alunos/:ra/disciplinas', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        res.json(aluno.disciplinas);
    } else {
        res.status(404).send('Aluno não encontrado.');
    }
})

//inserindo uma disciplina específica em um aluno específico
app.post('/alunos/:ra/disciplinas', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        const novaDisciplina = req.body;
        aluno.disciplinas.push(novaDisciplina);
        res.status(201).json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado.');
    }
});


//atualizando os dados de um aluno específico
app.put('/alunos/:ra', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        const dadosAtualizados = req.body;
        aluno.nome = dadosAtualizados.nome || aluno.nome;
        aluno.disciplinas = dadosAtualizados.disciplinas || aluno.disciplinas;
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado.');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}
);



