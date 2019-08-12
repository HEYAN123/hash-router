;(function() {
    console.log('hello hash-router');
    // 路由管理器
    function Router() {
        // 记录跳转历史，是一个栈结构
        this.hashStack = [];
        // 记录路由信息和对应的callback并初始化404回调
        this.routes = {
            '404': () => {console.error('cannot find the page correspond to your current url!');}
        };
        // 记录当前的url
        this.curUrl = '';
    }

    // 路由初始化
    Router.prototype.init = function() {
        this.listen('load');
        this.listen('hashchange');
        this.render();
    }

    // 监听hashchange事件，当路由跳转时会执行render函数
    Router.prototype.listen = function(event) {
        window.addEventListener(event, ()=>this.render());
    }

    // 路由注册
    Router.prototype.route = function(path, callback) {
        this.routes[path] = callback || function() {};
    }
    // 判断新添加的路由是否已经存在
    Router.prototype.has = function(path) {
        if(this.routes[path]) return true;
        return false;
    }

    // 对外暴露的配置404的方法
    Router.prototype.notFound = function(callback) {
        if(callback) this.routes['404'] = callback;
    }

    // 路由跳转方法
    Router.prototype.go = function(hash) {
        location.hash = hash;
    }

    // 路由跳转后执行的渲染方法
    Router.prototype.render = function() {
        Router.prototype.notFound();
        this.curUrl = location.hash.slice(1) || '/'; // 'first'
        this.hashStack.push(this.curUrl);
        (!this.routes[this.curUrl]) ? this.routes['404']() : this.routes[this.curUrl]();
    }
    // 实例化
    var hashRouter = new Router();
    // 挂载到全局上
    window.$hashRouter = hashRouter;
})();