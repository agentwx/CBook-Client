import computedBehavior from 'miniprogram-computed'
import { SIZE_MAP } from '../../constants/size'

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true
  },
  properties: {
    customClass: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: 'normal'
    },
    name: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'iconfont'
    },
    color: String
  },
  computed: {
    iconColor () {
      return this.data.color ? `color: ${this.data.color}` : ''
    },
    iconSize () {
      const { size } = this.data
      return `font-size:${SIZE_MAP[size] || size};`
    }
  }
})
