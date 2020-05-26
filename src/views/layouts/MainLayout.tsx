import React,{Suspense} from 'react'

const MainLayout = ({Container}:{Container:any}) => {
    return(
        <div>
            <Suspense fallback={<p>loading ...</p>}>
                <Container/>
            </Suspense>
        </div>
    )
}

export default MainLayout