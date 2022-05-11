import React from 'react'
import moment from 'moment'
import Link from 'next/link';
const AdjacentPostCard = ({post,position}) => {
  return (
    <>
        <div className="absolute bg-center bg-no-repeat h-72 rounded-lg" style={{backgroundImage:`url('${post.featuredImage.url}')`}}/>
        <div className="absolute bg-center rounded-lg bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72"/>
        <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
          <div className="text-white text-shadow text-xs font-semibold">{moment().format("MMM,DD YYYY")}</div>
          <div className="text-white text-shadow text-2xl font-semibold text-center">{post.title}</div>
        </div>
        <Link href={`/post/${post.slug}`}>
          <span className="z-10 cursor-pointer absolute w-full h-full"/>
          {position === 'LEFT' && (
          <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 left-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
    )}
    {position === 'RIGHT' && (
      <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 right-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    )}
        </Link>        
    </>
  )
}

export default AdjacentPostCard