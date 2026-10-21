# Registro de execução

Execuções completas em **20/10/2026** (America/Fortaleza), contra o DemoQA público.

## Resultado atual

| Ambiente             | Cenários aprovados | Falhas | Ignorados | Duração dos specs           | Exit code |
| -------------------- | ------------------ | ------ | --------- | --------------------------- | --------- |
| Chrome 155 headless  | 6 de 6             | 0      | 0         | aproximadamente 37 segundos | 0         |
| Electron 146 visível | 6 de 6             | 0      | 0         | aproximadamente 37 segundos | 0         |

Ambiente: macOS arm64, Node 24.21.0, npm 11.19.0 e Cypress 16.2.0. Todos os passos dos relatórios Cucumber foram conferidos como aprovados.

```sh
env -u ELECTRON_RUN_AS_NODE npm test
env -u ELECTRON_RUN_AS_NODE npm test -- --browser electron --headed
```

O prefixo remove uma variável herdada do aplicativo Electron neste ambiente. Em um terminal sem essa variável, os comandos podem ser executados sem o prefixo.

## Cenários e escopo validado

| Cenário               | Resultado | Validação                                                                                                                   |
| --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Practice Form         | Passou    | Todos os campos e upload `.txt`, submissão, conferência de cada valor no popup, fechamento com Esc e formulário disponível. |
| Browser Windows       | Passou    | Clique em New Window, identificador de alvo novo, conteúdo da janela real, fechamento e página original preservada.         |
| Web Tables — CRUD     | Passou    | Criação, edição e exclusão do mesmo registro por e-mail único; comparação exata da tabela antes e depois.                   |
| Web Tables — bônus 12 | Passou    | Criação e validação dos 12 registros; ações de Delete até todos os criados desaparecerem; registros originais preservados.  |
| Progress Bar          | Passou    | Início, pausa abaixo de 25%, valor mantido na pausa, retomada a 100% e reset a zero.                                        |
| Sortable              | Passou    | Lista previamente alterada por drag and drop e depois ordenada em One, Two, Three, Four, Five, Six.                         |

Todos os fluxos começam em `https://demoqa.com/` e navegam pela categoria e pelo submenu.

## Ajustes em relação à execução inicial

- Practice Form fecha o popup com **Esc**, uma interação normal do modal. O botão Close continua com o defeito documentado em [KNOWN_ISSUES.md](KNOWN_ISSUES.md). O cenário atual não verifica esse botão nem exige que os campos sejam limpos após fechar o popup.
- O bônus verifica a remoção do conjunto criado e a preservação dos originais. Na versão atual do DemoQA, um clique em Delete pode remover todos os registros novos. O teste aceita essa remoção do conjunto e registra no log quantos registros desapareceram; não exige 12 exclusões individuais. O defeito de exclusão individual com vários registros novos continua documentado.
- Browser Windows não depende de `opener()`, metadado ausente na execução observada com Electron. Exige um alvo de navegador realmente novo após o clique. Detecção da janela e carregamento do conteúdo têm limites de 5 segundos cada e seguem imediatamente quando a condição é atendida.
- A tag do cenário alternativo foi normalizada para `@cenario_alternativo`, sem espaço.

Não há cenários ignorados, supressão de exceções da aplicação ou alteração do código do DemoQA. A validação de Progress Bar utiliza o relógio controlado do Cypress; Sortable utiliza eventos HTML5 de drag and drop.

## Verificações adicionais

- `npm run lint`: passou.
- `npm run format:check`: passou.
- 17 arquivos JavaScript inspecionados por parser: nenhum comentário no código.
- O README permanece restrito aos requisitos, instalação e comandos de execução.

## Artefatos

- `reports/chrome-headless/cucumber-report.html` e `.json`: suíte completa no Chrome.
- `reports/electron-headed/cucumber-report.html` e `.json`: suíte completa no Electron visível.
- `reports/cucumber-report.html` e `.json`: execução mais recente, sobrescritos em novas execuções.
- `reports/browser-window.png`: imagem da janela real.
- `cypress/videos/`: vídeos da execução mais recente.

Os artefatos gerados são ignorados pelo Git. As imagens em `docs/evidence/` preservam evidências históricas dos defeitos descritos em `KNOWN_ISSUES.md`; não representam falhas das execuções atuais.

## Limites da verificação

Windows, Linux e CI não foram executados. O Cypress emitiu um aviso ao tentar enviar artefatos antigos à lixeira neste macOS (`spawn Unknown system error -86`); ambas as execuções continuaram, geraram relatórios e terminaram com exit code 0. O Electron 146 foi identificado pelo Cypress como navegador depreciado.

Nenhum remoto GitHub foi criado, nenhum push foi feito e nada foi publicado.
