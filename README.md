Atividade avaliativa 2 — Web + Mobile (Alunos)
Descrição
link do deploy no vercel: https://crud-steel-ten.vercel.app/
Aplicação de exemplo dividida em Web (React + Vite) e Mobile (Expo + React Native) que consome uma API REST de alunos ([https://proweb.leoproti.com.br/alunos](https://proweb.leoproti.com.br/swagger-ui/index.html)).
Funcionalidades: listar alunos, visualizar detalhes, adicionar, editar e excluir alunos. A versão web possui testes automatizados com Vitest e React Testing Library.

Endpoints esperados (padrão REST):
GET /alunos — lista
GET /alunos/:id — detalhar
POST /alunos — criar
PUT /alunos/:id — atualizar
DELETE /alunos/:id — excluir

Web (React + Vite)

Tecnologias
React
Vite
React Router DOM
Axios
React Bootstrap (UI)
Vitest + React Testing Library

Como executar
Abra um terminal na pasta web.

Instale dependências:
npm install
Rodar em desenvolvimento:
npm run dev

Build:
npm run build

Preview:
npm run previe

Testes
Para rodar testes:
npm run test
Os testes usam Vitest e mockam a camada api (axios). Exemplos já inclusos em src/tests/.

Web 
/ — Tela inicial (lista de alunos)
/alunos/novo — Formulário para adicionar
/alunos/:id — Tela de detalhes
/alunos/:id/editar — Formulário para editar

Mobile (Expo + React Native)
Tecnologias
Expo
React Native
React Navigation
Axios

Como executar
Abra um terminal na pasta mobile.
Instale dependências:
npm install
ou
expo install

Inicie o Metro:
npm run start
Em seguida use expo go no celular (scan QR) ou rode em emulador pelo npm run android / npm run ios.

Navegação (mobile)
Tela Home — lista e botão para novo
Tela Details — detalhes do aluno, editar/excluir/voltar
Tela Form — adicionar / editar

Créditos
Projeto criado como atividade avaliativa — base: programação web
API pública fornecida por: [proweb.leoproti.com.br](https://proweb.leoproti.com.br/swagger-ui/index.html)
