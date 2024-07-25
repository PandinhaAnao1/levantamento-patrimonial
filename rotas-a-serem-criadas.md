# Rotas:

## Inventarios:

<table>
    <tr>
        <th>Verbo</th>
        <th>Funcionalidade</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>listar todos os dados</td>
    </tr>
    <tr>
        <td>GET ID</td>
        <td>lista um item especifico</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>cria um novo inventario</td>
    </tr>
</table>

### GET:

#### Descrição:
Rota generica que retorna todos os inventarios paginados para o usuario.

#### Rota:
<div>http://localhost:3000/invetario<div>

#### Saída:
```json
{
    "data":[
        {
            "_id": 1,
            "nome": "Inventario do campus vilhena",
            "campus":10,
            "status": true,
            "expiracao":"2024-06-23",
            "created_at": "2024-06-10",
            "updated_at": "2024-06-10"
        },
        {
            "id":2,
            "nome":"Inventario do campus colorado audição",
            "campus":10,
            "status": true,
            "expiracao":"2024-06-23",
            "created_at": "2024-06-10",
            "updated_at": "2024-06-10"
        }
    ],      
    "error": false,
    "code": 200,
    "total_paginas":10,
    "pagina": 1,
    "quantidade": 300,
    "message": "Requisição bem sucedida.",
    "errors": [],
}
```
### GET ID:

#### Descrição:
Rota generica que retorna um objeto especifico por id.

#### Rota:
<div>http://localhost:3000/invetario/{id}<div>

#### Saída:
```json
{
  "data": {
    "_id": 1,
    "nome": "Inventario do campus vilhena",
    "campus":{
        "_id": 10,
        "nome":"Campus vilhena"
    },
    "status": true,
    "expiracao":"2024-06-23",
    "created_at": "2024-06-10",
    "updated_at": "2024-06-10"
  },
  "error": false,
  "code": 200,
  "message": "Requisição bem sucedida.",
  "errors": []
}
```


### POST:

#### Descrição:

Rota que cria um novo inventario com dados de um campos o nome e a data de duração

#### Rota:
<div>http://localhost:3000/invetario<div>

#### Entrada:

```json
{
    "nome": "Inventario do campus vilhena",
    "campus":10,
    "status": true,
    "expiracao":"2024-06-23",
    "created_at": "2024-06-10",
    "importacao_do_csv": "dados do csv"
}
```

#### Saida:

```json
{
  "data": {
    "_id": 1,
    "nome": "Inventario do campus vilhena",
    "campus":{
        "_id": 10,
        "nome":"Campus vilhena"
    },
    "status": true,
    "expiracao":"2024-06-23",
    "created_at": "2024-06-10",
    "updated_at": "2024-06-10"
  },
  "error": false,
  "code": 200,
  "message": "Requisição bem sucedida.",
  "errors": []
}
```

### GET POR ID DE INVENTARIO:


#### Descrição:
Rota que lista todas as salas a que existem dentro de um inventario de forma paginada.
#### Rota:
<div>http://localhost:3000/invetario/{id}/sala<div>

#### Saida:


```json
{
  "data": [
    {
        "_id": 1,
        "nome": "Sala ao lado do bebedouro",
        "campus": 10,
        "created_at": "2024-06-10",
        "updated_at": "2024-06-10"
    },
    {
        "_id": 2,
        "nome": "Sala de refeições",
        "campus": 10,
        "created_at": "2024-06-10",
        "updated_at": "2024-06-10"
    },
  ],
  "error": false,
  "code": 200,
  "message": "Requisição bem sucedida.",
  "errors": []
}
```


## Tela salas:

### GET POR ID DE INVENTARIO:


#### Descrição:
Rota que lista todas as salas a que existem filtrando por um inventario de forma paginada.
#### Rota:
<div>http://localhost:3000/sala?inventario="10"<div>

#### Dados:

```json
{
    "nome": "Inventario do campus vilhena",
    "campus":10,
    "status": true,
    "expiracao":"2024-06-23",
    "created_at": "2024-06-10",
    "importacao_do_csv": "dados do csv"
}
```
<ul>
    <li>id da sala</li>
    <li>nome da sala</li>
</ul>




# tela sala

prixima
auditar bem como encontrado ou não encotrado
4. patch-http://localhost:3000/sala/:idBem

o front deve retornar na rota o id do bem e no body os seguintes dados
- hist_estado_item
- hist_item_ocioso


buscar bens da sala 
6. get-http://localhost:3000/sala/:idSala
deve receber por dentro da rota o id da sala e a rota deve retornar os seguintes dados
- iten_id
- iten_nome
- iten_tombo

# tela auditar bens

busca os dados do bem 
7. get-http://localhost:3000/bem/:idBem
deve receber por dentro da rota o id do item e a rota deve retornar os seguintes dados
- iten_id
- iten_nome
- iten_tombo
- iten_descrição

audita bem passando o estado 
8. putch-http://localhost:3000/bem/:idBem
o front deve retornar o id do item e os seguintes dados
- hist_estado_item
- hist_item_ocioso


# proximas a serem feitas



# tela sala

prixima
auditar bem como encontrado ou não encotrado
4. patch-http://localhost:3000/sala/:idBem

o front deve retornar na rota o id do bem e no body os seguintes dados
- hist_estado_item
- hist_item_ocioso

# tela cadastrar bem


cria um bem passando todos os dados e o estado dele
9. post-http://localhost:3000/bemAdicionado  - Daniel

o front deve retornar os dados para adicionar o bem
- iten_nome
- iten_tombo
- iten_descrição
- hist_estado_item
- hist_item_ocioso

10. get-http://localhost:3000/conta - Adison 

Retorna todos as contas cadastradas
nome
cpf 
id

11. get-http://localhost:3000/conta/:id - 

retorna todos os dados de apenas uma conta

12. post-http://localhost:3000/conta - Levi

cria uma conta, você recebe todos os dados pelo body da requisição

13. patch-http://localhost:3000/conta

atualiza os dados de uma conta, deve receber todos os dados atualizados pelo body, e atualizar no banco a conta.


