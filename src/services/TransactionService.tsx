import axios from 'axios'
import { ResponseServiceSuccess, ResponseServiceFailed } from '@/utils/ResponseService'
export const TransactionListService = async() => {
    // I used own API server for handling CORS from Flip Server and i get the data from Flip API
    let data
    await axios.get('https://api.netcellindo.com/api/v1/test/transaction',{ crossdomain: true })
    .then((res : any) => {
        data = ResponseServiceSuccess({data:res.data.data})
    }).catch(() => {
        data = ResponseServiceFailed({})
    })
    return data
}