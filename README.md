# 📚 Book Manager

Aplicação full-stack para gerenciamento de livros, desenvolvida como solução para o desafio técnico **Book Manager Full-Stack**.

O sistema permite criar contas, realizar autenticação com JWT e gerenciar um catálogo de livros por meio de operações completas de CRUD.

---

## ✨ Funcionalidades

### Autenticação

- Cadastro de usuários
- Login com usuário e senha
- Senhas armazenadas utilizando BCrypt
- Geração de token JWT
- Rotas protegidas no backend
- Proteção de páginas no frontend
- Logout
- Exibição do usuário autenticado no header

### Gerenciamento de livros

- Listagem de livros
- Cadastro de novos livros
- Edição de livros
- Exclusão de livros
- Busca por título
- Busca case-insensitive
- Validação dos campos obrigatórios
- Tratamento de livro não encontrado

### Interface

- Layout moderno e responsivo
- Página de login
- Página de cadastro
- Listagem em cards
- Formulários de criação e edição
- Busca de livros
- Feedback de erros e carregamento
- Confirmação antes da exclusão

---

## 🛠️ Tecnologias utilizadas

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- Bean Validation
- JWT
- BCrypt
- Maven
- PostgreSQL

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Banco de dados

- PostgreSQL
- Estrutura versionada através de `schema.sql`

---

## 📁 Estrutura do projeto

```text
book-manager-desafio-full-stack/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/bookmanager/backend/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │           ├── application.properties
│   │           └── schema.sql
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Como executar o projeto

## Pré-requisitos

Antes de iniciar, é necessário possuir:

- Java 21
- PostgreSQL
- Node.js
- npm

---

# 🗄️ Banco de dados

Crie um banco PostgreSQL chamado:

```text
book_manager
```

Exemplo utilizando PostgreSQL:

```sql
CREATE DATABASE book_manager;
```

A estrutura das tabelas está definida em:

```text
backend/src/main/resources/schema.sql
```

O projeto utiliza as tabelas:

```text
users
books
```

---

# ⚙️ Configuração do backend

Abra:

```text
backend/src/main/resources/application.properties
```

Configure o acesso ao PostgreSQL conforme seu ambiente.

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/book_manager
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA <---------

spring.sql.init.mode=always

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

jwt.secret=${JWT_SECRET}
jwt.expiration=86400000
```
---

## 🔐 Configurando a chave JWT

Antes de iniciar o backend, configure a variável de ambiente `JWT_SECRET`.

### Windows PowerShell

```powershell
$env:JWT_SECRET="uma-chave-jwt-local-com-pelo-menos-32-caracteres"
```

A variável deve ser criada no mesmo terminal em que o backend será iniciado.

---

# ▶️ Executando o backend

Entre na pasta:

```powershell
cd backend
```

Execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Em Linux/macOS:

```bash
./mvnw spring-boot:run
```

Após iniciar, a API estará disponível em:

```text
http://localhost:8080
```

---

# 💻 Executando o frontend

Abra outro terminal e entre em:

```powershell
cd frontend
```

Instale as dependências:

```powershell
npm install
```

Inicie o servidor de desenvolvimento:

```powershell
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

---

# 🔐 Autenticação

O sistema utiliza autenticação baseada em **JWT**.

Fluxo:

```text
Usuário e senha
      ↓
POST /auth/login
      ↓
Validação da senha com BCrypt
      ↓
Geração do JWT
      ↓
Frontend armazena o token
      ↓
Authorization: Bearer <token>
      ↓
Spring Security
      ↓
Acesso às rotas protegidas
```

As rotas relacionadas aos livros exigem autenticação.

---

# 📡 Endpoints da API

## Autenticação

### Criar usuário

```http
POST /auth/register
```

Exemplo:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

Possíveis respostas:

```text
201 Created
400 Bad Request
409 Conflict
```

---

### Login

```http
POST /auth/login
```

Exemplo:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "eyJ..."
}
```

---

# 📚 Livros

Todas as rotas abaixo exigem:

```http
Authorization: Bearer <token>
```

---

### Listar livros

```http
GET /books
```

---

### Buscar livros por título

```http
GET /books?title=Hobbit
```

A busca ignora diferenças entre letras maiúsculas e minúsculas.

---

### Buscar livro por ID

```http
GET /books/{id}
```

Exemplo:

```http
GET /books/1
```

---

### Criar livro

```http
POST /books/create
```

Exemplo:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "description": "Romance distópico"
}
```

Campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| `title` | string | Sim |
| `author` | string | Sim |
| `year` | number | Não |
| `description` | string | Não |

---

### Atualizar livro

```http
PUT /books/{id}
```

Exemplo:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "description": "Descrição atualizada"
}
```

---

### Excluir livro

```http
DELETE /books/{id}
```

Em caso de sucesso:

```text
204 No Content
```

---

# 🌐 Rotas do frontend

| Rota | Descrição |
|---|---|
| `/login` | Login |
| `/register` | Cadastro de usuário |
| `/books` | Listagem e busca de livros |
| `/books/new` | Cadastro de livro |
| `/books/:id/edit` | Edição de livro |

As páginas internas são protegidas e exigem autenticação.

---

# 🧱 Arquitetura do backend

O backend foi dividido em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Controller

Responsável por receber as requisições HTTP e retornar as respostas da API.

### Service

Concentra as regras de negócio.

### Repository

Responsável pelo acesso ao banco através do Spring Data JPA.

### DTO

Utilizado para separar os dados recebidos/enviados pela API das entidades persistidas no banco.

### Security

Responsável pela autenticação JWT e integração com o Spring Security.

---

# 🔒 Segurança

Foram implementadas as seguintes medidas:

- Hash de senha utilizando BCrypt
- Autenticação JWT
- API stateless
- Rotas de livros protegidas
- Chave JWT configurada através de variável de ambiente
- DTO de resposta para não expor hash de senha
- Validação dos dados recebidos
- Tratamento de usuários duplicados

---

# 🗃️ Modelo de dados

## User

```text
id
username
password
```

`username` é único.

A senha é persistida utilizando hash BCrypt.

---

## Book

```text
id
title
author
year
description
```

`title` e `author` são obrigatórios.

---

# ✅ Requisitos atendidos

- [x] Java + Spring Boot
- [x] PostgreSQL
- [x] Cadastro de usuário
- [x] Login
- [x] JWT
- [x] Proteção das rotas de livros
- [x] Listagem de livros
- [x] Busca por título
- [x] Busca por ID
- [x] Cadastro de livros
- [x] Atualização de livros
- [x] Exclusão de livros
- [x] `schema.sql`
- [x] Frontend funcional
- [x] Armazenamento do token
- [x] Proteção das páginas internas
- [x] Formulários de criação e edição
- [x] Interface responsiva

---

# 🖥️ Interface

O frontend possui uma interface responsiva e foi desenvolvido para manter uma navegação simples e direta entre autenticação e gerenciamento dos livros.

Fluxo principal:

```text
Criar conta
     ↓
Login
     ↓
Lista de livros
  ↙      ↓       ↘
Criar   Editar   Excluir
     ↘    ↓    ↙
      Listagem
```

---

# 🧪 Testes manuais realizados

Durante o desenvolvimento foram validados os principais fluxos da aplicação:

- Cadastro válido de usuário
- Tentativa de cadastro com usuário duplicado
- Validação de campos obrigatórios
- Login válido
- Login inválido
- Acesso sem token
- Acesso com JWT válido
- Cadastro de livro
- Listagem de livros
- Busca por título
- Busca por ID inexistente
- Atualização de livro
- Exclusão de livro
- Tentativa de exclusão de livro inexistente

---

# 📌 Observações

Os livros representam um catálogo compartilhado entre os usuários autenticados.

A autenticação controla o acesso às operações do catálogo, mas os livros não possuem vínculo individual com um usuário específico.

---

# 👨‍💻 Autor

**Vinicius Lages**

Desenvolvido como solução para o desafio técnico Book Manager Full-Stack.