import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Support = () => {
    const { t } = useTranslation()

    return (
        <div className='text-white flex justify-center h-[500px] items-center'>
            This is Support Page!
        </div>
    )
}
