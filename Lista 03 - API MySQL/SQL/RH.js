async function connect() {
    const mysql = require('mysql2/promise');
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Ot2004**',
        database: 'rhac1',
        port: 3306
    })
    console.log('Conectou no MySQL');
    global.connection = connection;
    return connection;
}
connect();

//retorna todos os cargos
async function getCargos(req, res) {
    const conn = await connect()
    const cargos = await conn.query('SELECT * FROM cargo')
    console.log(cargos[0])
    res.send(cargos[0])
}

//retorna todos os setores
async function getSetores(req, res) {
    const conn = await connect()
    const setores = await conn.query('SELECT * FROM setor')
    console.log(setores[0])
    res.send(setores[0])
}
//retorna todos os funcionários
async function getFuncionarios(req, res) {
    const conn = await connect()
    const funcionarios = await conn.query('SELECT * FROM funcionario')
    console.log(funcionarios[0])
    res.send(funcionarios[0])
}

//retorna setor com nome passado por querystring
async function getSetorQuery(req, res) {
    const conn = await connect()
    const nomeSetor = req.query.nome

    if (!nomeSetor) {
        return res.status(400).send('Nome do Setor é Obrigatório.')
    }
    try {
        const [setores] = await conn.query('SELECT * FROM setor WHERE nome = ?', [nomeSetor])
        if (setores.length === 0) {
            return res.status(404).send('Setor não encontrado')
        }
        res.json(setores[0])

    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar o setor')
    }
    finally {
        conn.end()
    }
}

//retorna funcionário com nome passado por id
async function getFuncionario(req, res) {
    const conn = await connect()
    let id = req.params.id
    const funcionarios = await conn.query('SELECT * FROM funcionario WHERE id = ?', id)
    res.send(funcionarios[0])
}

//retorna todos os funionários do cargo passado como parâmetro no body da requisição
async function getFuncionariosPorCargo(req, res) {
    const conn = await connect();
    const cod_cargo = req.params.cod_cargo

    if (!cod_cargo) {
        return res.status(400).send('O código do cargo é obrigatório.');
    }

    try {
        const [funcionarios] = await conn.query(
            'SELECT * FROM funcionario WHERE cod_cargo = ?', [cod_cargo]
        );
        if (funcionarios.length === 0) {
            return res.status(404).send('Nenhum funcionário encontrado para o cargo especificado.');
        }
        res.json(funcionarios)
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar funcionários.')
    }
    finally {
        conn.end()
    }
}

//retorna todos os cargos que não possuem funcionário
async function getCargosSemFuncionario(req, res) {
    const conn = await connect();

    try {
        const [cargos] = await conn.query(`
            SELECT c.* 
            FROM cargo c
            LEFT JOIN funcionario f ON c.cod_cargo = f.cod_cargo
            WHERE f.cod_cargo IS NULL
        `);
        if (cargos.length === 0) {
            return res.status(404).send('Nenhum cargo sem funcionário encontrado.')
        }
        res.json(cargos)
    }

    catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar cargos sem funcionário.')
    }

    finally {
        conn.end()
    }
}

//insere um funcionário
async function insereFuncionario(req, res) {
    const conn = await connect()
    const { nome, dataAdmissao, cod_cargo, cod_setor } = req.body;

    if (!nome || !cod_cargo || !cod_setor) {
        return res.status(400).send('Nome, Cargo e Setor são obrigatórios')
    }

    try {
        const result = await conn.query(
            'INSERT INTO funcionario (nome, data_admissao, cod_cargo, cod_setor) VALUES (?, ?, ?, ?)',
            [nome, dataAdmissao, cod_cargo, cod_setor]
        );
        console.log(result);

        res.status(201).send('Funcionário inserido com sucesso!')
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao inserir o funcionário.')
    }

    finally {
        conn.end();
    }
}

//atualiza um funcionário
async function atualizaFuncionario(req, res) {
    const conn = await connect()
    const { nome, dataAdmissao, cod_cargo, cod_setor } = req.body
    let id = req.params.id

    if (!id || !nome || !cod_cargo || !cod_setor) {
        return res.status(400).send('ID do Funcionário, Nome, Cargo e Setor são obrigatórios.')
    }

    try {
        const result = await conn.query(
            'UPDATE funcionario SET nome = ?, data_admissao = ?, cod_cargo = ?, cod_setor = ? WHERE cod_funcionario = ?',
            [nome, dataAdmissao, cod_cargo, cod_setor, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Funcionário não encontrado.')
        }
        console.log(result)

        res.status(200).send('Funcionário atualizado com sucesso!')
    }

    catch (error) {
        console.error(error)
        res.status(500).send('Erro ao atualizar o funcionário.')
    }

    finally {
        conn.end()
    }
}

//exclui um funcionário
async function excluiFuncionario(req, res) {
    const conn = await connect()
    let id = req.params.id
    const result = await conn.query('delete from cliente where id = ?', [id])
    res.send(result)
}

module.exports = {
    getCargos,
    getSetores,
    getFuncionarios,
    getSetorQuery,
    getFuncionario,
    getFuncionariosPorCargo,
    getCargosSemFuncionario,
    insereFuncionario,
    atualizaFuncionario,
    excluiFuncionario
}
