# JI23-DEV

JI23-DEVのポートフォリオサイト兼ブログです。

## 機能

- プロフィール
- ポートフォリオ
- ブログ
- 問い合わせ

## 構成

- React / Next.js / TypeScript / Vercel / microCMSでjamstackなCMS構築
- UIライブラリはMaterial UI

## ビルド環境

- [Node.JS](https://nodejs.org) >= 12.18.0
- [Yarn](https://yarnpkg.com) >= 1.16.0

## 環境変数

ビルド時に指定可能な環境変数の一覧です。

| 変数名                      | 説明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| NEXT_PUBLIC_X_API_KEY|microCMSのGET APIリクエストの際に必要な認証キー|
| NEXT_PUBLIC_X_WRITE_API_KEY|microCMSのPOST, PUT, PATCH, DELETE APIリクエストの際に必要な認証キー|
| NEXT_PUBLIC_SECRET_KEY            | ブログ記事のプレビュー時に利用するセキュリティーkey|
| NEXT_PUBLIC_END_POINT             | microCMSのエンドポイント                 |
| NEXT_PUBLIC_BASE_URL           | webページのBASE_URL             |

## スクリプト

`yarn` で実行可能なスクリプトの一覧です。

### dev

開発サーバーを立ち上げます。

### build

本番環境用のファイルをビルドします。


## 作者

[@JJ_1123_I](https://twitter.com/JJ_1123_I)
