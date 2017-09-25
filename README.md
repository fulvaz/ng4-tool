### ng4-tool

- 支持初始化Angular4单页面项目（暂时必须配置CDN以及git、gitlab部署）。
- 支持快速创建component、module、directive、ngrx、pipe等文件。
- 支持ngrx4。
- 支持单元测试。
- 暂时只支持AOT模式。

`ng4 init` 初始化基于Angular4的整个项目，暂不支持目录设置，默认初始到命令行 `pwd` 当前目录。

`ng4 create` 快速创建component、module、directive、ngrx、pipe等文件 ，使用 `ng4 -h` 查看参数配置。

- `-t` 支持c`component`、m`module`、d`directive`、n`ngrx`、p`pipe等文件`，默认为`component`类型。
- `-n` 文件名及组件名，默认为template及Template。`ng4 -n test` 文件名为 `test.[-t].ts` 组件名为 `Test[-t]` 
- `-p` 路径暂时只支持相对路径