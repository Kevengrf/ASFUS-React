# Gemini Context File: Projeto ASFUS

Este arquivo serve como um resumo técnico para o assistente Gemini para restaurar o contexto do projeto rapidamente.

## 1. Visão Geral do Projeto
- **Tipo:** Aplicação Full-Stack.
- **Frontend:** React (SPA) com um painel de CMS.
- **Backend:** Node.js com uma API RESTful mock.
- **Status:** Funcional com dados em memória. O backend e o frontend se comunicam corretamente.

## 2. Contexto do Frontend
- **Build Tool:** Vite com React.
- **Módulos:** ES Modules (`"type": "module"` no `package.json` raiz).
- **Bibliotecas Chave:**
  - `react-router-dom`: Para roteamento, incluindo rotas aninhadas no painel admin.
  - `axios`: Para requisições HTTP, centralizadas em `src/api/apiService.js`.
  - `jwt-decode`: Para decodificar o payload de tokens JWT no frontend.
- **Gerenciamento de Estado:**
  - `src/context/AuthContext.jsx`: Centraliza toda a lógica de autenticação (login, logout, registro, dados do usuário). A sessão é persistida no `localStorage`.
- **Estrutura Principal:**
  - `/src/pages`: Contém as páginas principais, incluindo a subpasta `/admin` para as páginas do CMS.
  - `/src/components`: Componentes reutilizáveis (`Navbar`, `Modal`, `ProtectedRoute`).
- **Funcionalidade Principal:**
  - **CMS:** Em `/admin/dashboard`, com um layout de sidebar e `<Outlet />`. Gerencia Notícias, Convênios e Eventos com funcionalidade CRUD completa.

## 3. Contexto do Backend
- **Framework:** Node.js com Express.
- **Módulos:** **ES Modules**. Todos os arquivos usam a sintaxe `import/export`. Isso foi uma correção crítica.
- **Banco de Dados:** **Mock em memória**. Os dados são arrays dentro de cada arquivo de controlador (ex: `newsController.js`). **Os dados são resetados a cada reinicialização do servidor.**
- **Bibliotecas Chave:**
  - `express`: Servidor web.
  - `cors`: Essencial, habilitado para permitir a comunicação com o frontend.
- **Estrutura:**
  - Padrão `routes` e `controllers`.
  - `server.js`: Ponto de entrada que integra middlewares e rotas.
- **Usuários de Teste:**
  - Hardcoded em `backend/controllers/authController.js`.
  - O token JWT é gerado de forma mock, mas estruturalmente válido.

## 4. Como Executar
1.  **Backend:**
    ```bash
    cd backend
    npm install express cors
    node server.js
    ```
2.  **Frontend:**
    ```bash
    # No diretório raiz (react/)
    npm install
    npm run dev
    ```
