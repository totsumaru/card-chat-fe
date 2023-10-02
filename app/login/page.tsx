"use client"

// ログイン画面です
import { useState } from "react";
import Link from "next/link";
import LoadingButton from "@/components/button/LoadingButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * ログインページです
 */
export default function Index() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const handleClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      setError(true)
    }
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
          ログイン
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-7">

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
            <div className="text-sm">
              <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                パスワードを忘れた方
              </Link>
            </div>
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

        {/* ログインボタン */}
        <LoadingButton label={"ログイン"} clickHandler={handleClick} widthFull/>
        <LoadingButton label={"ログアウト"} clickHandler={async () => {
          await supabase.auth.signOut()
        }} widthFull isWhite/>

      </div>
    </div>
  )
}
