export default {
    addZero(val){
        //补零
        let str =  val.toString()
        str.length==1?str='0'+str:'';
        return str
    }
}