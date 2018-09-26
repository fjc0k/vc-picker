import Vue from 'vue'
import picker from '../src'
import './index.css'

Vue.use(picker)

const list = []
while (list.length < 100) {
  list.push(0)
}

console.log(picker)

new Vue({ // tslint:disable-line
  el: '#app',
  render: h => h('div', [
    h('div', '自 1.10.0 版本以后，bounce 可以支持关闭某些边的回弹效果，可以设置对应边的 key 为 false 即可。'),
    h(
      'v-picker-view',
      {
        staticClass: 'item', attrs: {
          data: [[
            { label: '方剑成', value: '124' },
            { label: '方剑成2', value: '1242' }
          ]],
          value: []
        }
      },
      [
        'item'
        // h('img', { attrs: { src: `http://alloyteam.github.io/AlloyTouch/example/asset/ci${index + 1}.jpg` } })
        // h('textarea', { attrs: { rows: 2 } })
      ]
    )
  ])
})
