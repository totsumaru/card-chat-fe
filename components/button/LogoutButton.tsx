"use client"

import LoadingButton from "@/components/button/LoadingButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

/**
 * ログアウトボタンです
 */
export default function LogoutButton() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  return (
    <LoadingButton
      label={"ログアウト"}
      isWhite
      clickHandler={async () => {
        await supabase.auth.signOut()
        router.push("/login")
      }}
    />
  )
}