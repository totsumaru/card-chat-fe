"use client"

import { useState } from "react";
import BaseModal from "@/components/modal/BaseModal";
import { CheckIcon } from "@heroicons/react/24/outline";
import LinkButton from "@/components/button/LinkButton";
import { pathLogin } from "@/utils/path";
import { NoSymbolIcon } from "@heroicons/react/24/solid";

type Props = {
  open: boolean
}

/**
 * ログインを促すModalです
 *
 * チャットステータスが"first-not-login"の時にOPENします。
 * (誤って初期設定がされていないカードがUserに渡った時にOPENします)
 */
export default function MustLoginModal({ open }: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(open)

  return (
    <BaseModal
      modalOpen={open}
      setModalOpen={setModalOpen}
      icon={<NoSymbolIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>}
      title={"チャットが公開されていません"}
      description={
        <>
          このチャットルームは公開されていません。アカウントを持っている方は、ログインをして初期設定をしてください。
          <u className="block text-xs">
            ※アカウントを持っていない方は、チャットを開始することができません。
          </u>
        </>
      }
      body={
        <div className="mt-3 sm:mt-5 flex flex-col gap-2">
          <LinkButton label={"ログイン"} href={pathLogin()} widthFull/>
        </div>
      }
    />
  )
}