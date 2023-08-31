import React, { useState } from 'react'
import CodeBlocks from './CodeBlocks'
import { useSelector } from 'react-redux'

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//


function CodeAnimationSection() {
  const { token } = useSelector((state => state.auth));
  return (
    <div className='max-w-[98rem] mx-auto'>
      <CodeBlocks
        position={'flex-row'}
        startHeading={'Unlock your '}
        highlightedHeading={'coding potential'}
        remainingHeading={'with our online courses'}
        para={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
        ctabtn1={{ text: `${token===null?'Try it yourself ':'Start Coding '}`, linkto:`${token===null?'/signup':'/dashboard/enrolled-courses'} ` }}
        ctabtn2={{ text: `${token===null?'Learn More':'Buy a course'}`, linkto: `${token===null?'/login':'/catalog'} ` }}
        codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
        bgGradientColor={'from-[#892be255] to-[#ffa60061]'}
        codeColor={'customGradient'}
      />

      <CodeBlocks
        position={'flex-row-reverse'}
        startHeading={'Start '}
        highlightedHeading={`coding in seconds`}
        remainingHeading={''}
        para={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
        ctabtn1={{ text: 'Continue lesson ', linkto: `${token===null?'/signup':'/dashboard/enrolled-courses'} ` }}
        ctabtn2={{ text: 'Learn More', linkto: `${token===null?'/login':'/catalog'} ` }}
        codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
        bgGradientColor={'from-[#00efef75] to-[#fed13d67]'}
        codeColor={'customGradient2'} />

    </div>

  )
}

export default CodeAnimationSection
