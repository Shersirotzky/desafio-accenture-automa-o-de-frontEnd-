# language: pt
@form
Funcionalidade: Cadastro no Practice Form
  Cenário: Enviar todos os campos com dados aleatórios válidos e fechar a confirmação
    Dado que estou na página inicial do DemoQA
    Quando navego pela categoria "Forms" e submenu "Practice Form"
    E preencho todos os campos do formulário com dados aleatórios válidos e um arquivo txt
    E submeto o formulário
    Então o popup deve apresentar todos os dados enviados
    Quando fecho o popup do formulário com a tecla Esc
    Então o formulário deve estar disponível novamente
