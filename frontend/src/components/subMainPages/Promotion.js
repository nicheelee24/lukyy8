import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Promotion = () => {
    const { t } = useTranslation()

    return (
        <div className='text-white flex justify-center h-[500px] items-center'>
            This is Promotion Page!
        </div>
    )
}
