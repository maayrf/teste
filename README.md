# CUBI - KIP

> Gerenciador de Eficiência Energética

![Cubi][logo]

[logo]: https://senai-ist.visualstudio.com/f437cd09-794a-4a4d-9aec-e144a78eba22/_apis/git/repositories/eb58df89-2dae-4599-9a78-ed15645558cb/Items?path=%2Fimages%2Fcover.jpg&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=dev&download=false&resolveLfs=true&%24format=octetStream&api-version=5.0-preview.1 'Cubi - KIP'

---

# Iniciando a Aplicação

1.  **Setup Inicial da Máquina**

    1.  Deve conter o **Node 9.8.0^** instalado e recomendamos **yarn** para instalação das dependências

2.  **Clone o projeto**

    `git clone https://senai-ist.visualstudio.com/NUDES/_git/Equipe-CUBi`.

3.  **Instale as Dependências**

    `npm install` ou `yarn`

4.  **Suba o serviço de Mock do Websocket**

    `npm run mock-websocket` ou `yarn mock-websocket`

    Este comando vai subir o serviço de websocket para os Alertas e Dashboards funcionarem.

5.  **Rode a aplicação**

    `npm start` ou `yarn start`

    Este comando rodara o build em modo de `dev` e iniciar um servidor web, abrirá uma página para demonstrar bundle split da aplicação. Ao executar o webserver com este comando, o servidor estará escutando as mudanças no projeto. Toda vez que um arquivo for alterado ou adicionado o código será buildado novamente.

Caso queira fazer o Build da aplicação você poderá executar o comando `yarn build` e uma pasta chamado **build** será gerado, onde conterá os arquivos para subir ao servidor de produção.

A aplicação está utilizando o [Apiary](https://cubi3.docs.apiary.io/) para fazer o mock dos dados no ambiente de Dev, confira a [documentação](https://cubi3.docs.apiary.io/) para maiores detalhes

---

## Estrutura

```code
├── app                         // Pasta com os arquivos da aplicação
│   ├── ant-theme-vars.less     // Variáveis para alterar o estilo do ant-design
│   ├── assets                  // Assets  como imagens, fonts,  ou manifest.json
│   │   ├── antd-style
│   │   │   └── ...
│   │   ├── fonts
│   │   │   └── ...
│   │   ├── img
│   │   │   └── ...
│   │   └── manifest.json
│   ├── components              // Aqui ficam os componentes que não estão conectados com nenhum reducer
│   │   ├── Dashboard
│   │   │   └── index.js
│   │   ├── DashboardCardRealTime
│   │   │   ├── index.js
│   │   │   └── style.less
│   │   ├── DateRangePicker
│   │   │   ├── constants.js
│   │   │   ├── index.js
│   │   │   └── utils.js
│   ├── containers              // Componentes React Complexos (Páginas ou Ligados com Reducer)
│   │   ├── App                 // O Componente que inicializa a aplicação
│   │   │   ├── fileLoads.js
│   │   │   ├── index.js
│   │   │   ├── reducer.js
│   │   │   ├── selectors.js
│   │   │   └── style.less
│   │   ├── DashboardContainer  // Componete acompanhado com Container no final está conectado com uma reducer.
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── index.js
│   │   │   ├── reducer.js
│   │   │   ├── saga.js
│   │   │   └── selectors.js
│   │   ├── DashboardPage       // Componete acompanhado com Page no final ele é uma página
│   │   │   ├── components      // Quando há componentes que só serão utilizados naquela página, pode ficar dentro da pasta do componente
│   │   │   │   └── DashboardFilter
│   │   │   │       ├── index.js
│   │   │   │       └── style.less
│   │   │   ├── index.js
│   │   │   ├── loadable.js
│   │   │   └── style.less
│   ├── index.html              // Html que inicializa a aplicação
│   ├── index.js                // EntryPoint da aplicação
│   ├── layouts                 // Componentes utilizados como Layout, renderiza partes como Sidebar e Header que se repetem em todas as páginas
│   │   ├── AdminDefaultLayout
│   │   │   └── ...
│   │   ├── DefaultLayout
│   │   │   └── ...
│   │   └── PrivateDefaultLayout
│   │       └── ...
│   ├── reducers                // Função para criar uma Reducer sob Demanda
│   │   └── index.js
│   ├── store                   // Exporta a Store gerada a partir de uma initialState, e history.
│   │   └── index.js
│   └── utils                   // Pasta para colocar funções que podem ser reutilizada na aplicação inteira
│       ├── antd-notification.js
│       ├── constants.js
│       ├── formatNumber.js
│       ├── withLoginUser.js
│       └── ...
├── configs                     // Configuração do webpack
│   ├── _webpack.base.config.js // Configuração em comum entre dev e prod
│   ├── webpack.dev.config.js   // Configurações específicas do ambiente de Desenvolvimento
│   └── webpack.prod.config.js  // Configurações específicas do ambiente de Produção
├── generators                  // Pasta onde ficam as confirações de geradores feito com plop
├── mockWebsocket               // Pasta com o arquivo para simular o servidor de websocket
│   └── index.js
├── package.json
└── server                      // Pasta com os arquivos de configuração do servidor de desenvolvimento
```

---

## Generators

Este projeto possui gerador de código para otimizar o tempo de execução, criando o esqueleto de um componente, página, ou formulários a partir do terminal, para gerar um componente é apenas executar o seguinte comando, e aparecerá as opções disponíveis
`yarn generate`

| **Tipo de Componente** | **Descrição**                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Component**          | Componente Simples, podendo ser `stateless` ou classe                                                            |
| **Form**               | Componente de formulário baseado no ant-design, podendo digitar os valores do formulário para gerar o formulário |
| **Page Container**     | Container com reducer, saga, selector preparado para o CRUD básico                                               |
| **Form Container**     | Container com Formulário, que gera tanto o formulário quanto as requests, reducer e saga necessários             |
| **Pre Load HOC**       | Gerador de High Order Container de um detalhe de uma entidade                                                    |
| **List Container**     | Container que gera reducer, saga e selector de uma lista simples, baseado na Table do Ant-design                 |

---

## Tecnologias

| **Tecnologia**                                                    | **Descrição**                                                                                                                                                 | **Saiba mais**                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [React](https://facebook.github.io/react/)                        | Rápido, Client-Side Components.                                                                                                                               | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)                                                                                                                                                                                                                  |
| [Redux](http://redux.js.org)                                      | Gerenciamento de fluxos de dados unidirecionais. Suporte a time-travel debugging                                                                              | [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux), [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux), [Pluralsight Course](http://www.pluralsight.com/courses/react-redux-react-router-es6) |
| [Saga](https://redux-saga.js.org/docs/api/)                       | Gerenciador de side-effects normalmente utilizados para requisições assíncronas                                                                               |                                                                                                                                                                                                                                                                                                             |
| [React Router](https://github.com/reactjs/react-router)           | Biblioteca para criação de Rotas na aplicação                                                                                                                 | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)                                                                                                                                                                                                                  |
| [Babel](http://babeljs.io)                                        | Compila ES6 para ES5.                                                                                                                                         | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)                                                                                                        |
| [Webpack 4](https://webpack.js.org)                               | Empacota os pacotes do npm e nosso JS, cria bundles, faz o split, e é responsável por fazer o build. Responsável também pelo hot reloading do servidor local. | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)                                                                                                                                                            |
| [ESLint](http://eslint.org/)                                      | Lint JS. Reporta erros de sintaxes mais simples.                                                                                                              |                                                                                                                                                                                                                                                                                                             |
| [LESS](http://lesscss.org/)                                       | Pré processador para gerar as folhas de estilo (CSS).                                                                                                         |                                                                                                                                                                                                                                                                                                             |
| [ANT DESIGN - Framework](https://ant.design/docs/react/introduce) | Framework UI React mantido pelo alibaba.                                                                                                                      |                                                                                                                                                                                                                                                                                                             |
| [PLOP](https://plopjs.com/documentation/)                         | Gerador de código utilizando Handle Bars.                                                                                                                     |                                                                                                                                                                                                                                                                                                             |

---
