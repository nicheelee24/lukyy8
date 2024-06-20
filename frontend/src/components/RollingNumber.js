import React, { useState, useEffect } from "react";

export const RollingNumber = () => {
  const [rollingNumber, setRollingNumber] = useState(
    50000000 + parseInt(Math.random() * 100000)
  );

  useEffect(() => {
    let i = rollingNumber;
    let poolnumber = setInterval(function () {
      i += parseInt(Math.random() * 10000);
      setRollingNumber(i);
    }, 100);
    return () => {
      clearInterval(poolnumber);
    }
  })

  return (
    <p className='text-start py-4 w-full rounded-xl md:text-2xl rolling my-3 font-semibold text-[#dbe7ff]'>
      ${' '}{rollingNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
    </p>
  );
};
