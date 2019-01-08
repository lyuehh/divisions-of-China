说明
=====

最新中国行政区域规划(2017年12月), 数据来自<http://www.mca.gov.cn/article/sj/tjbz/a/2018/201803131439.html>, 数据有3级, 精确到区县。

数据文件为 201712.json，另外还有一份 201610.json 的数据。

更新
=====

* 如果将来数据有更新
* `curl -s http://www.mca.gov.cn/article/sj/tjbz/a/2016/20161010/201612021606.html > xx.html`, 替换其中的 url 为最新的 url
* 修改 `process.js` 里第三行的文件名
* 执行 `node process.js > all.json`
* done


开发
====

* 安装 node.js
* clone 项目
* `cd divisions-of-China; npm install`
* 执行 `node process.js > all.json` 即可
