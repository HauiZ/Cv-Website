import React from 'react'
import ApplicationLayout from './ApplicationLayout'
import HintNews from './HintNews'
export default function ApplicationManerment() {
  return (
    <div className='flex justify-center gap-10 py-10 bg-[#F5F5F5] h-full'>
      <div>
        <ApplicationLayout></ApplicationLayout>
      </div>
      <div>
        <HintNews/>
      </div>
    </div>
  )
}
