var fs = require('fs') 
var cheerio = require('cheerio')
var html = fs.readFileSync('./201610.html', {encoding: 'utf-8'})
var $ = cheerio.load(html)

var $trs = $('table tr')
var ret = []
var zhixia = ["北京市", "上海市", "天津市", "重庆市"]

// 略过前面的title行
$trs = $trs.slice(3)
// 省Id
var provId = -1
// 市的Id
var cityId = -1

for (var i=0;i<$trs.length;i++) {
  var $tr = $($trs[i])
  var $tds = $tr.find('td')
  var id = $tds.eq(1).text()
  var name = $tds.eq(2).text()

  // 跳过后面的行
  if ($tr.text().indexOf('暂缺地市和区县信息') !== -1) {
    break
  }

  if (id.endsWith('0000')) {
    // 省, 直辖市
    provId++
    cityId = -1
    // console.log('provId: %d, id: %s, name: %s', provId, id, name);

    ret.push({
      id: id,
      value: name.trim()
    })

  } else if (id.endsWith('00')) {
    // 市
    cityId++

    // console.log('cityId: %d, id: %s, name: %s', cityId, id, name);
    ret[provId].children =  ret[provId].children || []
    ret[provId].children.push({
      id: id,
      value: name.trim()
    })
  } else {
    // 北京, 天津, 上海， 重庆
    if (id.startsWith('11') || id.startsWith('12') || id.startsWith('31') || id.startsWith('50') ) { // 直辖市，特殊处理
      ret[provId].children = ret[provId].children || []
      ret[provId].children.push({
        id: id,
        value: name.trim()
      })
    } else {
      // 区，县
      // console.log('provId: %d, cityId: %d, id: %s, name: %s, i: %d', provId, cityId, id, name, i);

      ret[provId].children[cityId].children = ret[provId].children[cityId].children || []
      ret[provId].children[cityId].children.push({
        id: id,
        value: name.trim()
      })
    }
  }
}

console.log(JSON.stringify(ret, null, 2));

