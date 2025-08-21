// importando express
const express = require("express");
// cria aplicação
const app = express();
app.use(express.json());
const porta = 3000;

const alunos = [
    
{

  "id": 1, 
  "nome": "Maria Silva", 
  "cpf": "12345678901", 
  "cep": "01234567", 
  "uf": "SP", 
  "rua": "Av. Central", 
  "numero": 123, 
  "complemento": "Apto 12" 
}
]

app.get("/alunos",(req,res) =>{
    res.json(alunos)
})

app.get("/alunos/:id",(req,res) =>{
    const id = parseInt(req.params.id)
    const aluno = alunos.find( (aluno => aluno.id === id))    
    if(aluno){
        res.json(aluno)
    }else{
        res.status(404).json(
            {erro: "Aluno não encontrado"}
        )
    }
   
})

app.post("/alunos", (req, res) => {
    const {nome} = req.body;
    const {cpf} = req.body;
    const {cep} = req.body;
    const {uf} = req.body;
    const {rua} = req.body;
    const {numero} = req.body;
    const {complemento} = req.body;

    if (!nome || nome.trim() === "") {
    return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    if (!cpf || cpf.length !== 11) {
        return res.status(400).json({ erro: "CPF deve conter exatamente 11 dígitos" });
    }

    if (alunos.some(a => a.cpf === cpf)) {
        return res.status(409).json({ erro: "CPF já cadastrado" });
    }

    if (!cep || cep.length !== 8) {
        return res.status(400).json({ erro: "CEP deve conter exatamente 8 dígitos" });
    }

    if (!uf || uf.length !== 2) {
        return res.status(400).json({ erro: "UF deve ter 2 letras" });
    }

    if (!rua) {
        return res.status(400).json({ erro: "Rua é obrigatória" });
    }

    if (numero === undefined || isNaN(numero)) {
        return res.status(400).json({ erro: "Número é obrigatório e deve ser numérico" });
    }


        const id = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1

        const novoAluno = {id,nome,cpf,cep,uf,rua,numero,complemento}
        console.log(novoAluno)

        alunos.push(novoAluno)

        res.status(201).json({
            mensagem: "Aluno Cadastrado com sucesso",
            aluno: novoAluno
        })
    
})

app.put("/alunos/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const {nome} = req.body;

    if(!nome){
        return res.status(400).json({
            erro: "Nome é obrigatório"
        })
    }  
    // filter  traz todos
    // find traz apenas o primeiro encontrado
    const aluno = alunos.find(aluno => aluno.id === id)

    if(!aluno){
         return res.status(400).json({
            erro: "Aluno não encontrado"
        })
    }

    console.log(aluno)
    console.log("Aluno nome", aluno.nome)

    aluno.nome = nome;
    res.json({
        mensagem: "Aluno Atualizado com sucesso"
    })

})

app.get("/", (req,res) => {
    res.send("Olá mundo");
})


app.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    alunos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Aluno deletado com sucesso!"
    });
});

app.listen(porta, () => console.log( `Servidor rodando http://localhost:${porta}/`));