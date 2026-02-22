# Contentful インポートエラーガイド

## 発生したエラー
```
OrganizationAccessGrantRequired: 401
Message: The access token you sent does not have access to the requested resource
```
または
```
Access token invalid
```

## 主な原因
1. **トークンが対象 Space に対して権限を持っていない**
   - 別の Organization／Space 用に発行された Management Token を使用していた。
   - Delivery（読み取り）トークンを使用したため、書き込みがブロックされた。
2. **`.env.local` の設定ミス**
   - `CONTENTFUL_MANAGEMENT_TOKEN` が空、または古い/無効な文字列。
   - `CONTENTFUL_SPACE_ID` が間違っている、またはスペースが存在しない。
3. **環境変数が正しく読み込まれていない**
   - `dotenv` が `.env.local` を読み込めていない（パスミスやファイル名の違い）。

## 解決手順
1. **正しい Management Token を取得**
   - Contentful の UI → *Settings → API keys → Content management tokens*。
   - **対象 Space（例: `nxfitkrn7x84`）** と **Environment（`master`）** を選択し、**Space Admin** 権限が付与されたトークンを生成。
2. **`.env.local` を更新**
   ```env
   CONTENTFUL_SPACE_ID="nxfitkrn7x84"
   CONTENTFUL_ENVIRONMENT="master"
   CONTENTFUL_MANAGEMENT_TOKEN="<取得したトークン>"
   ```
   - 余計な引用符は付けず、文字列全体をそのまま記述。
3. **環境変数が正しく読み込まれることを確認**
   ```bash
   cat .env.local | grep CONTENTFUL_MANAGEMENT_TOKEN
   ```
   - 出力にトークンが表示されれば OK。
4. **スクリプトを再実行**
   ```bash
   npm run import:contentful
   ```
   - 正常にエントリが作成され、コンソールに `Importing X items for hk_route...` などが表示されるはず。
5. **権限が不明な場合は Organization レベルを確認**
   - Contentful の *Organization Settings → Roles* で、使用しているアカウントが **Space Admin** もしくは **Developer** ロールを持っているか確認。
   - 必要に応じて管理者にロール追加を依頼。

## 失敗したときの追加チェックポイント
- `curl -v -H "Authorization: Bearer <TOKEN>" https://api.contentful.com/spaces/<SPACE_ID>` を実行し、200 が返るか確認。401 が返る場合はトークンかスペース ID が不一致。
- `npm run dev` などの長時間実行中に `.env.local` を変更したら、サーバーを再起動して環境変数を再読み込み。

---
このガイドをプロジェクトのルートに置くことで、今後同様のエラーが出た際に迅速に対処できます。
