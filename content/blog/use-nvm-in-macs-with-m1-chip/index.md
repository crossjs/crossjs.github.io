---
title: Use NVM in Macs with M1 chip
date: "2022-10-10T12:28:09Z"
---

较低版本的 Node，比如 v12 与 v14，会报：

```
bad CPU type in executable: node
```

此时只要执行：

```bash
softwareupdate --install-rosetta
```

即可。
