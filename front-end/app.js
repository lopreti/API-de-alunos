console.log("app.js funcionando");

const API = 'http://localhost:3000/alunos'

async function carregarTabela() {
    try {
        const resposta = await fetch(API);
        const ALUNOS = await resposta.json();
        console.log(ALUNOS);

        const tbody = document.getElementById("tbody")

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"
        // setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = ALUNOS.map(a =>
            `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.cpf}</td>
                <td>${a.cep}</td>
                <td>${a.uf}</td>
                <td>${a.rua}</td>
                <td>${a.numero}</td>
                <td>${a.complemento}</td>
                <td> 
                <button class="botaoEditar"><a href="editar.html?id=${a.id}">Editar</a>
                </button> 
                <button class="botaoRemover" onclick="deletarAluno(${a.id})">Excluir</button></td>
            </tr>`
        ).join("");

    } catch (error) {
        console.error(error.message)
    }
}
    function deletarAluno(id) {
        if (confirm(`Tem certeza que deseja excluir o aluno de ID ${id}?`)) {
            fetch(`http://localhost:3000/alunos/${id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    alert(data.msg || "Aluno deletado!")
                    carregarTabela()
                })
                .catch(err => {
                    console.error(err)
                    alert("Erro ao deletar aluno!")
                });
        }
    }

carregarTabela()
