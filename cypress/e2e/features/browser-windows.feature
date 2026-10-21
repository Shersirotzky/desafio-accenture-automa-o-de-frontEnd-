# language: pt
@windows @chromium
Funcionalidade: Nova janela real do navegador
  Cenário: Abrir, validar e fechar a janela criada por New Window
    Dado que estou na página inicial do DemoQA
    Quando navego pela categoria "Alerts, Frame & Windows" e submenu "Browser Windows"
    E clico em New Window
    Então uma nova janela real deve exibir a página de exemplo e ser fechada
