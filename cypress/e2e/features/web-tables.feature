# language: pt
@tables
Funcionalidade: Gerenciar registros em Web Tables
  Contexto:
    Dado que estou na página inicial do DemoQA
    Quando navego pela categoria "Elements" e submenu "Web Tables"
    E guardo os registros originais da tabela

  Cenário: Criar, editar e excluir o mesmo registro
    Quando crio um registro aleatório na tabela
    Então o registro criado deve exibir todos os dados corretos
    Quando edito os dados do mesmo registro
    Então o mesmo registro deve exibir os dados atualizados
    Quando excluo o mesmo registro
    Então apenas os registros originais devem permanecer

  @cenario_alternativo
  Esquema do Cenário: Criar registros dinamicamente e excluir todos os criados
    Quando crio <quantidade> registros aleatórios dinamicamente
    Então os <quantidade> registros criados devem constar na tabela
    Quando excluo todos os registros criados
    Então apenas os registros originais devem permanecer

    Exemplos:
      | quantidade |
      | 12         |
