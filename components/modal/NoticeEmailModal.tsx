import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Example({ open, setOpen }: Props) {
  const cancelButtonRef = useRef(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    // Modalをopenしたときにsuccessをfalseに変更する
    open && setSuccess(false)
  }, [open])

  // メールアドレスを送信します
  const handleSend = () => {
    setEmail("")
    setSuccess(true)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {success ? email : "メールで通知を受け取る"}
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
                            <p className="text-sm text-gray-500">
                              *このメッセージの受信通知だけに使用されます。
                            </p>
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
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
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
                    設定
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
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