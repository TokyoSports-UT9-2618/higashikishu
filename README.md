# higashikishu-cycling

東紀州サイクリングサイト（Next.js App Router）です。

## 必須環境変数

未設定または不正値の場合、アプリは起動時にエラーで停止します。

### 必須（Cloudflare Pages でもこの3つのみ）

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_ACCESS_TOKEN`

### 任意（未設定でもビルド可能）

- `NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `CONTENTFUL_CPA_TOKEN`
- `EDIT_MODE_SECRET_KEY`
- `CONTACT_TO_EMAIL`（設定する場合はメールアドレス形式）

互換性のため、`CONTENTFUL_ENV` と `CONTENTFUL_CDA_TOKEN` も一時的に受け付けますが、今後は上記の新しい名前を使用してください。

例: `.env.local`

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_ACCESS_TOKEN=your_access_token

NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT=https://example.workers.dev/contact
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
CONTENTFUL_CPA_TOKEN=optional_preview_token
EDIT_MODE_SECRET_KEY=optional_edit_secret
CONTACT_TO_EMAIL=optional@example.com
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

Cloudflare Pages の Project Settings > Environment variables には、以下3つのみを環境ごと（Preview / Production）に設定してください。

### サーバー専用

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_ACCESS_TOKEN`

## 既存Spaceでの運用分離（推奨）

新しい Space を追加せず、既存 Space 内の Environment を分けて運用できます。

- 既存運用: 既存HP側 Environment（例: `master`）
- 東紀州運用: 東紀州専用 Environment（例: `higashikishu`）

このプロジェクトは `CONTENTFUL_ENVIRONMENT` で対象 Environment を切り替えます。

```env
CONTENTFUL_SPACE_ID=<既存SpaceのID>
CONTENTFUL_ENVIRONMENT=higashikishu
CONTENTFUL_ACCESS_TOKEN=<CDA token>
```

手順は `/Users/takahironochiseabirdinc./higashikishu/docs/CONTENTFUL_ENVIRONMENT_SETUP.md` を参照してください。

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
