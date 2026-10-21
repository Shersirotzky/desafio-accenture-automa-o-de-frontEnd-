<a id="inicio"></a>

<div align="center">

# DemoQA · Frontend Automation

**Desafio de QA Automation da Accenture**

JavaScript · Cypress · Cucumber / BDD · Page Objects

[Começar](#instalacao) · [Executar](#execucao) · [Cenários](#cenarios) · [Relatórios](#relatorios)

</div>

Automação dos cinco fluxos de frontend do [DemoQA](https://demoqa.com/), incluindo o bônus de 12 registros. Todos os cenários começam na página inicial e navegam pelos menus da aplicação.

<a id="requisitos"></a>

## Antes de começar

- **Node.js 24 LTS**, com npm.
- **Google Chrome** instalado para a execução padrão pelo terminal.
- **Internet** para instalar as dependências e acessar o DemoQA.

O modo interativo usa o Electron incluído no Cypress.

<a id="instalacao"></a>

## Instalação

**1.** Baixe ou clone o projeto e abra o terminal na pasta que contém `package.json`.

**2.** Instale as dependências e o navegador de testes:

```sh
npm ci
npx cypress install
```

**3.** Escolha um modo de execução abaixo.

<a id="execucao"></a>

## Executar os testes

### Acompanhar pela interface

```sh
npm run cy:open
```

No Cypress, escolha **E2E Testing → Electron → Start E2E Testing in Electron** e clique no arquivo `.feature` desejado. Use o botão **Rerun** para repetir o teste.

### Executar a suíte completa pelo terminal

```sh
npm test
```

Executa todos os cenários no Chrome, sem janela visível. O terminal mostra os resultados e o Cypress gera os relatórios ao terminar.

<details>
<summary><strong>Executar a suíte completa com a janela visível</strong></summary>

```sh
npm test -- --browser electron --headed
```

Os testes rodam automaticamente e o navegador fecha ao concluir.

</details>

<a id="cenarios"></a>

## Escolher um cenário

| Fluxo               | O que verifica                                                        | Comando                 |
| ------------------- | --------------------------------------------------------------------- | ----------------------- |
| **Practice Form**   | Dados aleatórios, upload `.txt`, confirmação e fechamento com Esc     | `npm run test:form`     |
| **Browser Windows** | Abertura de uma janela real, mensagem e fechamento                    | `npm run test:windows`  |
| **Web Tables**      | Criar, editar e excluir um registro; bônus com 12 registros dinâmicos | `npm run test:tables`   |
| **Progress Bar**    | Pausa antes de 25%, retomada até 100% e reset a zero                  | `npm run test:progress` |
| **Sortable**        | Drag and drop e validação da ordem One, Two, Three, Four, Five, Six   | `npm run test:sortable` |

<details>
<summary><strong>Executar apenas um fluxo com a janela visível</strong></summary>

```sh
npm run test:windows -- --browser electron --headed
```

Troque `test:windows` por qualquer comando da tabela acima.

</details>

<a id="relatorios"></a>

## Consultar os resultados

Após uma execução pelo terminal, abra `reports/cucumber-report.html` no navegador para consultar o relatório dos cenários e seus passos.

| Arquivo ou pasta               | Conteúdo                          |
| ------------------------------ | --------------------------------- |
| `reports/cucumber-report.html` | Relatório visual do Cucumber      |
| `reports/cucumber-report.json` | Resultados em JSON                |
| `reports/browser-window.png`   | Captura da nova janela real       |
| `cypress/videos/`              | Vídeos dos testes                 |
| `cypress/screenshots/`         | Capturas geradas em caso de falha |

Os relatórios refletem a última execução e ficam fora do versionamento. Consulte também o [registro de execução](docs/EXECUTION.md) e os [comportamentos conhecidos do DemoQA](docs/KNOWN_ISSUES.md), incluindo a remoção de vários registros com um clique no bônus.

Para executar a suíte pelo terminal:

```sh
env -u ELECTRON_RUN_AS_NODE npm test
```

</details>

[Voltar ao início ↑](#inicio)
