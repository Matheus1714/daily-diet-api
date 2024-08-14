## Daily Diet (API)

![banner](./.github/imgs/banner.png)

Esta API tem por objetivo fazer o gerenciamento de dieta de um usuário.

## Requisitos

### Funcionais

- [x] Deve ser possível criar um usuário
  - Rota `POST /users` com `nome`, `email` e `senha`
- [x] Deve ser possível identificar o usuário entre as requisições
  - Ao criar um usuário, é possível realizar a identificação por um cookie `userId` ou um token de acesso
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Rota `POST /meals` com `nome`, `descrição`, `data (yyyy-mm-dd)` e `hora (mm:ss)`, no qual o campo `dieta` deve ser opcional, se enviado como `true`, então refeição está dentro da dieta
  - No modelo entidade e relacionamento, um `Usuário` pode ter muitas `Dietas` (`1-n`)
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
  - Rota `PUT /meals`, alterando os campos `nome`, `descrição` e `dieta`
- [ ] Deve ser possível apagar uma refeição
  - Rota `DELETE /meals/:id`
- [ ] Deve ser possível listar todas as refeições de um usuário
  - As refeições podem ser listadas usando o id do usuário na seção
- [ ] Deve ser possível visualizar uma única refeição
  - Rota `GET /meals/:id`
- [ ] Deve ser possível recuperar as métricas de um usuário
  - Rota `GET /meals/summary`
  - A métrica terá `{ summary: { meals (number), dietMeals (number), offDietMeals (number), bestDietSequence (number) } }`
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
  - Isso depende da forma como eu decido que a requisição será feita

**Adicional**

Para deixar a atividade um pouco mais interessante, resolvi adicionar algumas coisas

- [x] Autenticação via JWT
  - Irei fazer uma autenticação básica usando JWT
- [x] Antes do usuário fazer qualquer operação nas refeições, será necessário fazer o auth em `POST /users/signin`
- [x] Depois que o usuário tiver autenticado, será criado um token de acesso (_access\_\_token_) armazenado em um cookie
- [x] O logout irá apenas apagar o _access\_\_token_

### Não Funcionais

- [ ] Aplicação deve se previnir de ataque via _SQL Injection_
- [ ] Usuário não pode acessar refeições ou informações sem antes passar por uma autenticação

## Comandos do Knex

| Comando                                    | Descrição                                         |
| ------------------------------------------ | ------------------------------------------------- |
| yarn knex -- migrate:make some-description | Cria uma _migration_ com as funções `up` e `down` |
| yarn knex -- migrate:latest                | Lê todas as _migrations_ e executa                |
| yarn knex -- migrate:rollback              | Desfaz a migration anterior                       |

## Modelo Entidade Relacionamento

## Referências

- [Descrição Desafio](https://efficient-sloth-d85.notion.site/Desafio-02-be7cdb37aaf74ba898bc6336427fa410)
- [Autenticação JWT](https://medium.com/@atatijr/token-based-authentication-with-fastify-jwt-and-typescript-1fa5cccc63c5)
- [Docs Knex](https://knexjs.org/guide/#node-js)
