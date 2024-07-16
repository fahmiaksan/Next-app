import React from "react";

export default function Layout({
  children,
  product,
  analytics,
  payments
}
  : {
    children: React.ReactNode,
    product: React.ReactNode,
    payments: React.ReactNode,
    analytics: React.ReactNode
  }) {
  return (
    <div className="px-5 space-y-5">
      {children}
      <div className="space-x-4 flex justify-center items-center">
        {product}
        {analytics}
      </div>
      {payments}
    </div>
  )
}