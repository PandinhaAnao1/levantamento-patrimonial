

OLHA A INOCENCIA DAS CRIANÇAS KKKKKKKK
CRIAMOS UMA TABELA CHAMADA ITEM ADICIONADO SEM TOMBO
QUANDO NÃO PRECISA POIS É SÓ DEIXAR O CAMPO TOMBO DE ITEM OPICIONAL
OU SEJA QUAL A NECESSIDADE DE CRIAR UMA TABELA A PARTE COM OS MESMO CAMPOS
COM OS MESMO RELACIONAMENTOS SENDO QUE ERA SO DEIXAR O CAMPO OPICIONALLLLLLLLLLLLL?????

# INDEX
<table>
    <tr>
        <th>Verbo</th>
        <th>Funcionalidade</th>
        <th>Rota</th>
    </tr>
    <tr>
        <td>GET</td>
        <td><a href="#listar_iventario">listar todos os dados</a></td>
        <td>INVENTARIO</td>
    </tr>
    <tr>
        <td>GET ID</td>
        <td><a href="#listar_iventario_id">lista um item especifico</a></td>
        <td>INVENTARIO</td>
    </tr>
    <tr>
        <td>POST</td>
        <td><a href="#cadastra_iventario">cria um novo inventario</a></td>
        <td>INVENTARIO</td>
    </tr>
    <tr>
        <td>GET ID SALA</td>
        <td><a href="#listar_iventario_id_sala">Na verdade essa rota vai ser uma query no get de salas</a></td>
        <td>INVENTARIO</td>
    </tr>
    <tr>
        <td>GET ID DE SALA</td>
        <td><a href="#listar_bens_da_sala">também vai ser uma query no get de itens</a></td>
        <td>SALAS</td>
    </tr>
    <tr>
        <td>POST</td>
        <td><a href="#auditar_bem">rota para poder auditar um bem.</a></td>
        <td>BEM</td>
    </tr>
    <tr>
        <td>POST</td>
        <td><a href="#cadastrar_bem">rota para cadastrar novos itens.</a></td>
        <td>BEM</td>
    </tr>
    <tr>
        <td>GET</td>
        <td><a href="#listar_usuario">rota para listar os usuários.</a></td>
        <td>USUARIO</td>
    </tr>
    <tr>
        <td>GET ID</td>
        <td><a href="#listar_usuario_id">rota para listar um usuário.</a></td>
        <td>USUARIO</td>
    </tr>
    <tr>
        <td>PATCH</td>
        <td><a href="#atualizar_usuario">rota para atualizar os dados de um usuário.</a></td>
        <td>USUARIO</td>
    </tr>
    <tr>
        <td>POST</td>
        <td><a href="#cadastrar_usuario">rota para cadastrar um novo usuário.</a></td>
        <td>USUARIO</td>
    </tr>
</table>

-- Esta faltando as rotas serem idependentes, cadastra, listar, atualizar pois se elas ficarem
depende de um csv o sistema fica inutilizado pois tem uma dependência muito forte de um arquivo

# Rotas:

## INVENTARIO:

### GET:

<a id="listar_iventario"></a>

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

<a id="listar_iventario_id"></a>

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

<a id="cadastra_iventario"></a>

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

<a id="listar_iventario_id_sala"></a>


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

TEM QUE ADICIONAR 
LISTAR AS SALAS
CRIAR UMA SALA
ATUALIZAR UMA SALA

### GET BENS DA SALAS:

<a id="listar_bens_da_sala"></a>

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

### POST PARA AUDITAR UM BEM POR ID:

<a id="auditar_bem"></a>

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

## USUARIO

### GET:

<a id="listar_usuario"></a>

#### Descrição:

Deve ser possivel listar quais usuario temos que poder ver quais usuario nosso sistema possui, para
podermos vizualizarmos as usuario de forma paginada.

#### Rota:
            
<div>http://localhost:3000/usuario"<div>

#### Saida:
```json
{
    "data": [
        {
            "_id": 3,
            "email": "marta.silva@example.com",
            "funcao": "coordenador",
            "status": true,
            "nome": "Marta Silva"
        },
        {
            "_id": 4,
            "email": "joao.pereira@example.com",
            "funcao": "desenvolvedor",
            "status": false,
            "nome": "João Pereira"
        },
        {
            "_id": 5,
            "email": "lucas.santos@example.com",
            "funcao": "analista",
            "status": true,
            "nome": "Lucas Santos"
        },
    ],
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "total": 1000,
    "total_pagina":10,
    "errors": []
}
```

### GET ID:

<a id="listar_usuario_id"></a>

#### Descrição:

Deve ser possivel listar quais usuario temos que poder ver quais usuario nosso sistema possui, para
podermos vizualizarmos as usuario de forma paginada.

#### Rota:
            
<div>http://localhost:3000/usuario/{id}"<div>

#### Saida:
```json
{
    "_id": 5,
    "email": "lucas.santos@example.com",
    "funcao": "analista",
    "status": true,
    "nome": "Lucas Santos",
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "errors": []
}
```

### POST:
<a id="cadastrar_usuario"></a>

#### Descrição:
Para o sistema funcionar devemos ser capaz de cadastrar um usuario para poder fazer
a audição dos itens e ultilizar o sistema.
#### Rota:
            
<div>http://localhost:3000/usuario/"<div>

#### Entrada:

```json
{
    "_id": 5,
    "email": "lucas.santos@example.com",
    "funcao": "analista",
    "status": true,
    "nome": "Lucas Santos",
}
```

#### Saida:

```json
{
    "_id": 5,
    "email": "lucas.santos@example.com",
    "funcao": "analista",
    "status": true,
    "nome": "Lucas Santos",
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "errors": []
}
```



### PATCH:
<a id="atualizar_usuario"></a>

#### Descrição:

O sistema deve ser capaz de atualizar um usuario alterando os atributo desse usario, vai
ser usada principalmente quando for alterar o status do usuario para inativo,
#### Rota:
            
<div>http://localhost:3000/usuario/"<div>

#### Entrada:

```json
{
    "_id": 5,
    "email": "lucas.santos@example.com",
    "funcao": "analista",
    "status": false,
    "nome": "Lucas Santos",
}
```

#### Saida:

```json
{
    "_id": 5,
    "email": "lucas.santos@example.com",
    "funcao": "analista",
    "status": false,
    "nome": "Lucas Santos",
    "error": false,
    "code": 200,
    "message": "Requisição bem sucedida.",
    "errors": []
}
```



