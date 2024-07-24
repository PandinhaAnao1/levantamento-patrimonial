# Rotas:

## Inventarios:

### GET:

#### Descrição:
Rota generica que retorna todos os inventarios paginados para o usuario.

#### Rota:
<div>http://localhost:3000/invetario<div>

#### Dados:
<ul>
    <li>id do iventario</li>
    <li>data do iventario</li>
    <li>campus do iventario</li>
    <li>nome do iventario</li>
    <li>concluido do iventario</li>
</ul>

### POST:

#### Descrição:

Rota que cria um inventario 

#### Rota:
<div>http://localhost:3000/invetario<div>

#### Dados:
<ul>
    <li>Nome do iventario</li>
    <li>Data do iventario</li>
    <li>Campus do iventario</li>
</ul>


### GET:

#### Descrição:
Rota que lista todas as salas a que existem em um inventario de forma paginada.
#### Rota:
<div>http://localhost:3000/invetario/sala/:id<div>

#### Dados:
<ul>
    <li>id da sala</li>
    <li>nome da sala</li>
</ul>



## Tela salas:



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


