# Projeto ASFUS - Portal e CMS

Este repositório contém o código-fonte de uma Single Page Application (SPA) desenvolvida em React para o portal da ASFUS (Associação dos Funcionários da Saúde de Sete Lagoas), incluindo um painel administrativo completo para gerenciamento de conteúdo (CMS).

O projeto também inclui um backend mock em Node.js/Express para simular uma API RESTful, permitindo que o frontend seja totalmente funcional para fins de demonstração e desenvolvimento.

## ✨ Funcionalidades

### Portal do Associado (Frontend)
- **Página Inicial Dinâmica:** Apresentação da associação com slogans rotativos e um carrossel de imagens de fundo.
- **Pré-Cadastro:** Formulário moderno e dinâmico para novos associados, com suporte para adicionar múltiplos dependentes.
- **Login Seguro:** Páginas de login separadas para associados e administradores.
- **Dashboard do Associado:** Área logada onde o membro pode visualizar seus dados, gerenciar seus dependentes (CRUD completo) e ver agendamentos (placeholder).
- **Galeria de Fotos:** Uma página dedicada para exibir imagens gerenciadas pelo administrador.
- **Design Moderno:** Interface limpa, responsiva e acessível.

### Painel Administrativo (CMS)
- **Dashboard Seguro:** Acesso protegido por autenticação de administrador.
- **Aprovação de Membros:** Interface aprimorada com cards visuais para aprovar ou reprovar novos pré-cadastros.
- **Gerenciamento de Conteúdo (CRUD Completo):**
  - **Notícias:** Crie, edite e delete notícias para o portal.
  - **Convênios:** Gerencie a lista de convênios e benefícios oferecidos.
  - **Eventos:** Adicione e atualize os eventos da associação.
  - **Galeria:** Gerencie as fotos da galeria, com upload de arquivos.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18:** Biblioteca principal para a construção da interface.
- **Vite:** Build tool de alta performance para desenvolvimento.
- **React Router v6:** Para roteamento de páginas, incluindo rotas aninhadas e proteção de rotas.
- **Axios:** Cliente HTTP para comunicação com a API.
- **CSS Modules:** Para estilização encapsulada e livre de conflitos.
- **Hooks do React:** Utilização de `useState`, `useEffect`, `useContext` (para autenticação) e `useNavigate`.

### Backend (Mock)
- **Node.js:** Ambiente de execução do servidor.
- **Express.js:** Framework para a construção da API RESTful.
- **CORS:** Habilitado para permitir a comunicação entre o frontend e o backend.
- **JSON Web Tokens (JWT):** Para autenticação e autorização de usuários (associados e administradores).
- **Banco de Dados:** Simulado com arrays em memória. **Atenção:** os dados são resetados a cada reinicialização do servidor.

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### 1. Backend

Primeiro, inicie o servidor da API.

```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
node server.js
```
O servidor estará rodando em `http://localhost:3000`. Deixe este terminal aberto.

### 2. Frontend

Em um **novo terminal**, inicie a aplicação React.

```bash
# 1. Navegue até a pasta raiz do projeto (se não estiver nela)
# cd /caminho/para/ASFUS-React

# 2. Instale as dependências do frontend
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🧪 Credenciais para Teste

Use os seguintes dados para testar os diferentes níveis de acesso:

#### Usuário Administrador
- **Página:** `/admin/login`
- **Email:** `admin@asfus.com.br`
- **Senha:** `adminpassword`

#### Usuário Associado
- **Página:** `/login`
- **Email:** `associado@asfus.com.br`
- **Senha:** `associadopassword`

## 📜 Scripts Disponíveis

No diretório raiz do frontend, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento com Hot-Reload.
- `npm run build`: Gera a versão de produção otimizada do projeto na pasta `dist/`.
- `npm run lint`: Executa o linter para análise de código.
- `npm run preview`: Inicia um servidor local para visualizar a versão de produção.

## 💻 Estrutura do Projeto

O projeto é dividido em duas partes principais: `frontend` (aplicação React) e `backend` (API Node.js/Express).

### Frontend (`ASFUS-React/`)
- `src/`: Contém o código-fonte da aplicação React.
  - `api/`: Módulo para centralizar chamadas à API (`apiService.js`).
  - `assets/`: Imagens e outros recursos estáticos.
  - `components/`: Componentes React reutilizáveis (e.g., `Navbar`, `Footer`, `Carousel`).
  - `context/`: Context API para gerenciamento de estado global (e.g., `AuthContext.jsx`).
  - `hooks/`: Hooks personalizados (e.g., `useAuth.js`).
  - `pages/`: Componentes de página, representando diferentes rotas da aplicação.
    - `admin/`: Páginas específicas do painel administrativo.
    - `AssociateDashboardPage/`: Novo dashboard para associados.
    - `GalleryPage/`: Página pública da galeria.
- `public/`: Arquivos estáticos públicos.
- `package.json`: Gerenciamento de dependências e scripts do frontend.

### Backend (`ASFUS-React/backend/`)
- `controllers/`: Lógica de negócio e manipulação de dados para cada recurso da API.
- `routes/`: Definição das rotas da API e mapeamento para os controladores.
- `server.js`: Ponto de entrada do servidor Express.
- `package.json`: Gerenciamento de dependências e scripts do backend.

## 🔒 Autenticação e Autorização

O projeto utiliza JWT (JSON Web Tokens) para autenticação. Ao fazer login, o servidor gera um token que é armazenado no cliente e enviado em requisições subsequentes para rotas protegidas. O `ProtectedRoute` no frontend verifica a validade do token e as permissões do usuário (associado ou administrador) antes de renderizar o componente da rota.

## 🎨 Estilização

A estilização é feita utilizando CSS Modules, garantindo que os estilos sejam escopados localmente para cada componente, evitando conflitos de nomes e facilitando a manutenção. Variáveis CSS (`var(--primary-color)`) são usadas para manter a consistência do tema.
