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
Rota que vai retornar o inventario paginado, isso para poder ter uma visualização ampla de todos os inventários
de forma paginada, o retorno não deve conter os subcampos populados para não pesar a rota e a API.

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
Rota que retorna os dados do inventario como campus nome status etc, proposito da rota é poder
detalhar mais sobre o inventario.

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

Rota que cria um novo inventario com dados de um campos o nome e a data de duração, tambem futuramente vai ser possivel 
inserir um csv com dados de um inventario, itens salas ect.

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

### GET SALAS POR ID DE INVENTARIO:


#### Descrição:
Rota que lista todas as salas a que existem dentro de um inventario de forma paginada, isso para poder tem uma visão 
ampla de todos as salas onde o usuário vai poder procurar quais salas ele quer selecionar.

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

## SALAS:
<table>
    <tr>
        <th>Verbo</th>
        <th>Funcionalidade</th>
    </tr>
    <tr>
        <td>POST</td>
        <td> <a href="#auditar_bem">rota para poder auditar um bem</a></td>
    </tr>
</table>


<a id="rota_bens_salas"></a>

### GET BENS DA SALAS:

#### Descrição:

Rota que lista todos os itens presentes em uma sala, os subcampos não devem vim populados pois 
isso pesa mais a rota, essa rota também deve ser pagina, com os atributos: total, paginas. Cada
pagina deve retornar a quantidade de 10 itens
#### Rota:
<div>http://localhost:3000/sala/{id}/bem"<div>

#### Saida:

```json
{
    "data": [
        {
            "_id": 2,
            "nome": "cadeira",
            "tombo": 0001,
            "responsavel": "Marcelo Augusto de Aguiar",
            "descricao": "Descrição do Estado: Cadeira com leve desgaste e arranhões."
        },
        {
            "_id": 3,
            "nome": "mesa",
            "tombo": 0002,
            "responsavel": "Ana Souza",
            "descricao": "Descrição do Estado: Mesa com manchas e leves arranhões."
        },
        {
            "_id": 4,
            "nome": "armário",
            "tombo": 0003,
            "responsavel": "Carlos Pereira",
            "descricao": "Descrição do Estado: Armário com portas soltas e desgaste nas bordas."
        }
    ],
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "total": 1000,
    "total_pagina":10,
    "errors": []
}
```

## BENS:

<a id="auditar_bem"></a>

### POST PARA AUDITAR UM BEM POR ID:

comentário: (Encontrado é um atributo sem função, pois se o item esta no histórico ele ja foi encontrado)

#### Descrição:
Auditar bem como encontrado ou não encontrado dentro de uma sala,
essa rota deve ser um post pois, quando um item é encontrado ele não necessariamente vai estar 
na sua sala de origem.
#### Rota:
            
<div>http://localhost:3000/bem"<div>

#### Entrada:
```json
{
    "sala":10,
    "item":11,
    "auditor":2,
    "estado":"Item apto para uso",
    "descricao":"O item foi encontrado na sala de manutenções",
    "ocioso":true,
    "encontrado": true
}
```

#### Saida:

```json
{
    "auditado":true,
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "errors": []
}
```

### COLOCAR A OPÇÃO NA TELA DOS ITENS ABRIR UMA CAMERA E POR ISSO,

Dentro das ideias futuras, podemos colocar uma forma de auditar um item pela a câmera, isso 
seria uma query dentro do get onde passamos o tombo, isso buscaria o item dentro do banco, retornando
todos os dados dentro da tela, facilitando a audição do item pro usuário.



### POST CADASTRAR UM BEM:

<a id="cadastrar_bem"></a>

#### Descrição:

O sistema deve ser capa de cadastrar um item dentro do sistema, esse bem vai ter uma sala, um bem com inventario e sala
sala.

#### Rota:
            
<div>http://localhost:3000/bem"<div>

#### Entrada:
```json
{
    "sala":10,
    "item":11,
    "auditor":2,
    "estado":"Item apto para uso",
    "descricao":"O item foi encontrado na sala de manutenções",
    "ocioso":true,
    "encontrado": true
}
```

#### Saida:

```json
{
    "auditado":true,
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "errors": []
}
```

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


