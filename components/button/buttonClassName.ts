/**
 * ボタンのクラス名です
 */
export const buttonClassName = (
  isWhite?: boolean,
  widthFull?: boolean,
  disabled?: boolean,
) => {
  let colorClassName: string
  if (isWhite) {
    colorClassName = `bg-white text-gray-900 ring-1 ring-inset ring-gray-300
     hover:bg-gray-50`
  } else {
    colorClassName = `${disabled === false && "hover:bg-indigo-500"} bg-indigo-600
     text-white focus-visible:outline focus-visible:outline-2
     focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
  }

  return (
    `${widthFull && "w-full"} ${colorClassName} ${disabled && "bg-indigo-300"}
     whitespace-nowrap flex items-center justify-center rounded-md px-3 py-2
      text-sm font-semibold leading-6 shadow-sm`
  )
}