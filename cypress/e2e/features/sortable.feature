# language: pt
@sortable @chromium
Funcionalidade: Ordenar itens com drag and drop
  Cenário: Reordenar uma lista previamente alterada usando arraste
    Dado que estou na página inicial do DemoQA
    Quando navego pela categoria "Interactions" e submenu "Sortable"
    E altero a ordem inicial da lista por drag and drop
    E ordeno os seis itens por drag and drop
    Então a ordem final deve ser One, Two, Three, Four, Five, Six
