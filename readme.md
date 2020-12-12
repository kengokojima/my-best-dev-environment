# My Best Dev Environment

内容は随時更新して参ります。

## インストール

```shell
yarn isntall
```

## ローカル環境起動

```shell
yarn dev
```

## ビルド

```shell
yarn build
```

## コンパイル環境

- TypeScript
- Sass
- Pug
- image

## 付帯処理

- ESlint
- Stylelint
- imagemin

## ライブラリ

- axios
- ress

## ディレクトリ構造

### Pug

```text
src
├── pug
│   ├── includes
│   │   ├── components 
│   │   ├── _layout.pug
│   │   └── _meta.pug
│   ├── index.pug
│   └── layout
│       ├── _footer.pug
│       ├── _header.pug
│       └── _main.pug
```

#### includes

読み込み専用のファイル群。\
メタタグや全体のレイアウトなど基本的にはここに配置。

#### components

再利用するパーツを配置。このファイルをどこで読み込んでも同じ様に表示される。\
ex.) `_button.pug`,`_card.pug`

### Sass

```text
├── scss
│   ├── components
│   ├── foundation
│   │   └── _base.scss
│   ├── global
│   │   ├── _index.scss
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   ├── layout
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   └── _main.scss
│   ├── projects
│   ├── style.scss
│   └── utilities
│       └── _index.scss
```

#### components

再利用するパーツを配置。\ 
基本的には同名pugファイルと対応している。

#### foundation

ベースとなるスタイルを配置。\
ex.) `_base.scss`

#### global

他のファイルで読み込むような汎用的なファイルを配置。\
ex.) `_mixin.scss`, `_variables.scss`

#### layout

基本となるパーツごとレイアウトスタイルを配置。\
ex.) `_header.scss`, `_footer.scss`

#### projects

ページ単位でしか使用しない特殊なスタイルファイルを配置。\
ex.) `_detail.scss`, `_about.scss`