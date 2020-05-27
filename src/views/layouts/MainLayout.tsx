import React,{Suspense} from 'react'

const MainLayout = ({Container}:{Container:any}) => {
    return(
        <div className="container">
            <Suspense fallback={<div className="loader">Loading...</div>}>
                <Container/>
            </Suspense>
        </div>
    )
}

export default MainLayout