# Contentful Environment 作成手順（既存Spaceを利用）

この手順は「新しい Space を作らずに、既存 Space 内で東紀州用の運用を分離する」ためのものです。

## 前提

- 既存の Contentful Space がある
- その Space で Environment 作成権限がある

## 1. 東紀州用 Environment を作成

1. Contentful で対象 Space を開く
2. 右上の Environment セレクタ（例: `master`）を開く
3. `Add environment` を選択
4. Name / ID を設定
- Name 例: `Higashikishu`
- ID 例: `higashikishu`
5. Base environment は通常 `master` を選択
6. 作成完了後、Environment が `higashikishu` に切り替え可能なことを確認

## 2. API token（CDA）を確認または作成

1. Space settings から API keys（Content Delivery API）を開く
2. 東紀州サイト用に使う key を作成または選択
3. Delivery API token を控える

注意:
- トークンの実値はリポジトリに保存しない
- `.env.local` は git 管理しない

## 3. Cloudflare Pages の環境変数を設定

Cloudflare Pages の Project Settings > Environment variables で、Preview / Production の両方に以下を設定:

- `CONTENTFUL_SPACE_ID` = 既存 Space ID
- `CONTENTFUL_ENVIRONMENT` = `higashikishu`
- `CONTENTFUL_ACCESS_TOKEN` = Delivery API token

## 4. ローカル確認

`.env.local` 例:

```env
CONTENTFUL_SPACE_ID=xxxxxxxx
CONTENTFUL_ENVIRONMENT=higashikishu
CONTENTFUL_ACCESS_TOKEN=xxxxxxxx
```

確認コマンド:

```bash
npm run build
```

## 5. 運用ルール（入口分離）

- 東紀州担当者には `higashikishu` Environment を案内
- 既存HP担当者は既存 Environment（例: `master`）を利用
- ブックマークURLも Environment ごとに分けて配布

これで 1 Space のまま、運用の入口とデータを実務上分離できます。

