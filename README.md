# Projeto bevi-crud-frontend

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app) e é uma aplicação web para gerenciamento de CRUD (Create, Read, Update, Delete) de produtos.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina. Você pode verificar isso executando os seguintes comandos no terminal:

```bash
node -v
npm -v
```

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/LucasReisVillasBoas/bevi-crud-frontend
   cd bevi-crud-frontend
   ```

2. **Instale as dependências:**

   Use npm ou yarn para instalar as dependências do projeto. Execute um dos seguintes comandos:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. **Configurar variáveis de ambiente:**

   Para que o projeto funcione corretamente, você precisa adicionar um arquivo chamado `.env` na raiz do projeto com a seguinte linha:

   ```plaintext
   REACT_APP_API_URL=http://34.71.240.100/api
   ```

## Executando o Projeto

Para rodar o aplicativo em modo de desenvolvimento, execute o seguinte comando:

```bash
npm start
```

ou

```bash
yarn start
```

Isso iniciará o aplicativo e você poderá acessá-lo em [http://localhost:3000](http://localhost:3000). A página será recarregada se você fizer alterações no código, e você verá quaisquer erros de lint no console.

## Testes

Para executar os testes do projeto, utilize o seguinte comando:

```bash
npm test
```

ou

```bash
yarn test
```

Isso iniciará o runner de testes em modo interativo. Você poderá ver os resultados dos testes e interagir com o runner.

## Construindo o Projeto

Para criar uma versão otimizada do aplicativo para produção, execute:

```bash
npm run build
```

ou

```bash
yarn build
```

Isso criará a aplicação na pasta `build`, incluindo todos os arquivos necessários para implantação.

## Ejetar Configurações

Se você não estiver satisfeito com as escolhas de configuração do build, você pode ejectar a configuração a qualquer momento usando:

```bash
npm run eject
```

**Atenção:** Este é um processo irreversível. Uma vez que você ejectou, não poderá voltar atrás. Isso copiará todos os arquivos de configuração e dependências do build diretamente para o seu projeto.

## Aprenda Mais

Você pode aprender mais sobre o Create React App na [documentação oficial](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender sobre o React, confira a [documentação do React](https://reactjs.org/).
