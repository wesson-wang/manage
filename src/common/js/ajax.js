import axios from "axios"
import qs from "qs"
function ajax(obj,url,method,params,successCallback,errorCallback) {
    var paramsKW="params";
    if(method.toUpperCase()=="POST"){
        paramsKW="data";
        params=qs.stringify(params)
    }
    axios({
        url: url,
        method: method,
        [paramsKW]: params
    }).then(d => {
        if (d.data.code == -1) {
            alert(d.data.info);
            obj.$router.replace("/login");
            return;
        }
        if (d.data.isok) {//成功的事情
            successCallback(d)
            return;
        }
        //失败的事情
        errorCallback(d)
    })
}
export default ajax;