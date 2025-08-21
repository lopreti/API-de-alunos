# 📚 API de Alunos

Esta API foi desenvolvida como parte de uma atividade acadêmica para gerenciar informações de alunos.  
Utiliza **Node.js** e **Express**, armazenando os dados em memória (sem banco de dados), com o objetivo de praticar operações **CRUD** (Create, Read, Update, Delete) e validações básicas.

## 🛠 Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript  
- **Express**: Framework para construção de APIs  
- **CORS**: Para permitir requisições de diferentes origens

## 🚦 Rotas da API
- **GET /alunos** → Retorna todos os alunos  
- **GET /alunos/:id** → Retorna um aluno específico pelo ID  
- **POST /alunos** → Cria um novo aluno  
- **PUT /alunos/:id** → Atualiza os dados de um aluno existente  
- **DELETE /alunos/:id** → Remove um aluno pelo ID  

## ✅ Validações Implementadas
- `nome`: Obrigatório e não pode estar vazio  
- `cpf`: Obrigatório, único e deve ter exatamente 11 dígitos  
- `cep`: Obrigatório e deve ter exatamente 8 dígitos  
- `uf`: Obrigatório, 2 letras (ex.: SP)  
- `rua`: Obrigatório  
- `numero`: Obrigatório e numérico  
- `complemento`: Opcional
  
## 🚀 Como Rodar
- git clone https://github.com/lopreti/API-de-alunos.git
- cd API-de-alunos
- npm install
- node server.js
- A API estará disponível em http://localhost:3000/alunos
- Usar o Thunder para testes

## 🧪 Exemplo de aluno
```json
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
