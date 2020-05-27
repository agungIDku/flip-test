export const formatRupiah = (angka : number, prefix : boolean) =>{
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
    split   		= number_string.split(','),
    rest     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, rest),
    ribuan     		= split[0].substr(rest).match(/\d{3}/gi);

    var separator
    if(ribuan){
        separator = rest ? '.' : '';
        rupiah += separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    return prefix ? (rupiah ? 'Rp. ' + rupiah : '') : rupiah
}