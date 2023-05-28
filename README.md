# compass 課題

## プロジェクト一式

- この Github リポジトリに全てのソースコードが入っています。
- 使ったライブラリ/フレームワークは React,Vite,Axios,Tailwind CSS,Headless UI, React Router です  
  Next.js を使おうか迷いましたが、まだ使ったことがなかった Vite にしました
- ページ構成は以下です

```
home/
　├ account
　│　└ student （リンクなし）
　│　└ teacher （今回確認するページ）
```

## アプリケーションを端末で動作するための手順

1. この Github リポジトリを clone します
2. yarn install、yarn dev をしてローカルホストを立ち上げます
3. 基本的にクローンしたそのままの状態で正常な時の動作は確認できると思います

以下に異常系の動作など意図的にコードを変えて動作を確認する項目について記載します。

- 非同期処理実行時のローダー  
  遅延などをかけないと速すぎてローダーを確認できないため、以下のように`src/lib/api/api.ts`ファイルの`fetchFacilitators`関数を変更して確認します。

```ts
.then((response) => {
    return response.data;
})
```

↓

```ts
.then((response) => {
    return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 2000); // ローダー表示のため2秒遅らせる
    });
})
```

- 通信エラーが発生した場合のポップアップダイアログ表示
  `src/lib/api/api.ts`ファイルの`endPoint`変数の文字列を存在しない URL に適当に変えます。
  今回の場合では、先生のテーブル取得時と先生の総件数を取得する時（主に API 使用時）にエラーが発生した場合にダイアログを出すようにしています。

- 表示するデータがない場合
  検索に引っかからない単語を入力して検索すると`src/components/Status/NoData.tsx/NoData.tsx`のコンポーネントを出力するようにしています。

## アーキテクチャの説明

- Main.tsx の中にそれぞれのページ（`src/pages/Home.tsx`や`src/pages/Account/Teacher.tsx`）を表示させるようにしました。`pages`ディレクトリでディレクトリで擬似的なルーティングとして可視化し、分かりやすくなるようにしました
- `src/pages/Account/Teacher.tsx`で API からデータを取得する時のクエリを一元管理するようにして、`Table/TeacherTableで`それを props で受け取るようにして検索欄を持つ Teacher.tsx からテーブルの更新ができるようにしました

## 悩ましかったところ

- 現時点だと Teacher.tsx から requestParams と setRequestParams を TeacherTable に props で渡して、さらに TeacherTable から Pagination にその 2 つを 2 つをリレーしている形になってしまっているので、どうするのが良いのかがまだ理解できていないです。Context で渡しても set する用の関数をいずれ渡すことになると思うので、Reacoil とか Jotai とか状態管理ライブラリ使った方が良かった気がしています。今回だと 1 ページの実装なのであまりライブラリを使いすぎないようにはしようと思っていました。
- name のソートがうまくソートされない状態で帰ってきます。[https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators?\_sort=name](https://us-central1-compass-hr.cloudfunctions.net/mock/facilitators?_sort=name)を叩くと名前順で先生\_1 から順にとてるはずですが、取れていないようです。API 側の問題？かもしれないです。
-
