import computedBehavior from 'miniprogram-computed'
import { touch } from '../../mixins/touch'

const THRESHOLD = 0.15

Component({
  behaviors: [computedBehavior, touch],
  options: {
    addGlobalClass: true,
    multipleSlots: true
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
    disabled: Boolean,
    leftWidth: {
      type: Number,
      value: 0
    },
    rightWidth: {
      type: Number,
      value: 0
    },
    asyncClose: Boolean
  },

  data: {
    offset: 0,
    draging: false
  },

  computed: {
    wrapperStyle() {
      const {offset, draging} = this.data
      return `
        transform: translate3d(${offset}px, 0, 0);
        transition: ${draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'};
      `
    }
  },

  methods: {
    onTransitionend() {
      this.swipe = false
    },

    open(position) {
      const {leftWidth, rightWidth} = this.data
      const offset = position === 'left' ? leftWidth : -rightWidth
      this.swipeMove(offset)
      this.resetSwipeStatus()
    },

    close() {
      this.setData({offset: 0})
    },

    resetSwipeStatus() {
      this.swiping = false
      this.opened = true
    },

    swipeMove(offset = 0) {
      this.setData({offset})
      offset && (this.swiping = true)
      !offset && (this.opened = false)
    },

    swipeLeaveTransition(direction) {
      const {offset, leftWidth, rightWidth} = this.data
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD

      // right
      if (direction > 0 && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right')
        // left
      } else if (direction < 0 && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left')
      } else {
        this.swipeMove()
      }
    },

    startDrag(event) {
      if (this.data.disabled) {
        return
      }

      this.setData({draging: true})
      this.touchStart(event)

      if (this.opened) {
        this.startX -= this.data.offset
      }
    },

    onDrag(event) {
      if (this.data.disabled) {
        return
      }

      this.touchMove(event)
      const {deltaX} = this
      const {leftWidth, rightWidth} = this.data

      if (
        (deltaX < 0 && (-deltaX > rightWidth || !rightWidth)) ||
        (deltaX > 0 && (deltaX > leftWidth || (deltaX > 0 && !leftWidth)))
      ) {
        return
      }

      if (this.direction === 'horizontal') {
        this.swipeMove(deltaX)
      }
    },

    endDrag() {
      if (this.data.disabled) {
        return
      }

      this.setData({draging: false})
      if (this.swiping) {
        this.swipeLeaveTransition(this.data.offset > 0 ? -1 : 1)
      }
    },

    onClick(event) {
      const {key: position = 'outside'} = event.currentTarget.dataset
      this.triggerEvent('click', position)

      if (!this.data.offset) {
        return
      }

      if (this.data.asyncClose) {
        this.triggerEvent('close', {position, instance: this})
      } else {
        this.swipeMove(0)
      }
    }
  }
})
