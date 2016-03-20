title: 模块粒度
date: "2015-02-23T13:15:20.490Z"
---

一个模块做一件/类事，一个类做一件/类事，一个方法做一件/类事，一个文件做一件/类事。

比如有一个会唱歌和跳舞的机器人：

```
// 伪语言
Class SDRobot extends Robot implements Singing and Dancing
```

![modular 3](/img/posts/modular-3.png)

- 它是一个模块
  - 它只做一件事：娱乐
- 它有两个子模块，Singing 和 Dancing
  - 模块 Singing 只做一件事：唱歌
  - 模块 Dancing 只做一件事：跳舞
- 模块 Singing 有两个文件
  - index.js 只做一件事：组织唱歌的逻辑
  - songs.json 只做一件事：保存结构化的歌曲条目
- 模块 Dancing 有两个文件
  - index.js 只做一件事：组织跳舞的逻辑
  - dances.json 只做一件事：保存结构化的舞蹈条目
- 它的基类 Robot 也是一个模块，同样只做一件事：定义自己的外观
  - 方法 renderBody() 只做一件事：渲染体型
  - 方法 renderSkin() 只做一件事：渲染肤色

P.S.

上文机器人程序可能有如下的文件结构（应尽量保持文件结构清晰）：

```
/robot/index.js
/sdrobot/modules/dancing/dances.json
/sdrobot/modules/dancing/index.js
/sdrobot/modules/singing/songs.json
/sdrobot/modules/singing/index.js
/sdrobot/index.js
```

其中，文件名统一使用小写字母，严禁使用大写字母，必要时可使用连字符“-”，如 `songs-hk.json`。
