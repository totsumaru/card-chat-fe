import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import BaseModal from "@/components/modal/BaseModal";
import { validateEmail } from "@/utils/validate";
import LoadingButton from "@/components/button/LoadingButton";
import { sleep } from "@/utils/sample/sleep";
import { PostNoticeEmail } from "@/utils/api/postNoticeEmail";

type Props = {
  chatId: string
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  registeredEmail?: string
}

/**
 * 通知のモーダルを開きます
 *
 * 1. メールアドレスが登録されていないとき
 *   - メールを登録のフォームを表示
 * 2. メールアドレスが既に登録されているとき
 *   - 更新フォームを表示
 *
 *  いずれも、送信が完了した時は`success`のフラグによって表示が変更されます。
 */
export default function NoticeEmailModal({
  chatId, modalOpen, setModalOpen, registeredEmail
}: Props) {
  const [email, setEmail] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)
  const [isRemove, setIsRemove] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")

  // Modalを閉じるボタンの処理です
  const handleClose = async () => {
    setModalOpen(false)
    await sleep()
    setSuccess(false)
    setIsRemove(false)
    setErrMsg("")
  }

  // メールアドレスを送信します
  const handleRegister = async () => {
    if (!email) {
      const userConfirmed = confirm("通知を解除しますか？");
      if (!userConfirmed) {
        return;
      }
      setIsRemove(true)
    } else {
      if (!validateEmail(email)) {
        setErrMsg("メールアドレスが正しくありません")
        return
      }
    }

    try {
      await PostNoticeEmail(chatId, email)
      setSuccess(true)
      setEmail("")
    } catch (e) {
      console.error(e)
      setErrMsg("エラー: 画面を更新して、再度お試しください。")
    }
  }

  // 説明です
  const description = (
    <p className="mt-2 text-sm text-gray-500 rounded-md">
      {success ? (
        isRemove ? (
          <span>
            メールアドレスの登録を解除しました。
          </span>
        ) : (
          <span>
            <b>登録したアドレスにメールを送信しました。</b><br/>
            <span className="block mt-1">
              ※届いていない場合は、迷惑メールフォルダや登録したアドレスを確認してください。
            </span>
          </span>
        )
      ) : (registeredEmail ? (
        <span>
          *更新する場合は、新しいアドレスを入力してください<br/>
          *解除する場合は、何も入力せずに更新してください
        </span>
      ) : (
        <span>*このメッセージの受信通知だけに使用されます</span>
      ))}
    </p>
  )

  // メール入力時のbodyです
  const inputPhaseBody = (
    <>
      {/* フォーム */}
      <div className="text-left mt-3">
        <input
          type="email"
          name="email"
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
           ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
           focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* エラーメッセージ */}
        {errMsg && (
          <p className="text-xs text-red-500">※{errMsg}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="flex flex-col mt-4 gap-2">
        <LoadingButton
          clickHandler={handleRegister}
          label={registeredEmail ? "更新" : "送信"}
          successMessage={""}
          failureMessage={""}
          disabled={success}
        />
        <LoadingButton
          clickHandler={handleClose}
          label={"キャンセル"}
          successMessage={""}
          failureMessage={""}
          isWhite
        />
      </div>
    </>
  )

  // 完了後のbodyです
  const successBody = (
    <div className="mt-4">
      <LoadingButton
        clickHandler={handleClose}
        label={"OK"}
        successMessage={""}
        failureMessage={""}
        widthFull
      />
    </div>
  )

  return (
    <>
      <BaseModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        icon={<BellIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>}
        title={success
          ? "完了"
          : registeredEmail
            ? registeredEmail + " に通知中"
            : "メールで通知を受け取る"
        }
        description={description}
        body={success ? successBody : inputPhaseBody}
      />
    </>
  )
}