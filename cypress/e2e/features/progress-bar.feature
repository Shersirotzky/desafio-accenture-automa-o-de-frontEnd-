# language: pt
@progress
Funcionalidade: Controle da barra de progresso
  Cenário: Pausar antes de 25 por cento, retomar e resetar
    Dado que estou na página inicial do DemoQA
    Quando navego pela categoria "Widgets" e submenu "Progress Bar"
    E inicio e paro a barra antes de 25 por cento
    Então o valor deve ser menor ou igual a 25 por cento e permanecer parado
    Quando retomo a barra até 100 por cento
    E reseto a barra de progresso
    Então a barra deve voltar a zero
