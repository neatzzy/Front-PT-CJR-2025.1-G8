# 📚 AvaliaProf — Plataforma de Avaliações de Professores - Grupo 8

Bem-vindo ao **AvaliaProf**, um ambiente online onde estudantes podem compartilhar avaliações sobre professores e disciplinas, interagir com comentários e tomar decisões mais informadas na hora da matrícula.

## ✨ Visão Geral

O AvaliaProf tem como objetivo principal oferecer uma **comunidade colaborativa** para que alunos possam:

- Avaliar professores e disciplinas com base em suas experiências;
- Comentar e interagir nas avaliações de outros usuários;
- Explorar avaliações para fazer escolhas mais conscientes durante a matrícula.

---

## 🛠️ Tecnologias Utilizadas

Este projeto é construído com uma stack moderna Full Stack:

### 🔙 Back-end

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- REST API com suporte a autenticação, autorização e validação de dados

### 🔜 Front-end

- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- Gerenciamento de estado, formulários, modais e notificações (toasts)

---

## 🧩 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Avaliação de professores e disciplinas
- ✅ Sistema de comentários e interações
- ✅ Listagem e busca de avaliações
- ✅ Filtros e ordenações por disciplina, professor e avaliação
- ✅ Modais de confirmação e notificações de sucesso/erro
- ✅ Painel pessoal para gerenciar avaliações e comentários

---

## 🧪 Conceitos Envolvidos

Durante o desenvolvimento do projeto, você terá contato com:

- RESTful API e operações CRUD
- Autenticação e autorização de usuários
- Validação de dados no back-end e front-end
- Gerenciamento de estado com ferramentas modernas (ex: Zustand, Context API, etc.)
- Integração de formulários reativos
- UI/UX com modais, loaders e toasts
- Boas práticas de versionamento e organização de projeto

---

## 🚀 Objetivo para os Trainees

É **altamente recomendado** que os trainees passem pelas **duas áreas do projeto (back e front)**, ganhando experiência completa como **Desenvolvedores Full Stack**.

Você vai sair desse projeto com uma base sólida em desenvolvimento web moderno, além de boas práticas de colaboração em projetos reais.

---

## 📦 Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL ou SQLite
- Yarn ou npm

### 1. Clone o repositório

```bash
git clone https://github.com/neatzzy/PT-CJR-2025.1-G8.git
cd PT-CJR-2025.1-G8
```

### 2. Instale as dependências

```bash
# Para back-end
cd server
npm install

# Para front-end
cd ../client
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` em `server/` com as variáveis necessárias, como a URL do banco de dados.

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/avaliaprof"
JWT_SECRET="sua_chave_secreta"
```

### 4. Rode as aplicações

```bash
# Inicie o back-end
cd server
npx prisma migrate dev
npm run start:dev

# Inicie o front-end
cd ../client
npm run dev
```

## 🌐 Deploy

O projeto está hospedado e disponível no (link)[```markdown

# 📚 AvaliaProf — Plataforma de Avaliações de Professores - Grupo 8

Bem-vindo ao **AvaliaProf**, um ambiente online onde estudantes podem compartilhar avaliações sobre professores e disciplinas, interagir com comentários e tomar decisões mais informadas na hora da matrícula.

> 🚀 **Acesse agora:**  
> [https://front-pt-cjr-2025-1-g8.onrender.com/](https://front-pt-cjr-2025-1-g8.onrender.com/)

---

## ✨ Visão Geral

O AvaliaProf tem como objetivo principal oferecer uma **comunidade colaborativa** para que alunos possam:

- Avaliar professores e disciplinas com base em suas experiências;
- Comentar e interagir nas avaliações de outros usuários;
- Explorar avaliações para fazer escolhas mais conscientes durante a matrícula.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna Full Stack:

### 🔙 Back-end

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- REST API com autenticação, autorização e validação de dados

### 🔜 Front-end

- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- Gerenciamento de estado, formulários, modais e notificações (toasts)

---

## 🧩 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Avaliação de professores e disciplinas
- ✅ Sistema de comentários e interações
- ✅ Listagem e busca de avaliações
- ✅ Filtros e ordenações por disciplina, professor e avaliação
- ✅ Modais de confirmação e notificações de sucesso/erro
- ✅ Painel pessoal para gerenciar avaliações e comentários
- ✅ Edição e exclusão de avaliações e perfil
- ✅ Página de perfil de usuário e professor
- ✅ Responsividade e experiência de usuário aprimorada

---

## 🧪 Conceitos Envolvidos

Durante o desenvolvimento do projeto, trabalhamos com:

- API e operações CRUD
- Autenticação e autorização de usuários
- Validação de dados no back-end e front-end
- Gerenciamento de estado com ferramentas modernas
- Integração de formulários reativos
- UI/UX com modais, loaders e toasts
- Boas práticas de versionamento e organização de projeto

---

## 🚀 Objetivo para os Trainees

É **altamente recomendado** que os trainees passem pelas **duas áreas do projeto (back e front)**, ganhando experiência completa como **Desenvolvedores Full Stack**.

Você vai sair desse projeto com uma base sólida em desenvolvimento web moderno, além de boas práticas de colaboração em projetos reais.

---

## 📦 Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL ou SQLite
- Yarn ou npm

### 1. Clone o repositório

```bash
git clone https://github.com/neatzzy/PT-CJR-2025.1-G8.git
cd PT-CJR-2025.1-G8
```

### 2. Instale as dependências

```bash
# Para back-end
cd server
npm install

# Para front-end
cd ../client
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` em `server/` com as variáveis necessárias, como a URL do banco de dados.

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/avaliaprof"
JWT_SECRET="sua_chave_secreta"
```

### 4. Rode as aplicações

```bash
# Inicie o back-end
cd server
npx prisma migrate dev
npm run start:dev

# Inicie o front-end
cd ../client
npm run dev
```

---

## 🌐 Deploy

O projeto está hospedado e disponível em:  
🔗 [https://front-pt-cjr-2025-1-g8.onrender.com/](https://front-pt-cjr-2025-1-g8.onrender.com/)

---

## 👨‍💻 Desenvolvido por

- [Rafael Ximenes](https://github.com/rmxvgit) (Orientador)
- [Élvis Miranda](https://github.com/neatzzy)
- [Guilherme Delmonte](https://github.com/guilhermedelm)
- [Márcio Vieira](https://github.com/marcinv07)
- [Vitor Guedes](https://github.com/VitorGuedes22)

---

Projeto finalizado com sucesso! 🎉

```````]

👨‍💻 Desenvolvido por
Rafael Ximenes (Orientador)
Élvis Miranda
Guilherme Delmonte
Márcio Vieira
Vitor Guedes
Projeto finalizado com sucesso! 🎉 ``````

## 👨‍💻 Desenvolvido por
- [Rafael Ximenes](https://github.com/rmxvgit) (Orientador)
- [Élvis Miranda](https://github.com/neatzzy)
- [Guilherme Delmonte](https://github.com/guilhermedelm)
- [Márcio Vieira](https://github.com/marcinv07)
- [Vitor Guedes](https://github.com/VitorGuedes22)
```````
