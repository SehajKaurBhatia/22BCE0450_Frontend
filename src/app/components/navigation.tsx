import React from 'react'
import Link from 'next/link'
const navigation = () => {
  return (
    <div>
        <Link href="/">Home</Link>
        <Link href="/Products/1">Products</Link>
        
    </div>
  )
}

export default navigation