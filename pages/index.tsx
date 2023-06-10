import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CanvasLayout } from '../src/components/canvas-layout'
import { CanvasProviders } from '../src/providers/canvas-providers'

const Home: NextPage = ({data}: any) => {
  
  return (
    <div>
      {/* <Link href="/about">About</Link>
      {data.errors.map((error: any, index: number) => {
        return <p key={index}>{error.message} from home</p>
      })} */}

      <CanvasProviders>
        <CanvasLayout>
          
        </CanvasLayout>
      </CanvasProviders>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  console.log(context)
  // const data = await fetch('https://getsandbox.com/api/1/sandboxes').then(res => res.json()).catch(err => err.response.json())

  return {
    props: {
      data: {
        test: ""
      }
    }
  }
}

export default Home
