import Link from "next/link";

type Props = {
  imageUrl?: string
  href?: string
  unreadFlg?: boolean
}

// アイコンのアバターです
export default function Avatar({ imageUrl, href, unreadFlg }: Props) {
  const noticeIcon = (
    <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white"/>
  )

  const avatar = (
    imageUrl ? (
      <div>
        <span className="relative inline-block">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={imageUrl}
            alt="Avatar"
          />
          {unreadFlg && noticeIcon}
        </span>
      </div>
    ) : (
      <div className="">
        <span className="relative inline-block">
          <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </span>
          {unreadFlg && noticeIcon}
        </span>
      </div>
    )
  )

  return (
    <>
      {href ? (
        <Link href={href}>{avatar}</Link>
      ) : avatar}
    </>
  )
}