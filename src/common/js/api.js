//引入端口

//  const baseUrl="/api";
const baseUrl="";
//登录页接口
 const login=baseUrl+"/login"
//管理员接口
const findManage=baseUrl+"/findManage"
const updateManage=baseUrl+"/updateManage"
const addManage=baseUrl+"/addManage"
const delManage=baseUrl+"/delManage"
//用户接口
const findUser=baseUrl+"/findUser"
const updateUser=baseUrl+"/updateUser"
const addUser=baseUrl+"/addUser"
const delUser=baseUrl+"/delUser"
//通知接口
const findNews=baseUrl+"/findNews"
const updateNews=baseUrl+"/updateNews"
const addNews=baseUrl+"/addNews"
const delNews=baseUrl+"/delNews"
//设备接口
const findDevice=baseUrl+"/findDevice"
const updateDevice=baseUrl+"/updateDevice"
const addDevice=baseUrl+"/addDevice"
const delDevice=baseUrl+"/delDevice"
export default{
    baseUrl,
    login,
    findManage,
    updateManage,
    addManage,
    delManage,
    findUser,
    updateUser,
    addUser,
    delUser,
    findNews,
    updateNews,
    addNews,
    delNews,
    findDevice,
    updateDevice,
    addDevice,
    delDevice

}