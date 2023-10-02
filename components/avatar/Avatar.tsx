type Props = {
  imageUrl?: string
  href?: string
  unreadFlg?: boolean
  widthHeight?: string // e.g. 1,2,full
}

/**
 * アバターです
 */
export default function Avatar({ imageUrl, href, unreadFlg, widthHeight }: Props) {
  // 未読時の赤い丸です
  const noticeIcon = (
    <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white"/>
  )

  // 既存のCSSクラスの定義
  const w = widthHeight ? `w-${widthHeight}` : "w-10";
  const h = widthHeight ? `h-${widthHeight}` : "h-10";

  // 画像とSVGの共通クラス
  const commonClass = `${h} ${w} rounded-full`;

  // 修正後
  const avatar = (
    <span className="relative block">
      {imageUrl ? (
        <img
          className={`inline-block ${commonClass} aspect-[1/1] object-cover ring-1 ring-gray-300`}
          src={imageUrl}
          alt="Avatar"
        />
      ) : (
        <span className={`block ${commonClass} overflow-hidden bg-gray-100`}>
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </span>
      )}
      {unreadFlg && noticeIcon}
    </span>
  );

  return (
    <>
      {href ? (
        <a href={href}>{avatar}</a>
      ) : avatar}
    </>
  )
}