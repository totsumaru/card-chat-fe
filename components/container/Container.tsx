import { ReactNode } from "react";

export default function Container({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-3 pt-20 pb-10">
        {children}
      </div>
    </div>
  )
}