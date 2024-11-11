const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(bodyParser.json());

//conexão com o banco de dados
const Cliente = require('./BancoDeDados/Cliente');

//configurar o CORS
const cors = require('cors');
app.use(cors());

//retornando todos os cargos
app.get('/cargos', RH.getCargos);
//retornando todos os setores
app.get('/setores', RH.getSetores);
//retornando todos os funcionários
app.get('/funcionarios', RH.getFuncionarios);
//retornando setor passado como querystring
app.get('/setor', RH.getSetorQuery);
//retornando funcionario pelo id
app.get('/funcionarios/:id', RH.getFuncionario);
//retorando todos os funcionários pelo cargo
app.get('/funcionarios/cargo/:cod_cargo', RH.getFuncionariosPorCargo);
//retornando todos os cargos sem funcionario
app.get('/cargos/sem-funcionario', RH.getCargosSemFuncionario);
//inserindo um funcionario
app.post('/funcionario', RH.insereFuncionario);
//atualizando um funcionario
app.put('/funcionario/:id', RH.atualizaFuncionario)
//deletando um funcionario
app.delete('/funcionario', RH.excluiFuncionario);


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});