# Defeitos observados no DemoQA

## Practice Form: botão Close não fecha a confirmação

Observado em **20/10/2026**, Chrome 155 headless, Cypress 16.2.0, Node 24.21.0, macOS arm64.

### Reprodução

1. Abrir `https://demoqa.com/`.
2. Acessar **Forms → Practice Form**.
3. Preencher os campos, selecionar estado/cidade, anexar `upload.txt` e submeter.
4. Conferir o popup de confirmação.
5. Clicar em **Close**.

**Esperado:** fechar o popup e disponibilizar o formulário vazio.

**Obtido:** a aplicação lança `TypeError: Lr.findDOMNode is not a function`; o popup permanece aberto.

O teste validou cada linha do popup (nome, e-mail, gênero, telefone, nascimento, assuntos, hobbies, arquivo, endereço, estado e cidade) antes de falhar no fechamento.

### Diagnóstico

O bundle público servido durante a inspeção, `/assets/index-D_rDx8ml.js`, contém um handler de `#closeLargeModal` que chama `Lr.findDOMNode(ce).reset()` antes de atualizar o estado responsável por fechar o popup. A exceção interrompe esse handler. O bundle também identifica React 19.2.0. Este diagnóstico se refere à versão observada, que pode mudar no site público.

### Tratamento na automação

O cenário atual fecha o popup com a tecla **Esc**, usando o comportamento normal do modal, e valida que ele desapareceu e que o formulário está disponível. O desafio exige fechar o popup, sem exigir o botão Close ou a limpeza dos campos. O defeito específico do botão Close permanece registrado neste documento; essa interação não é exercitada pelo cenário atual.

As evidências da execução inicial com clique em Close foram preservadas. Para reproduzir o defeito, siga os passos manuais acima. `npm run test:form` executa o fluxo atual com Esc.

Screenshot preservado: [falha ao fechar o popup](evidence/practice-form-close.png).

## Web Tables: excluir um registro novo descarta outros registros novos

Observado no mesmo ambiente e data do caso anterior.

### Reprodução

1. Abrir a página inicial e acessar **Elements → Web Tables**.
2. Selecionar **Show 50**.
3. Criar 12 registros diferentes; a tabela passa de 3 para 15 linhas.
4. Validar todos os registros criados.
5. Pesquisar pelo e-mail do primeiro registro novo e clicar em **Delete** na linha correspondente.
6. Limpar a pesquisa e conferir os registros restantes.

**Esperado:** 14 registros, mantendo os outros 11 novos e os 3 originais.

**Obtido:** permanecem somente os 3 registros originais. Os 12 registros novos desaparecem após a exclusão de apenas um deles.

### Diagnóstico

A inspeção do bundle público indica que as colunas da tabela são memoizadas com dependências vazias e capturam o handler de exclusão da renderização inicial. Esse handler filtra o estado de registros capturado naquela renderização. Isso explica o retorno aos registros originais quando se exclui uma linha nova; é um diagnóstico por inspeção do código público, além do comportamento observado no teste.

### Tratamento na automação

O cenário CRUD mantém a exigência de remover somente o registro selecionado, comparando a tabela anterior com o resultado após a exclusão.

O bônus atual verifica o resultado final pedido pelo desafio: os 12 registros são criados e conferidos, todos os registros criados devem ser removidos por ações de Delete e os registros originais devem ser preservados. Após cada clique, o cenário consulta quais registros criados ainda existem e continua até não restar nenhum. Se um clique remover mais de um registro criado, isso é registrado no log do Cypress.

O bônus não exige mais 12 exclusões individuais: aceita que um clique remova vários registros do conjunto criado. Isso permite validar o resultado final na versão atual do DemoQA, mas não comprova a correção da exclusão individual quando existem vários registros novos. O defeito da aplicação continua presente e registrado. Para reproduzi-lo, siga os passos manuais acima; `npm run test:tables` executa o CRUD e o bônus com o escopo descrito.

Screenshot preservado: [falha na preservação das demais linhas](evidence/web-tables-delete.png).
