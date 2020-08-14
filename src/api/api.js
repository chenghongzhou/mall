/* 配置基础的一些请求路径 */
// 配置为日常的请求的域名,数据的请求路径配置
let baseLogin = 'http://v8message.dev.youwoxing.net';
let base = 'http://v8.python.dev.youwoxing.net:8003';
let baseZHh = 'http://v8.python.dev.youwoxing.net:9001';
let redirectUrih = 'http%3A%2F%2Fv8homepage.dev.youwoxing.net';
let homeUrlh = 'http://v8homepage.dev.youwoxing.net';
// 检测判断是否在正式服上面，修改相应对应的正式服路径
if (location.href.indexOf('http://v8homepage.youwoxing.net')=='0') {
    baseLogin = 'http://v8message.youwoxing.net';
    base = 'http://v8.python.youwoxing.net:8003';
    baseZHh = 'http://v8.python.youwoxing.net:9001';
    redirectUrih = 'http%3a%2f%2fv8homepage.youwoxing.net';
    homeUrlh = 'http://v8homepage.youwoxing.net';
} else {
    
    // 不进行处理
}
// 公共的请求方法，剩下的所有的allget请求
export const allgetLogin = baseLogin;
export const allget = base;
export const baseZH = baseZHh;
export const redirectUri = redirectUrih;
export const homeUrl = homeUrlh;