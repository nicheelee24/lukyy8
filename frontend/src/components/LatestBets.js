import React from 'react'
import { useTranslation } from 'react-i18next'
import { TabsAside } from './TabsAside'
import { BetsTable } from './BetsTable'

export const LatestBets = () => {
  const { t } = useTranslation()

  const data = [
    {
      label: 'All Bets',
      value: 'All Bets'
    },
    {
      label: 'High Rollers',
      value: 'High Rollers'
    },
    {
      label: 'Wager Contest',
      value: 'Wager Contest'
    }
  ]

  return (
    <div className='md:RecentWin md:LatestBets'>
      <div className='top flex text-[#99FF15] items-center justify-center text-[32px] font-bold leading-[48px]'>
        <h1>{t("Latest Winners")}</h1>
      </div>
      <div className='top flex text-white text-[60px] leading-[78px] items-center justify-center mb-6 '>
        <h1>{t("Latest Bets")}</h1>
      </div>
      <div className='flex mx-auto text-center justify-center w-[400px] text-white text-[16px] leading-[26px]'>
        More and more winners are added every time! To locate the most recent winner's information
      </div>
      <div className='w-96 mt-9 mb-5 mx-auto'>
        <TabsAside data={data} />
      </div>
      <div className='table-area w-full mb-10'>
        <BetsTable />
      </div>
    </div>
  )
}
