# VestAI

Seu personal stylist com Inteligência Artificial. Tire uma foto do seu look e receba dicas instantâneas de como melhorá-lo!

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E44AD?style=for-the-badge&logo=google&logoColor=white)

---

## Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Como Começar](#-como-começar)
- [Equipe](#-equipe)

---

## Sobre o Projeto

Já ficou em dúvida sobre o que vestir ou se seu look está combinando? Muitas pessoas passam por isso diariamente. O setor da moda é um gigante comercial, movimentando centenas de bilhões de dólares anualmente, o que demonstra a importância da aparência e do estilo no nosso dia a dia.

O **VestAI** nasceu para resolver essa questão, atuando como seu personal stylist de bolso. Utilizando o poder da IA do Google Gemini, nosso aplicativo analisa uma foto do seu look e fornece dicas e sugestões personalizadas para você se vestir com mais confiança e estilo.

---

## Funcionalidades

- **Análise de Look por Foto:** Faça o upload de uma foto sua e deixe nossa IA analisar cada detalhe.
- **Dicas de Estilo Personalizadas:** Receba um feedback construtivo sobre o que pode ser melhorado, como combinações de cores, peças e acessórios.
- **Interface Simples e Intuitiva:** Um fluxo de usuário direto para uma experiência rápida e agradável.

---

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Backend:** **Go (Golang)** para uma API robusta e de alta performance.
- **Frontend:** **React** para uma interface de usuário dinâmica e reativa.
- **IA:** **Google Gemini** para a análise de imagem e geração das dicas de estilo.
- **Containerização:** **Docker** para garantir um ambiente de desenvolvimento e produção consistente e de fácil configuração.

---

## Como Começar

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) e [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/vestai.git](https://github.com/seu-usuario/vestai.git)
    cd vestai
    ```

2.  **Configure e rode o Backend:**
    ```bash
    cd backend/
    docker-compose up --build
    ```
    O servidor backend estará rodando em `http://localhost:8080`.

3.  **Configure e rode o Frontend:**
    ```bash
    cd ../frontend/
    npm install
    npm run dev
    ```
    A aplicação estará acessível em `http://localhost:3000` (ou outra porta indicada no terminal).

---

## Equipe

Este projeto foi idealizado e construído por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/itspablomontes" title="Pablo Montes">
        <img src="https://avatars3.githubusercontent.com/u/169383657" width="100px;" alt="Pablo Montes"/><br>
        <sub><b>Pablo Montes</b></sub>
      </a>
      <br />
      <a href="https://linkedin.com/in/itspablomontes">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/vandilsonbrito" title="Vandilson Brito">
        <img src="https://avatars3.githubusercontent.com/u/83407152" width="100px;" alt="Vandilson Brito"/><br>
        <sub><b>Vandilson Brito</b></sub>
      </a>
      <br />
      <a href="https://www.linkedin.com/in/vandilson-brito-desenvolvedor-fullstack/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Dnreikronos" title="João Soares">
        <img src="https://avatars3.githubusercontent.com/u/37777652" width="100px;" alt="João Soares"/><br>
        <sub><b>João Soares</b></sub>
      </a>
      <br />
      <a href="https://linkedin.com/in/joao-roberto-lawall-soares-a58468242">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
  </tr>
</table>
