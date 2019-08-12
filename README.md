# hash-router插件说明

## 用途

- 为单页面应用提供路由状态管理

## 使用方法

- 在页面内引用

```html
<script src="./hash-router.js"></script>
```

- 使用a标签配置路由

```html
<li>
    <a href="#first">first page</a>
    <a href="#second">second page</a>
    <a href="#third">third page</a>
</li>
```

- 使用js调用方法注册路由

```html
<script>
    window.onload = function() {
        // 配置跳转的路由
        $hashRouter.route('first',()=>{
            document.getElementById('content').innerHTML='<button>there is the first page</button>';
        });
        // 配置404页面
        $hashRouter.notFound(()=>{
            document.getElementById('content').innerHTML='<button>404!</button>';
        });
        // 初始化
        $hashRouter.init();
    }
</script>
```

## API

### $hashRouter.init()

· 执行路由初始化工作，在配置好路由后执行。

### $hashRouter.listen(event)

- 对window的事件开启监听，绑定render函数

### $hashRouter.route(path, callback)

- 注册路由，绑定该路由对应的渲染逻辑

### $hashRouter.has(path)

- 判断某个路由是否注册，返回布尔值

### $hashRouter.notFound(callback)

- 配置404页面的渲染逻辑，默认会console.error

### $hashRouter.go(path)

- 主动跳转函数，跳转至某个页面

### $hashRouter.render()

- 执行配置的当前页面的渲染函数
