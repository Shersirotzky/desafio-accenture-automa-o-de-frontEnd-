# Accenture — QA Automation DemoQA

## Requisitos

- Node.js 24 LTS e npm.
- Google Chrome instalado para executar os testes pelo terminal.
- Acesso à internet para instalar as dependências e acessar o DemoQA.

Execute os comandos abaixo na pasta que contém o arquivo `package.json`.

## Instalação

```sh
npm ci
npx cypress install
```

## Executar todos os testes

Executa a suíte no Chrome sem abrir uma janela visível:

```sh
npm test
```

## Acompanhar os testes na interface

```sh
npm run cy:open
```

Na janela do Cypress, selecione **E2E Testing**, escolha **Electron**, clique em **Start E2E Testing in Electron** e selecione o arquivo `.feature` que deseja executar.

## Executar um fluxo específico

| Fluxo                              | Comando                 |
| ---------------------------------- | ----------------------- |
| Practice Form                      | `npm run test:form`     |
| Browser Windows                    | `npm run test:windows`  |
| Web Tables e bônus de 12 registros | `npm run test:tables`   |
| Progress Bar                       | `npm run test:progress` |
| Sortable                           | `npm run test:sortable` |

Para executar um fluxo com a janela do navegador visível, use Electron e a opção `--headed`:

```sh
npm run test:windows -- --browser electron --headed
```

Substitua `test:windows` pelo comando do fluxo desejado.

## Verificar o código

```sh
npm run lint
npm run format:check
```

## Erro ao iniciar Cypress em terminal de aplicativo Electron

Se aparecer `bad option: --smoke-test` ou `bad option: --no-sandbox`, no macOS/Linux execute o comando com o prefixo abaixo:

```sh
env -u ELECTRON_RUN_AS_NODE npm test
env -u ELECTRON_RUN_AS_NODE npm run cy:open
```
