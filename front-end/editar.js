const urlParametro = new URLSearchParams(window.location.search);
const id = urlParametro.get("id");

const inputID = document.getElementById("id");
if (inputID) {
    inputID.value = id; 
}

const API = 'http://localhost:3000/alunos';

async function carregarAluno() {
    if (!id) {
        alert("Nenhum aluno selecionado");
        window.location.href = "index.html"
        return;
    }

    try {
        const resposta = await fetch(`${API}/${id}`);
        const ALUNO = await resposta.json();
        console.log("Aluno carregado:", ALUNO);

        document.getElementById("nome").value = ALUNO[0].nome;
        document.getElementById("cpf").value = ALUNO[0].cpf;
        document.getElementById("cep").value = ALUNO[0].cep;
        document.getElementById("uf").value = ALUNO[0].uf;
        document.getElementById("rua").value = ALUNO[0].rua;
        document.getElementById("numero").value = ALUNO[0].numero;
        document.getElementById("complemento").value = ALUNO[0].complemento;

    } catch (erro) {
        console.error("Erro ao carregar aluno:", erro);
    }
}

carregarAluno();

const formAluno = document.getElementById("form-edicao");
formAluno.addEventListener("submit", atualizar);

async function atualizar(e) {
    e.preventDefault();

    const alunoAtualizado = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        uf: document.getElementById("uf").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value
    };

    console.log("Dados para atualizar:", alunoAtualizado);

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoAtualizado)
        });

        if (resposta.ok) {
            alert("Aluno atualizado com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Erro ao atualizar aluno!");
        }
    } catch (erro) {
        console.error("Erro na atualização:", erro);
    }
}

function Limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("complemento").value = "";
}