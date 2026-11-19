# CopyQ: Search all tabs（跨 tab 搜索）

[CopyQ](https://hluk.github.io/CopyQ/) 自带的搜索框只过滤**当前 tab**。这个命令按一个全局快捷键弹出输入框，在**所有 tab** 里做不区分大小写的子串搜索，把命中项汇总到 `search results` tab 并打开。

- 条目正文保持原样，来源（`<tab 名> #<行号>`）写在条目备注里
- 每次搜索会重建 `search results` tab；结果 tab 里可以再用原生搜索框细筛
- 每个 tab 最多扫描 1000 条；约 1500 条全量扫描约 0.2s

## 安装

先打开 CopyQ，二选一：

**命令行（推荐）**

```bash
copyq eval "$(cat install.js)"
```

macOS 上如果找不到 `copyq`，用 `/Applications/CopyQ.app/Contents/MacOS/CopyQ` 代替。脚本是幂等的，重复执行只会更新。

**图形界面**

CopyQ → Commands（⌘/Ctrl+F6）→ Load Commands… → 选择 `cross-tab-search.ini` → OK。

## 使用

| 平台 | 快捷键 |
| --- | --- |
| macOS | ⌘ + F4 |
| Windows / Linux | Ctrl + F4 |

快捷键冲突的话，在 Commands 窗口里改 “Search all tabs” 的 Global Shortcut。

## 修改

改 `search.js`，然后运行 `./build.sh` 重新生成 `install.js` 和 `cross-tab-search.ini`。

## 踩过的坑

1. **命令文本含换行 → 全局快捷键静默失效**。CopyQ 会把多行命令存成带转义的引号串，命令在菜单里能跑，但快捷键完全无响应。所以脚本被 base64 成单行，用 `copyq: eval(str(fromBase64('...')))` 执行（CopyQ 没有 `atob`）。
2. **macOS 上修饰键映射反直觉**（Qt）：配置里 `ctrl` = ⌘ Command，`meta` = ⌃ Control，`alt` = ⌥ Option。
3. 脚本里修改命令要用 `setCommands()`，`addCommands()` 不会持久化。

## 兼容性

在 CopyQ 16.0.0（macOS arm64）上使用；依赖 `ItemSelection` 脚本 API，建议 CopyQ 7+。

---

**English**: A CopyQ command that searches across all tabs (case-insensitive substring) and collects matches into a `search results` tab. Install with `copyq eval "$(cat install.js)"` or import `cross-tab-search.ini` via Commands → Load Commands. Default global shortcut `ctrl+f4` (⌘+F4 on macOS).
