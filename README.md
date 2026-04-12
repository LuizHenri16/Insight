# Insight - Sistema de Gestão Empresarial

O **Insight** é uma plataforma robusta de gestão voltada para o acompanhamento de empresas, sócios, investimentos e limites de crédito. Construído com tecnologias modernas como **Next.js 15**, **Supabase** e **TanStack Query**, o sistema oferece uma interface fluida, segura e eficiente para operações de CRUD e monitoramento de dados corporativos.

## 🚀 Principais Funcionalidades

- **Gestão de Empresas (Cadastros):** Controle completo de informações cadastrais de empresas (CNPJ, Razão Social, Contato, etc.).
- **Gestão de Sócios:** Vinculação e acompanhamento de sócios por empresa.
- **Painel de Crédito:** Monitoramento de ratings de crédito e indicadores como "CROT".
- **Módulo de Investimentos:** Gerenciamento de investimentos escolhidos pelo cliente.
- **Tabela Dinâmica (InsightTable):** Componente avançado com:
  - Pesquisa global e filtragem específica (CNPJ, Email, Conta, Empresa).
  - Paginação eficiente integrada ao Supabase.
  - CRUD completo via Modais (Visualizar, Editar, Excluir).
- **Autenticação Segura:** Sistema de login e controle de acesso via Supabase Auth (SSR).

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Banco de Dados & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Auth + SSR)
- **Estado & Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Estrutura do Projeto

```bash
├── app/                  # Rotas e Páginas (Next.js App Router)
│   ├── auth/            # Fluxo de autenticação (Login, Sign-up)
│   └── home/            # Dashboard principal e listagem de empresas
├── components/           # Componentes React reutilizáveis
│   ├── insight/         # Componentes específicos do domínio Insight (Table, Modals)
│   └── ui/              # Componentes base de interface
├── hooks/               # Custom hooks (Queries e Mutations com TanStack Query)
├── api/                 # API Routes (Next.js)
├── lib/                 # Configurações de bibliotecas (Supabase Client/Server)
├── utils/               # Funções utilitárias e definições de Tipos/Interfaces
└── public/              # Ativos estáticos (Imagens, Logos)
```

## ⚙️ Começando

### Pré-requisitos

- **Node.js** (v18+)
- **NPM**, **YARN** ou **PNPM**
- Conta no **Supabase**

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/insight.git
    cd insight
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Renomeie `.env.example` para `.env.local` e preencha com suas credenciais do Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=seu_projeto_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_anon_key
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O sistema estará disponível em `http://localhost:3000`.

## 📄 Documentação Técnica

### Integração com Supabase
O projeto utiliza `@supabase/ssr` para gerenciar a autenticação em Client e Server Components, garantindo que a sessão do usuário seja persistente e segura.

### Gerenciamento de Dados
Utilizamos o **TanStack Query** para:
- Cache inteligente de dados e revalidação automática após edições ou exclusões, reduzindo o número de requisições ao banco de dados.
- Estados de loading e erro centralizados.
- Paginação simplificada (através do hook `useEmpresa`).

### Componentes de Destaque
- **`InsightTable`**: Localizado em `components/insight/table.tsx`, é o coração do sistema, integrando busca parametrizada e controle de estado de paginação.
- **`ModalContent/`**: Estrutura modular para formulários de criação (`createForm.tsx`) e edição (`editForm.tsx`), facilitando a manutenção de campos complexos.

## 📄 Licença

Este projeto é de uso interno. Todos os direitos reservados.
