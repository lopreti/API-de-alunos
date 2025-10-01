const API = 'http://localhost:3000/alunos'

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")

const formAluno = document.getElementById("form-aluno");
formAluno.addEventListener("submit", salvar)

async function salvar(e) {
    e.preventDefault();
    console.log("Salvando aluno");

    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim();
    const cep = inputCep.value.trim();
    const uf = inputUf.value.trim();
    const rua = inputRua.value.trim();
    const numero = inputNumero.value.trim();
    const complemento = inputComplemento.value.trim();

    if (!nome || !cpf || !numero) {
        alert("Preencher campos obrigatórios");
        return;
    }

    const novoAluno = { nome, cpf, cep, uf, rua, numero, complemento };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            alert("Aluno cadastrado com sucesso!");
            window.location.href = "index.html";
        } else {
            console.log("Erro:", resposta.status);
            alert("Erro ao cadastrar aluno!");
        }
    } catch (error) {
        console.error(error);
    }

    if (typeof carregarTabela === "function") {
        carregarTabela();
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
