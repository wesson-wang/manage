function transTime(num){
    var date=new Date(num)
    return date.toLocaleDateString();
}
export default transTime