import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function Slide () {
  return (
    <div className='content-slide'>
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: false
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper rounded-xl'
      >
        {/* <SwiperSlide>
          <img src='/img/slide/image (1).png' alt='' />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src='/img/slide/image (2).png' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/img/slide/image (3).png' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/img/slide/image (4).png' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/img/slide/image (5).png' alt='' />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src='/img/slide/image (6).png' alt='' />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src='/img/slide/image (7).png' alt='' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='/img/slide/image (8).png' alt='' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
