# LEVANTAMENTO REQUISITOS

## Requisitos Funcionais Obrigatórios

| IDENTIFICADOR | NOME                                     | REGRA DE NEGOCIO                                                                                  |
| :------------ | :--------------------------------------- | :------------------------------------------------------------------------------------------------ |
| RF-001        | Vizualizar itens do inventario           | O sistema deve ser capaz de fornecer os dados dos itens de um determinado setor para vizualização |
| RF-002        | Cadastrar novos comissionado             | O sistema deve permitir que inclua novos usuarios para poderem realizar as fiscalizações          |
| RF-003        | Atualiza comissionado existentes         | O sistema deve ser capaz de possibilitar a atualização dos usuarios existentes                    |
| RF-004        | Excluir comissionado                     | Faz necessario excluir usuarios ja existentes no sistema caso preciso                             |
| RF-005        | Vizualizar todos comissionado existentes | O sistema deve ser capaz de listar quais são os usuarios cadastrados na commisão                  |
| RF-006        | Cadastrar novos Inventário               | É preciso cadastrar novos inventários para poder ser feito o tombamento dos itens por sala        |
| RF-007        | Inspecionar item                         | É necessario que possa inspecionar cada item do inventario podendo ver os dados dele com detalhe  |
| RF-008        | Finalizar inventarios                    | É necessario que finalize o inventario não permita mais alterações                                |
| RF-009        | Relizar Login                            | É necessario que o comisario realize login na plataforma com email e senha                        |

## Requisitos Funcionais Desejáveis:

| IDENTIFICADOR | NOME                     | REGRA DE NEGOCIO                                                                                                 |
| :------------ | :----------------------- | :--------------------------------------------------------------------------------------------------------------- |
| RF-001        | Vizualização por grafico | O sistemas deve ser capaz de demonstrar quantos itens ja foram tombados e quantos faltam                         |
| RF-002        | Permisões                | O sistemas de gerenciar as permisões dos usuario sendo eles comisario e gerente                                  |
| RF-003        | Historico                | O sistemas deve possuir um historico de todos os itens que foram auditado e as pessoas responsaveis pela audição |
| RF-004        | Esqueceu a senha         | O comisario deve ser capaz de ultilizar o recurso de esqueceu senha se necessário                                |

## Requisitos Não Funcionais Obrigatórios:

| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
| :------------ | :--- | :--------------- |
| RF-001        | Segurança                | Garantir a segurança das informações do inventário, restringindo o acesso apenas a usuários autorizados através de autenticação segura. Armazenar e proteger as informações do inventário contra acessos não autorizados.                         |
| RF-002        | Usabilidade              | Fornecer uma interface do usuário intuitiva e de fácil utilização, mesmo para usuários sem experiência técnica. Oferecer feedback claro sobre a conclusão bem-sucedida de uma entrada de inventário.                                 |
| RF-003        | Disponibilidade          | Manter o sistema disponível 24/7, com tempo de inatividade mínimo planejado para a realização de manutenção.|
| RF-004        | Confiabilidade           | Implementar mecanismos que permitam ao sistema lidar com falhas de forma adequada, preservando a integridade dos dados do inventário. |
| RF-005        | Legislação e Conformidade| Assegurar que o sistema esteja em conformidade com as regulamentações e normas locais relacionadas à gestão de inventário e dados. |