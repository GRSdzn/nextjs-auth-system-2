'use client'
import { Loader } from "@mantine/core"

const loading = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'><Loader size={50} /></div>
    )
}

export default loading