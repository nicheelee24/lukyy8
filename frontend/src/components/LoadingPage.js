import React from 'react'
import { useTranslation } from 'react-i18next'
import ModelLogo from '../assets/Modal-Logo.png'

export default function LoadingModal ({ message }) {
  const { t } = useTranslation()

  return (
    <div className='z-[100] w-screen md:w-full flex h-full min-h-screen top-0 left-0 backdrop-blur-sm fixed'>
      <div className='w-full h-screen bg-cover flex px-8 py-20 justify-center items-center '>
        <div className='relative top-0 left-0 rotate-45 mx-auto backdrop-blur-md  w-32 h-32  rounded-2xl'>
          <img
            src={ModelLogo}
            alt='ModelLogo'
            className='mx-auto w-16 z-10 relative -rotate-45 top-6 -left-3'
          />
          <div
            className={`inline-block h-6 w-6 animate-spin text-[#E50AAC] rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]} absolute left-1/2 top-1/2 mt-5 ml-4 z-20`}
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              {t("Loading...")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
