# 📚Projeto CRUD de Alunos – Back-end com Express + Front-end com HTML/JS

Este projeto teve como objetivo desenvolver um sistema completo de CRUD (Create, Read, Update e Delete) utilizando tecnologias fundamentais do desenvolvimento web. O sistema permite o cadastro, consulta, edição e exclusão de alunos, integrando um back-end com Node.js e Express a um front-end simples em HTML e JavaScript.

## 🛠 Tecnologias Utilizadas
Node.js – Ambiente de execução JavaScript no lado do servidor
Express.js – Framework para criação de rotas e APIs REST
MySQL / MariaDB – Banco de dados relacional para armazenamento dos dados dos alunos
HTML5 – Estrutura das páginas web
JavaScript (Fetch API) – Comunicação com a API e manipulação do DOM no front-end


## 🚦 Rotas da API
Criar (POST): Cadastro de novos alunos
Ler (GET): Listagem de todos os alunos e busca por ID
Atualizar (PUT): Edição dos dados de um aluno existente
Excluir (DELETE): Remoção de um aluno do banco de dados

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
