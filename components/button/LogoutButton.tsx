"use client"

import LoadingButton from "@/components/button/LoadingButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

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
      icon={<ArrowRightOnRectangleIcon className="w-5 h-5 mr-1"/>}
    />
  )
}