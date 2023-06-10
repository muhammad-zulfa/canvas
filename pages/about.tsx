import { NextPage } from "next"
import Link from "next/link"

export default ({data}: any) => {
  
  return (
    <div>
      <Link href="/">Back</Link>
      {/* {data.errors.map((error: any, index: number) => {
        return <p key={index}>{error.message}</p>
      })} */}
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