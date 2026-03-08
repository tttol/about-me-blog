---
title: 'JAWS DAYS 2026に行ってきた'
description: ''
pubDate: '2026/03/07 10:52'
---
JAWs DAYS 2026 に行ってきました！

ここに画像

## セッション
### [A2]AWS IAM は誰の責任か？ ~ Cloud Infrastructure チーム が全部守る設計はなぜ失敗するのか
- ラムダ作りたい→インフラがIAMロールなどのリソースを作る→待ちが発生
- 責任と操作を分離し委任する→IAMで。
- 責任：Policy、操作：Role
- 最終責任は？→インフラ。操作はアプリ。インフラが全部やるわけではない
- 標準（ABAC）と禁止（SCP）だけをインフラがやる
- ABAC? RBAC?
    - Attribute Based Access Control
    - https://dev.classmethod.jp/articles/akibaaws-06-iam-abac/
- タグで制御。タグをつけるのはアプリ。
- タグの付与を強制する（IAMのConditionでできるらしい）
- タグの命名規則を整備する
- インフラがガードレールを敷いて、アプリが操作する
- 「最終責任はInfra、操作は全員」
### [B3]200アカウント規模を見据えた開発・検証・本番の環境分離を成立させる、AWS Transit Gatewayによるネットワーク設計と実践
- 環境間の通信分離
- 環境ごとにTGWを作る。本番のTGW変更で他の環境が死ぬ、みたいなことを原理的に防ぐ。
- 単一TGWでルートテーブルを分ける、も選択肢にあった
- ブラックホールルート？
    - https://www.akamai.com/ja/glossary/what-is-blackhole-routing
- インターネットへの接続はNATを二つhubアカウントに用意する
- Account Factory for Terraform(AFT)
    - Control　Tower配下でTFをもとにリソースを自動作成。アカウントが増えても同じ構成を自動作成。
    - Control Tower配下でしか使えない

### 小山さん
- IaC実行基盤の比較
- ローカル
    - 楽。構築コストほぼゼロ
    - 環境差異がある。CDKのバージョンなど
- EC2
    - 自社DC的な使い方
- GHA
    - 開発フローに自然に溶け込む
    - AWSリソースの操作権限を渡す必要あり
- Terraform　Cloud
    - 排他制御、ドリフト検知、GHAに近い操作感
    - ベンダーロックイン、ライセンス、学習コスト
## Gameday
- まずは止血。その後に恒久対応。
## その他
### ネットワーキング
### 旅路
## まとめ
