# Aplicação CRUD

Uma aplicação CRUD completa construída com React + TypeScript (frontend) e Express + MySQL (backend).

## Pré-requisitos

- Node.js (versão 18.0.0 ou superior)
- MySQL Server
- Git

## Configuração e Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/RenanPamplona/CRUD-Exp-Cria.git
cd CRUD-Exp-Cria-main
```

### 2. Configuração do Banco de Dados
1. Abra o MySQL e execute o script SQL: sql.sql

Isso criará o banco de dados `crud_cria` e as tabelas necessárias.

### 3. Configuração do Backend
1. Navegue até o diretório da API:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a conexão do banco de dados em `db.js` se necessário:
```javascript
host: "localhost"
user: "root"
password: ""
database: "crud_cria"
port: 3306
```

4. Inicie o servidor backend:
```bash
npm start
```
A API estará rodando em http://localhost:8800

### 4. Configuração do Frontend
1. Abra um novo terminal e navegue até o diretório React:
```bash
cd ../react
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O frontend estará rodando em http://localhost:5173
