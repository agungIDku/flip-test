export const ResponseServiceSuccess = ({message='Data success loaded',data={}}) => {
    return{
        message,
        data,
        status : true
    }
}
export const ResponseServiceFailed = ({message='Data failed loaded',data={}}) => {
    return{
        message,
        data,
        status : false
    }
}