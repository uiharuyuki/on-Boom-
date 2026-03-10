JSONデータをindex.htmlにインライン同期するスキル。

## やること

1. `content/talents/index.json` を読み込む
2. `content/news/index.json` を読み込む
3. `index.html` 内の `window.__TALENTS_DATA__ = ...;` の行を、読み込んだJSONの内容で上書きする
4. `index.html` 内の `window.__NEWS_DATA__ = ...;` の行を、読み込んだJSONの内容で上書きする

## ルール

- JSONファイルの中身をそのまま1行のJSONとしてminifyして埋め込むこと
- `window.__TALENTS_DATA__ = ` と `window.__NEWS_DATA__ = ` で始まる行をそれぞれ置換する
- 置換後、正しくJSONとして埋め込まれていることをRead toolで確認する
- 変更がなければ「すでに最新です」と報告する
