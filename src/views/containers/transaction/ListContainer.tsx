import React, {useState, useRef, useEffect} from 'react'

import OutSideClick from '@/utils/OutsideClick'
import { TransactionListService } from '@/services/TransactionService'
import { SET_LIST_TRANSACTION } from '@/store/actions/TransactionAction'
import { useDispatch,useSelector } from 'react-redux'
import ListItemComponent from '@/views/components/transaction/ListItemComponent'
import { FilterData } from '@/utils/FilterDataArrayObject'

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const ListContainer = () => {
    const dispatch = useDispatch()
    const transaction = useSelector((store : any) => store.transaction)
    const [sortOn,setSortOn] = useState({show : false, key : null})
    const [textFilter,setTextFilter] = useState('')
    const sortTypes = [
        {title:'Nama A-Z', key : 1},
        {title:'Nama Z-A', key : 2},
        {title:'Tanggal terbaru', key : 3},
        {title:'Tanggal terlama', key : 4}
    ]
    const ref = useRef()
    OutSideClick(ref, () => setSortOn({...sortOn,show:false}))

    const RenderItemTransactions = () => {
        const content = []
        const transactions = textFilter ? FilterData({data:transaction.list,filter:textFilter}) : transaction.list
        if(transactions.length > 0){
            for(const item in transactions){
                content.push(<ListItemComponent key={item} data={transactions[item]} />)
            }
        }else{
            content.push(<div key={1} className="alert alert-warning"><span>There is no data</span></div>)
        }
        return content
    }

    const ON_SORT_DATA = (key : number) => {
        const list = [...transaction.list]
        setSortOn({...sortOn,key})
        if(key === 1 || key === 2){
            list.sort((a : any, b : any) => {
                var textA = a.beneficiary_name.toUpperCase()
                var textB = b.beneficiary_name.toUpperCase()
                if(key === 1){
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }else{
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }
            })
        }else if(key === 3 || key === 4){
            list.sort((a : any, b : any) => {
                const aDate = new Date(a.created_at).getTime()
                const bDate = new Date(b.created_at).getTime()
                if(key === 3){
                    return bDate - aDate
                }else{
                    return aDate - bDate
                }
            })
        }
        dispatch({type:SET_LIST_TRANSACTION,loaded : 1,list})
    }

    useEffect(()=>{
        TransactionListService().then((res : any) => {
            var loaded = res.status ? 1 : 2
            let list = []
            if(res.status){
                for(const item in res.data){
                    list.push({...res.data[item]})
                }
            }
            dispatch({type:SET_LIST_TRANSACTION,loaded,list})
        })
    },[dispatch])
    return(
        <div>
            <h1 className="titleFont lightWeight text-center">Daftar Transaksi</h1>
            <div className="px-2">
                <p className="mt-3 labelFont boldWeight">Halo kak!</p>
                <p className="mt-1">Kamu telah melakukan transaksi sebesar <span className="orange boldWeight">Rp. 5.000.000</span> sejak menggunakan Flip.</p>
            </div>
            <div className="mt-3 border-rounded border-default d-flex">
                <div className="w-70 position-relative float-left border-right">
                    <span className="position-absolute" style={{top:7,left:15}}>
                        <FontAwesomeIcon color="#dedede" icon={faSearch}/>
                    </span>
                    <input onChange={(e)=>setTextFilter(e.target.value)} type="text" placeholder="Cari nama atau bank" className="w-100 pl-5 pr-3 py-2 border-rounded-left border-none descriptionFont"/>
                </div>
                <div className="w-30 float-left d-flex position-relative" ref={ref}>
                    <span onClick={()=>setSortOn({...sortOn,show:!sortOn.show})} className="boldWeight smallFont d-block p-2 text-right w-100 cursor-pointer bgWhite border-rounded-right noselect sortData">
                        URUTKAN <FontAwesomeIcon color="#fd6542" size="lg" icon={sortOn.show ? faAngleUp : faAngleDown} className="mx-2"/>
                    </span>
                    {sortOn.show &&
                        (<div className="position-absolute w-100 bgWhite border-rounded-bottom border-default py-2" style={{top:33,left:-1,zIndex:5}}>
                            <ul className="sortList">
                                {sortTypes.map((data : any, index : number) => {
                                    return(
                                        <li key={index} onClick={()=>ON_SORT_DATA(data.key)} className={['px-3 py-2 cursor-pointer d-flex',sortOn.key === data.key ? 'sortSelected' : ''].join(' ')}><span className="smallFont">{data.title}</span></li>
                                    )
                                })}
                            </ul>
                        </div>) 
                    }
                </div>
            </div>

            <div className="mt-3">
                {transaction.loaded === 0 && (<div className="loader">Loading...</div>)}
                {transaction.loaded === 2 && (<div className="alert alert-danger border-rounded mt-2 smallFont">Failed to load data. Try again later!</div>)}
                {transaction.loaded === 1 && RenderItemTransactions()}
            </div>
        </div>
    )
}
export default ListContainer