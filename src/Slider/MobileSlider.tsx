import React from 'react';
import * as Scrollytelling from '@bsmnt/scrollytelling'
import Image from 'next/image'

type MobileSliderProps = {
  IMAGES: string[]
}

const getTweenTimes = (
  totalStart: number,
  totalEnd: number,
  partialStart: number,
  partialEnd: number
) => {
  // Ensure that partialStart is less than partialEnd
  if (partialStart >= partialEnd) {
    partialEnd = partialStart + 1;
  }

  // Ensure that totalStart is less than totalEnd
  if (totalStart >= totalEnd) {
    totalEnd = totalStart + 1;
  }

  const start = (totalEnd - totalStart) * (partialStart / 100) + totalStart;
  const end = (totalEnd - totalStart) * (partialEnd / 100) + totalStart;

  return { start, end };
}

const MobileSlider = () => {
  const IMAGES = [
    '/../../slider-placeholders/one.png',
    '/../../slider-placeholders/two.png',
    '/../../slider-placeholders/three.png',
    '/../../slider-placeholders/four.png',
    '/../../slider-placeholders/five.jpg',
    '/../../slider-placeholders/six.jpg',
    '/../../slider-placeholders/seven.jpg'
  ]

  return (
    <Scrollytelling.Root scrub={0.9}>
      <div style={{ height: 500 * IMAGES.length, width: '100%' }}>
        <Scrollytelling.Pin
          childClassName="flex item-center"
          childHeight="100vh"
          pinSpacerHeight="100%"
        >
          {IMAGES.map((src, idx) => {
            const fraction = 100 / IMAGES.length;
            const start = fraction * idx;
            const end = fraction * (idx + 1);

            const tween = [];

            if (idx) {
              tween.push({
                to: {
                  scale: 1,
                  y: -420,
                },
                ...getTweenTimes(start, end, -50, 20)
              });
            }

            if (idx !== IMAGES.length - 1) {
              tween.push({
                to: {
                  autoAlpha: 0,
                  sclae : 0.2,
                  y: -800
                },
                ...getTweenTimes(start, end, 35, 100)
              });
            }

            return (
              <Scrollytelling.Animation tween={tween} key={idx}>
                <figure
                  key={`figure-${idx}`}
                  className="w-full h-screen border border-[#FFFFFF66] overflow-hidden rounded-2xl max-h-[500px]"
                  style={{
                    zIndex: 10 - idx,
                    transformOrigin: 'bottom',
                    transform: `scale(calc(1 - 0.05 * ${idx})) translateY(calc(0px * ${idx}))`,
                    position: idx ? 'absolute' : 'relative'
                  }}
                >
                  <img
                    src={src}
                    alt={`card-${idx}`}
                   
                    className=' eee object-cover'
                    
                  />
                </figure>
              </Scrollytelling.Animation>
            )
          })}
        </Scrollytelling.Pin>
      </div>
    </Scrollytelling.Root>
  )
}

export default MobileSlider;
