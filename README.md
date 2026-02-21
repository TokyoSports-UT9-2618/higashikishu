# higashikishu-cycling

東紀州サイクリングサイト（Next.js App Router）です。

## 必須環境変数

以下はすべて必須です。未設定または不正値の場合、アプリは起動時にエラーで停止します。

### サーバー専用（クライアント公開禁止）

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENV`
- `CONTENTFUL_CDA_TOKEN`
- `CONTENTFUL_CPA_TOKEN`
- `EDIT_MODE_SECRET_KEY`
- `CONTACT_TO_EMAIL`（メールアドレス形式）

### 公開変数（クライアント利用可）

- `NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

例: `.env.local`

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENV=master
CONTENTFUL_CDA_TOKEN=your_cda_token
CONTENTFUL_CPA_TOKEN=your_cpa_token
EDIT_MODE_SECRET_KEY=your_edit_secret
CONTACT_TO_EMAIL=admin@example.com

NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT=https://example.workers.dev/contact
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## ローカル開発手順

1. Node.js 20 以上を用意
2. 依存関係をインストール

```bash
npm install
```

3. `.env.local` を作成して必須環境変数を設定
4. 開発サーバー起動

```bash
npm run dev
```

5. 品質確認（任意）

```bash
npm run test
npx tsc --noEmit
npm run lint
```

## 編集モードの使い方

編集モードを有効化するURLクエリ:

`?edit=1&key=...`

- `edit=1`: 編集モード有効化フラグ
- `key`: `EDIT_MODE_SECRET_KEY` と一致する値

例:

`https://<your-domain>/?edit=1&key=<EDIT_MODE_SECRET_KEY>`

## Cloudflare Pages に設定する環境変数

Cloudflare Pages の Project Settings > Environment variables に、以下を環境ごと（Preview / Production）に設定してください。

### サーバー専用

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENV`
- `CONTENTFUL_CDA_TOKEN`
- `CONTENTFUL_CPA_TOKEN`
- `EDIT_MODE_SECRET_KEY`
- `CONTACT_TO_EMAIL`

### 公開変数

- `NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

## Cloudflare Pages 静的公開メモ

- Build command: `npm run build`
- Build output directory: `out`

### 一時対応（現状）

- `output: "export"` で静的出力するため、`src/app/*/[slug]/page.tsx` は一旦ビルド対象から外しています。
- 現在は一覧ページ中心で公開する前提です。

### Contentful 接続後に詳細ページを復活する手順

1. `src/app/hotel/[slug]/page.tsx` など詳細ページを復活
2. 各 `[slug]` ページに `generateStaticParams()` を実装
3. Contentful から slug 一覧を取得し、全パスを静的生成
4. `npm run build` で export 成功を確認して再デプロイ
