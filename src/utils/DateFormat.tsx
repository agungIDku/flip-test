export const DateTimeToDateString = ({date}:{date:string}) => {
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    const year = date.substr(0,4)
    const day = date.substr(8,2)
    const month = parseInt(date.substr(5,2))

    return day + ' ' + months[month - 1] + ' ' + year
}