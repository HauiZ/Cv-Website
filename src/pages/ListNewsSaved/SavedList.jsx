import React from 'react'
import HintNews from '../ApplicationManerment/HintNews'
import RecruitmentNews from '../profileCompany/Recruitments'
import useCustomFetch from '../../hooks/useCustomFetch'
import { fetchSavedNewsApi } from '../../services/userApi'
export default function SavedList() {
  const { data, loading, error } = useCustomFetch(fetchSavedNewsApi);

  return (
    <div className='flex justify-center gap-10 py-10 bg-[#F5F5F5] h-full'>
      <div className='w-[50%]'>
        <RecruitmentNews data={data} logo={data?.logoUrl} title={'Tin đã lưu'} />
      </div>
      <div className=''>
        <HintNews />
      </div>
    </div>
  )
}
