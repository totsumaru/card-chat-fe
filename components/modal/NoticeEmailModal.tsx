import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

type Props = {
  openModal: boolean
  setOpenModal: (open: boolean) => void
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
  openModal, setOpenModal, registeredEmail
}: Props) {
  const cancelButtonRef = useRef(null)
  const [newEmail, setNewEmail] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)
  const [validationErrMsg, setValidationErrMsg] = useState<string>("")

  // Modalが閉じられた時の処理です
  const onCloseHandle = () => {
    setOpenModal(false)
    setSuccess(false)
    setValidationErrMsg("")
  }

  // メールアドレスを送信します
  const handleSend = () => {
    // メールアドレスのバリデーションを行います
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(newEmail)) {
      setValidationErrMsg("メールアドレスが正しくありません")
      return
    }

    setNewEmail("")
    setSuccess(true)
  }

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10"
              initialFocus={cancelButtonRef} onClose={() => onCloseHandle}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BellIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">

                    {/* タイトル */}
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {success // 現在のアドレスがあるか判定
                        ? "完了"
                        : registeredEmail // 送信後であるか判定
                          ? registeredEmail + " に通知中"
                          : "メールで通知を受け取る"
                      }
                    </Dialog.Title>

                    {/* メールアドレス */}
                    <div className="text-left">
                      {success ? (
                        <p className="mt-2 px-3 py-2 text-sm text-gray-500 rounded-md">
                          登録したアドレスにメールを送信しました。<br/>
                          届いていない場合は、迷惑メールフォルダやアドレスを確認してください。
                        </p>
                      ) : (
                        <div>
                          {/* 説明 */}
                          <div className="mt-2 text-left">
                            {registeredEmail
                              ? (
                                <p className="text-sm text-gray-500">
                                  *メールアドレスを更新する場合は、新しいアドレスを入力してください<br/>
                                  *解除する場合は「解除」と入力してください
                                </p>
                              ) : (
                                <p className="text-sm text-gray-500">
                                  *このメッセージの受信通知だけに使用されます
                                </p>
                              )
                            }
                          </div>

                          {/* メールフォーム */}
                          <div className="mt-2">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
                             ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                              focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="you@example.com"
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
                          </div>

                          {/* エラーメッセージ */}
                          {validationErrMsg && (
                            <p className="text-xs text-red-500">※{validationErrMsg}</p>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* ボタングループ */}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handleSend}
                    disabled={success}
                  >
                    {registeredEmail ? "更新" : "送信"}
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={onCloseHandle}
                    ref={cancelButtonRef}
                  >
                    キャンセル
                  </button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}