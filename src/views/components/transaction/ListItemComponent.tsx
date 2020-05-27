import React, {memo} from 'react'
import {formatRupiah} from '@/utils/Currency'
import {Link} from 'react-router-dom'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const ListItemComponent = memo(({data}:{data:any}) => {
    return(
        <Link to={`/detail/${data.id}`} className={['bgWhite p-3 border-rounded mb-2 d-flex item-transaction position-relative overflow-hidden',data.status.toLowerCase()].join(' ')}>
            <div className="w-75">
                <div>
                    <span className="d-inline-block mr-1 text-uppercase boldWeight">{data.sender_bank}</span> 
                    <FontAwesomeIcon size="xs" icon={faArrowRight}/>
                    <span className="d-inline-block ml-1 text-uppercase boldWeight">{data.beneficiary_bank}</span>
                </div>
                 <p className="text-uppercase py-2">{data.beneficiary_name}</p>
                 <div>
                    <span>{formatRupiah(data.amount,true)}</span>
                 </div>
            </div>
            <div className="w-25 d-flex align-items-center justify-content-end">
                <span className="status">{data.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}</span>
            </div>
        </Link>
    )
})
export default ListItemComponent