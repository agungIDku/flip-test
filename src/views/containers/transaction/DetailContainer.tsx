import React,{ useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TransactionListService } from '@/services/TransactionService'
import { SET_LIST_TRANSACTION } from '@/store/actions/TransactionAction'
import {formatRupiah} from '@/utils/Currency'
import { DateTimeToDateString } from '@/utils/DateFormat'

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
const DetailContainer = () => {
    const dispatch = useDispatch()
    const transaction = useSelector((store : any) => store.transaction)
    const {id} = useParams()
    const [detail,setDetail] = useState({status:0,data:{}})
    useEffect(()=>{
        if(transaction.loaded !== 1){
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
        }else{
            const findIndexDetail = transaction.list.findIndex((res : any) => res.id === id)
            if(findIndexDetail !== -1){
                setDetail({status:1,data:transaction.list[findIndexDetail]})
            }else{
                setDetail({status:2,data:{}})
            }
        }
    },[dispatch,transaction.loaded,id,transaction.list])
    return(
        <div className="detailPage">
            {detail.status === 0 && (<div className="loader">Loading...</div>)}
            {detail.status === 2 && (<div className="alert alert-danger"><p>Page Not Found! <Link to="/">Back Home</Link></p></div>)}
            {detail.status === 1 &&
            (<>
                <h1 className="titleFont lightWeight text-center">Detail Transaksi</h1>
                <div className="mt-3 bgWhite py-3 px-4 d-flex border-rounded">
                    <div className="w-75">
                        <p className="boldWeight py-1">ID TRANSAKSI : #{detail.data.id ? detail.data.id : '-'}</p>
                    </div>
                    <div className={['w-25 item-transaction text-right',detail.data.status ? detail.data.status.toLowerCase() : ''].join(' ')}>
                        {detail.data.status && (<span className="status">{detail.data.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}</span>) }
                    </div>
                </div>
                <div className="mt-3 bgWhite py-3 px-4 d-flex border-rounded">
                <div className="p-1">
                        <FontAwesomeIcon color="#fd6542" size="2x" icon={faInbox}/>
                </div>
                <div className="ml-3 p-1">
                    <div className="mb-3">
                        <label className="boldWeight mb-2">PENGIRIM</label>
                        <p>{detail.data.sender_bank ? detail.data.sender_bank.toUpperCase() : '-'}</p>
                    </div>
                    <div className="mb-3">
                        <label className="boldWeight mb-2">PENERIMA</label>
                        <p>{detail.data.beneficiary_bank ? detail.data.beneficiary_bank.toUpperCase() : '-'}</p>
                        <p>{detail.data.account_number ? detail.data.account_number : '-'}</p>
                        <p>{detail.data.beneficiary_name ? detail.data.beneficiary_name : '-'}</p>
                    </div>
                    <div className="mb-3">
                        <label className="boldWeight mb-2">NOMINAL</label>
                        <p>{detail.data.amount ? formatRupiah(detail.data.amount,true) : '-'}</p>
                            <p><span className="boldWeight">Kode Unik : </span> {detail.data.unique_code ? detail.data.unique_code : '-'}</p>
                    </div>
                    <div className="mb-3">
                        <label className="boldWeight mb-2">CATATAN</label>
                        <p>{detail.data.remark ? detail.data.remark : '-'}</p>
                    </div>
                    <div className="mb-3">
                        <label className="boldWeight mb-2">WAKTU DIBUAT</label>
                        <p>{detail.data.created_at ? DateTimeToDateString({date:detail.data.created_at}) : '-'}</p>
                    </div>
                </div>
                </div>
                <div className="mt-3">
                    <Link to="/" className="d-inline-block py-2 px-3 orange border-orange border-rounded">Kembali</Link>
                </div>
            </>) }
        </div>
    )
}
export default DetailContainer