
import LoadingComponent from './loading';
const Loading = {};
Loading.install = function (Vue) {
    //生成一个vue的子类，同时这个子类也就是组件
    const ToastConstructor = Vue.extend(LoadingComponent);
    //生成 改子类的一个实例
    const instance = new ToastConstructor();
    //将这个实例挂载到创建的div上，并将div加入到全局挂载点内部
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);    

    //注入vue的原型链
    Vue.prototype.$loading = {
        show(){
            instance.show = true;
        },
        close(){
            instance.show = false;
        }
    }
}

export default Loading;