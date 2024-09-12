/* eslint-disable @next/next/no-img-element */
'use client';

import { Carousel } from 'flowbite-react';

export default function Component() {
  return (
    <div className='h-56 sm:h-64 xl:h-80 2xl:h-96'>
      <Carousel>
        <img src='/img/caurosel/img01.jpeg' alt='...' />
        <img src='/img/caurosel/img02.jpg' alt='...' />
        <img src='/img/caurosel/img03.jpg' alt='...' />
        <img src='/img/caurosel/img04.jpg' alt='...' />
        <img src='/img/caurosel/img05.jpg' alt='...' />
      </Carousel>
    </div>
  );
}
