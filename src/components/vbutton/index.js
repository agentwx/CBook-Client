import computedBehavior from 'miniprogram-computed'
import {button} from '../../mixins/button'
import {openType} from '../../mixins/open-type'
import {classNames} from '../../utils/classnames'

Component({
  externalClasses: ['loading-class'],
  behaviors: [button, openType, computedBehavior],
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
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    },
    icon: {
      type: String,
      value: ''
    },
    iconType: {
      type: String,
      value: 'iconfont'
    },
    iconSize: String,
    loadingClass: {
      type: String,
      value: ''
    }
  },

  computed: {
    classes() {
      const {type, size, block, plain, round, square, loading, disabled} = this.data
      return classNames('button', `button--${type}`, `button--${size}`, {
        'button--block': block,
        'button--round': round,
        'button--plain': plain,
        'button--square': square,
        'button--loading': loading,
        'button--disabled': disabled,
        'button--unclickable': disabled || loading
      })
    }
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('tap')
      }
    }
  }
})
