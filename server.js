// importando express
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require ("cors");

// cria aplicação
const app = express();
app.use(express.json());
app.use(cors());
const porta = 3000;

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "senai",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit : 0
})

app.get("/alunos", async (req, res) => {
    try{
        const [retorno] = await conexao.query("SELECT * FROM alunos")
        res.status(200).json(retorno);
    }catch(err){
        console.log(err);
        res.status(500).json({erro: "Erro ao buscar alunos"})
    }
})

app.post("/alunos", async (req,res) =>{
    try {
        const {nome, cpf, cep= null,
            uf = null, rua = null,
            numero = null, complemento= null
        } = req.body;

        if(!nome || !cpf) return res.status(400).json({msg : "Nome e cpf são obrigatorio"})
        const sql = `
            INSERT INTO alunos (nome,cpf,cep, uf, rua , numero, complemento)
            VALUES  (?, ?, ?, ?, ?, ?, ?)`;

        const parametro = [nome, cpf, cep, uf, rua, numero, complemento]

        const [resultado] = await conexao.execute(sql,parametro)
        console.log(resultado)

        const [novo] = await conexao.execute(`SELECT * FROM alunos WHERE id =  ${resultado.insertId}`)
        res.status(201).json(novo[0]);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro : "Erro ao inserir alunos"});
    }
})

app.delete("/alunos/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const [existe] = await conexao.query("SELECT * FROM alunos WHERE id = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        const [resultado] = await conexao.execute("DELETE FROM alunos WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ msg: "Não foi possível deletar o aluno" });
        }

        res.status(200).json({ msg: "Aluno deletado com sucesso!" });

    } catch (err) {
        console.error("Erro ao deletar aluno:", err);
        res.status(500).json({ erro: "Erro no servidor ao deletar aluno" });
    }
});

app.put("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, cpf, cep = null, uf = null, rua = null, numero = null, complemento = null } = req.body;

    try {
        const [existe] = await conexao.query("SELECT * FROM alunos WHERE id = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        const sql = `
            UPDATE alunos 
            SET nome=?, cpf=?, cep=?, uf=?, rua=?, numero=?, complemento=? 
            WHERE id=?`;

        const parametros = [nome, cpf, cep, uf, rua, numero, complemento, id];
        const [resultado] = await conexao.execute(sql, parametros);

        if (resultado.affectedRows === 0) {
            return res.status(400).json({ msg: "Nenhuma alteração realizada" });
        }

        const [atualizado] = await conexao.query("SELECT * FROM alunos WHERE id = ?", [id]);
        res.status(200).json(atualizado[0]);

    } catch (err) {
        console.error("Erro ao atualizar aluno:", err);
        res.status(500).json({ erro: "Erro no servidor ao atualizar aluno" });
    }
});

app.get("/alunos/:id", async (req, res) => {
    const id = req.params.id
    try {
        const [retorno] = await conexao.query(`SELECT * FROM alunos WHERE id = ?`, [id])
        res.status(200).json(retorno);
    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: "Erro ao buscar alunos" })
    }
})
app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));