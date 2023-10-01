"use client"

// TODO: sessionが切れたら更新してBEにリクエストを投げるようにすること。

// 新規作成画面です
import { useEffect, useState } from "react";
import LoadingButton from "@/components/button/LoadingButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { signUpEmailRedirectTo } from "@/utils/path";

/**
 * 新規登録ページです
 */
export default function Index() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const printWhenLoading = async () => {
      await supabase.auth.refreshSession()
      const session = await supabase.auth.getSession()
      const user = await supabase.auth.getUser()
      console.log("user: ", user)
      console.log("session: ", session)
    }
    printWhenLoading().then()
  }, [])

  console.log("callback: ", signUpEmailRedirectTo())

  const handleClick = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: signUpEmailRedirectTo()
      }
    })
    if (error) {
      setError(true)
    }
    console.log(data)
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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">

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
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1
                 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* 新規作成ボタン */}
        <div className="mt-20">
          <LoadingButton label={"新規作成"} clickHandler={handleClick} widthFull/>
          <LoadingButton label={"ログアウト"} clickHandler={async () => {
            await supabase.auth.signOut()
          }} widthFull isWhite/>
        </div>

      </div>
    </div>
  )
}
