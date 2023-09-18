# card-chat-fe

## Path

送信者のプロフィールを表示します

- このページはURLを知っている全てのユーザーに公開されます

```
/writer/profile/[writer-id]
```

送信者のプロフィールを編集します

```
/writer/profile/[writer-id]/edit
```

ダッシュボードです

```
/writer/dashboard/[writer-id]
```

チャットの情報(ユーザー名など)を表示/編集します

```
/writer/dashboard/[writer-id]/[msg-id]
```

ログイン画面です

```
/login
```

チャット画面です

- 受信者はこの画面のみ閲覧可能です
- 表示にはパスコードが必要です

```
/login
```
