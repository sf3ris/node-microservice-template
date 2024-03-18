# My app

- [1. Setup & Installation](#1-setup--installation)
  - [1.1 Docker](#docker)
  - [1.2 Local node environment](#local-node-environment)
- [2. Linting and code quality](#2-linting-and-code-quality)

## 1. Setup & Installation

### Pre

#### Copy the environment file and update the values

```bash
$ cp .env.example .env
```

### Docker

#### Build Image

```bash
$ docker build -f Dockerfile.local -t my-app:local-dev .
```

#### Run container (with hot-reload)

```bash
$ docker run -d -p "3000:3000" -v "$PWD:/usr/src/app/" -v "/usr/src/app/node_modules" --name "my-app" my-app:local-dev
```

### Local node environment

To keep the node version aligned between contributor we use [volta](https://volta.sh/) as javascript tool manager

#### Install [volta](https://volta.sh/), go inside the project folder and run

```bash
$ volta install node
$ volta install yarn
```

#### Install project dependencies

```bash
(yarn) $ yarn install
```

```bash
(npm) $ npm i
```

#### Run the project (with hot-reload)

```bash
(yarn) $ yarn dev
```

```bash
(npm) $ npm run dev
```

## 2. Linting and code quality

To keep code style aligned between contributors we use:

- [eslint](https://eslint.org/): Javascript linter with [Ts recommended](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts) rules
- [eslint-ts-plugin](https://github.com/typescript-eslint/typescript-eslint): Typescript plugin for eslint
- [prettier](https://prettier.io/): Opinionated code formatted with following [style](.prettierrc)
- [commitlint](https://github.com/conventional-changelog/commitlint): Commit messages linter with [conventional-commits styleguide](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)

## 4. AWS CDK Stack Deploy

Go in the CDK folder (eg: iac/aws/) and run `NODE_ENV=development cdk deploy --profile {profile}` to deploy the CDK stack.  
Run `NODE_ENV=development cdk deploy --profile {profile}` for dry run.  

To change context of the deploy go into `./cdk.json` and update entries under "production" or "development" depending on the environment
