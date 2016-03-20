title: 基类及基础要求
---

## 组件问题

### 统一基类

- 所有的**非 UI 组件**继承自 [class] 或 [base]
- 所有的**UI 组件**继承自 [widget] 或 widget 的子类
  - 复杂 UI 组件，应将 DOM 模板表示为一个或多个 handlebars 模板文件

### 接口规范

- 提供必要的 get/set 接口，如 getData/setData 用于外部对象获取或设置组件数据

### 消息传递

- 组件使用事件通知来向外部传递数据

### 插件机制

UI 较复杂的情况下，考虑通过 [plugins] 来优化代码结构
