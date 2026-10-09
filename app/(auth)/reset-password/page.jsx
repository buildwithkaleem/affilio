import ResetPassword from '@/components/auth/ResetPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPassword />
      </Suspense>
    </div>
  )
}

export default page
