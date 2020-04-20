/* 配置基础的一些请求路径 */
// 配置为日常的请求的域名,数据的请求路径配置
let base = 'http://v8.python.youwoxing.net:8002';
// 检测判断是否在正式服上面，修改相应对应的正式服路径
if (location.href.indexOf('http://ybklocker.uboxol.com')=='0') {
    base = 'http://ybklocker.uboxol.com';
} else {
    
    // 不进行处理
}
// 公共的请求方法，剩下的所有的allget请求
export const allget = base;