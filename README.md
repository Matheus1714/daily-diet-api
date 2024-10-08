## Daily Diet (API)

![banner](./.github/imgs/banner.png)

Esta API tem por objetivo fazer o gerenciamento de dieta de um usuário.

## Tecnologias

- `Node`
- `Typescript`
- `Fastify`
- `Knex`
- `Swagger`
- `Vitest`

## Requisitos

### Funcionais

- [x] Deve ser possível criar um usuário
  - Rota `POST /users` com `nome`, `email` e `senha`
- [x] Deve ser possível identificar o usuário entre as requisições
  - Ao criar um usuário, é possível realizar a identificação por um cookie `userId` ou um token de acesso
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Rota `POST /meals` com `nome`, `descrição`, `data (yyyy-mm-dd)` e `hora (mm:ss)`, no qual o campo `dieta` deve ser opcional, se enviado como `true`, então refeição está dentro da dieta
  - No modelo entidade e relacionamento, um `Usuário` pode ter muitas `Dietas` (`1-n`)
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
  - Rota `PUT /meals`, alterando os campos `nome`, `descrição` e `dieta`
- [x] Deve ser possível apagar uma refeição
  - Rota `DELETE /meals/:id`
- [x] Deve ser possível listar todas as refeições de um usuário
  - As refeições podem ser listadas usando o id do usuário na seção
- [x] Deve ser possível visualizar uma única refeição
  - Rota `GET /meals/:id`
- [x] Deve ser possível recuperar as métricas de um usuário
  - Rota `GET /meals/summary`
  - A métrica terá `{ summary: { meals (number), dietMeals (number), offDietMeals (number), bestDietSequence (number) } }`
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
  - Isso depende da forma como eu decido que a requisição será feita

**Adicional**

Para deixar a atividade um pouco mais interessante, resolvi adicionar algumas coisas

- [x] Autenticação via JWT
  - Irei fazer uma autenticação básica usando JWT
- [x] Antes do usuário fazer qualquer operação nas refeições, será necessário fazer o auth em `POST /users/signin`
- [x] Depois que o usuário tiver autenticado, será criado um token de acesso (_access\_\_token_) armazenado em um cookie
- [x] O logout irá apenas apagar o _access\_\_token_
- [ ] Fazer testes `end-to-end` da aplicação

### Não Funcionais

- [x] Aplicação deve se previnir de ataque via _SQL Injection_
- [x] Usuário não pode acessar refeições ou informações sem antes passar por uma autenticação

## Fluxo de Autenticação

Diagrama de sequência, desde a criação do usuário até a geração do token de acesso.

```mermaid
sequenceDiagram
Client ->> Server: POST /users [create user]
Client ->> Server: POST /users/signin [sign in]
Server -->> Client: return { accessToken }
```

## Execução do Projeto

Antes de iniciar o projeto, configure as variáveis ambientes. Basta copiar os arquivos `.env.example` e `.env.test.example`. Eles definem instâncias de desenvolvimento e produção.

```shell
NODE_ENV=... # development | test | production

DATABASE_CLIENT=... # sqlite | pg
DATABASE_URL=... # Local: Caminho do arquivo .db  | Remote: String de conexão

AUTH_SECRET=...
SALT_ROUNDS=...
COOKIE_SECRET=...
```

Foi considerado que para `production` seria usado `pg` e testes locais com `sqlite`, com isso, se atente as configurações de ambiete.

Após as variáveis configuradas, instale os pacotes com `yarn` e faça as migrations no banco de dados com o comando `yarn knex -- migrate:latest`.

Por fim, execute para testes locais

```
yarn dev
```

Para mais comandos, consulte a tabela abaixo:

| Comando    | Descrição                                          |
| ---------- | -------------------------------------------------- |
| yarn dev   | Executa o projeto em ambiente local                |
| yarn knex  | Executa o `knex` e comandos válidos junto com `--` |
| yarn lint  | Executa uma checagem de `lint` no projeto          |
| yarn build | Transforma o código TS para JS em `/build`         |
| yarn test  | Executa os testes existentes no projeto            |

## Comandos do Knex

| Comando                                    | Descrição                                         |
| ------------------------------------------ | ------------------------------------------------- |
| yarn knex -- migrate:make some-description | Cria uma _migration_ com as funções `up` e `down` |
| yarn knex -- migrate:latest                | Lê todas as _migrations_ e executa                |
| yarn knex -- migrate:rollback              | Desfaz a migration anterior                       |

## Definição de Entidades

**Modelo Entidade Relacionamento (MER)**

```mermaid
erDiagram
  users ||--o{ meals : have
```

**Definição das Entidades em DBML**

```dbml
Table users {
  id integer [primary key]
  code uuid
  name text
  email text
  hash text
  created_at datetime
  updated_at datetime
}

Table meals {
  id integer [primary key]
  user_id integer
  name text
  description text
  date datetime
  diet bool
  created_at datetime
  updated_at datetime
}

Ref: meals.user_id > users.id
```

## Documentação da API

Para acessar a documentação da API, basta executar o projeto e acessar a rota `/docs`.

## Referências

- [Descrição Desafio](https://efficient-sloth-d85.notion.site/Desafio-02-be7cdb37aaf74ba898bc6336427fa410)
- [Autenticação JWT](https://medium.com/@atatijr/token-based-authentication-with-fastify-jwt-and-typescript-1fa5cccc63c5)
- [Docs Knex](https://knexjs.org/guide/#node-js)
- [DBML](https://foliant-docs.github.io/docs/tutorials/db/dbml/)
