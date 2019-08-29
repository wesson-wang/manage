import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import login from "../components/pages/login.vue"
import index from "../components/pages/index.vue"
//index下的left组件
import manage from "../components/pages/manage.vue"
import user from "../components/pages/user.vue"
import news from "../components/pages/news.vue"
import device from "../components/pages/device.vue"
//index重定向为欢迎页
import welcome from "../components/pages/welcome.vue"


//manage下边的组件
import manageList from "../components/pages/manageList.vue"
import manageCreate from "../components/pages/manageCreate.vue"
//user下边的组件
import userList from "../components/pages/userList.vue"
import userCreate from "../components/pages/userCreate.vue"
//news下边的组件
import newsList from "../components/pages/newsList.vue"
import newsCreate from "../components/pages/newsCreate.vue"
//device下边的组件
import deviceList from "../components/pages/deviceList.vue"
import deviceCreate from "../components/pages/deviceCreate.vue"

export default new Router({
  // mode:"history",
  routes: [{
    path:"/login",
    component:login,
    beforeEnter(to,from,next){
     localStorage.removeItem('user')
     next()
    }
   },{
     path:"/index",
     component:index,
     beforeEnter(to,from,next){
       if(to.path.indexOf('/index')==0||from.path=="/login"){
         if(localStorage.getItem('user')){
          next()
         }else{
           next("/login")
         }
      
       }
     },
     children:[{
       path:"manage",
       component:manage,
       beforeEnter(to,from,next){
         if(from.path=="/index"||to.path.indexOf("/manage")!=-1){
           if(localStorage.getItem("isAdmin")==0){
            next()
           }else{
            next("/login")
          }
          
         }
       },
       children:[{
         path:"create",
         name:"新建/修改管理员",
         component:manageCreate
       },{
        path:"",
        name:"管理员列表",
        component:manageList
      }]     
     },{
      path:"user",
      component:user,
      beforeEnter(to,from,next){
        if(from.path=="/index"||to.path.indexOf("/user")!=-1){
          if(localStorage.getItem("isAdmin")!=2){
           next()
          }else{
           next("/login")
         }
        }
        },
      children:[{
        path:"create",
        name:"新建/删除用户",
        component:userCreate
      },{
        path:"",
        name:"用户列表页",
        component:userList
      }]
    },{
      path:"news",
      component:news,
      children:[{
        path:"create",
        name:"添加/修改通知",
        component:newsCreate
      },{
        path:"",
        name:"通知列表页",
        component:newsList
      }]
    },{
      path:"device",
      component:device,
      children:[{
        path:"create",
        name:"添加/修改设备",
        component:deviceCreate
      },{
        path:"",
        name:"设备列表页",
        component:deviceList
      }]
    },{
      path:"welcome",
      component:welcome
    },{
      path:"",
      redirect:"/index/welcome"
    }],
    //守卫
    // beforeEnter(to,from,next){
    //   if(from.path=="/login"){
    //     next();
    //     return;
    //   }
    //  }
  },
    {
      path:"*",
      redirect:"/login"
    }
  ]
})
