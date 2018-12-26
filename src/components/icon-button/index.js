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
    color: String,
    backgroundColor: String
  },
  computed: {
    bound () {
      let { size } = this.data
      size = parseFloat(SIZE_MAP[size] || size)
      return size + size / 2
    }
  }
})
