export const FilterData = ({data,filter}:{data:any,filter:string}) => {
    let filterData = data.filter((obj : any) => {
        var flag = false;
        Object.values(obj).forEach((value : any) => {
            if(String(value.toString().toLowerCase()).indexOf(filter.toLowerCase()) > -1) {
                flag = true;
                return;
            }    
        });
        return flag ? obj : 0
    })
    return filterData
}