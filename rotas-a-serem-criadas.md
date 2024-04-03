tela Inventarios

get-http://localhost:3000/invetario
post-http://localhost:3000/invetario

tela salas

busca todas as salas que pertence ao invetario
get-http://localhost:3000/sala/:idInventario

tela sala

auditar bem como encontrado patch-http://localhost:3000/sala/bem/encontrado/:id
auditar bem como não encontrado patch-http://localhost:3000/bem/nao-encontrado/:id
buscar bens da sala get-http://localhost:3000/bem/:idSala

tela auditar bens

busca os dados do bem get-http://localhost:3000/bem/:id
audita bem passando o estado putch-http://localhost:3000/bem/:id

tela cadastrar bem

cria um bem passando todos os dados e o estado dele
post-http://localhost:3000/bem

