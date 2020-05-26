import {lazy} from 'react'

// CONTAINERS
const ListTransactionContainer = lazy(()=>import('@/views/containers/transaction/ListContainer'))
const DetailTransactionContainer = lazy(()=>import('@/views/containers/transaction/DetailContainer'))

const routes = [
    { path : '/', exact : true, title : 'List Transaction', container : ListTransactionContainer },
    { path : '/detail/:id', exact : true, title : 'Detail Transaction', container : DetailTransactionContainer }
]
export default routes