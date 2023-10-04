"use client"

// 新規作成画面です
import { useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validateEmail, validateName, validatePassword } from "@/utils/validate";
import { signUpEmailRedirectTo } from "@/utils/path";

/**
 * 新規登録ページです
 */
export default function Index() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const handleClick = async () => {
    setError("")
    if (!email || !password || !name) {
      setError("入力されていないフォームがあります")
      return
    }
    const emailErr = validateEmail(email)
    if (emailErr) {
      setError(emailErr)
      return
    }
    const passwordErr = validatePassword(password)
    if (passwordErr) {
      setError(passwordErr)
      return
    }
    const nameErr = validateName(name)
    if (nameErr) {
      setError(nameErr)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: signUpEmailRedirectTo(name)
      }
    })
    if (error) {
      setError("登録できませんでした")
      return
    }
    setSuccess(true)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">

      {/* サービス名 */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          アカウントの作成
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-3">
        {success ? (
          <p>
            登録したアドレスにメールを送信しました。<br/>
            メールに添付しているURLをご確認ください。
          </p>
        ) : (
          <>
            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                メールアドレス
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="mail@patchat.jp"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* パスワード */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  パスワード
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="******"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 名前 */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  表示名
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="鈴木 太郎"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-600">
                  ※いつでも変更できます
                </p>
              </div>
            </div>

            {/* 新規作成ボタン */}
            <LoadingButton label={"新規作成"} clickHandler={handleClick} widthFull/>
            <p className="text-sm text-red-600">
              {error}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
