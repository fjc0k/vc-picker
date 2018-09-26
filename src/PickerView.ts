import Vue, { CreateElement, VNode } from 'vue'
import { Directions, PickerData, PickerValue, RawPickerData, Status } from './interfaces'
import { bindEvent, normalizeData } from './utils'

export default Vue.extend({
  name: 'VPickerView',

  props: {
    value: {
      type: Array as () => PickerValue,
      required: true
    },
    data: {
      type: Array as () => RawPickerData,
      required: true
    },
    preData: {
      type: Array as () => RawPickerData,
      default: (): RawPickerData => []
    },
    postData: {
      type: Array as () => RawPickerData,
      default: (): RawPickerData => []
    },
    primaryKey: [String, Number],
    cascaded: {
      type: Boolean,
      default: false
    }
  },

  data: (): {
    localValue: PickerValue,
    localData: PickerData,
    disposes: Array<() => void>,
    status: Status,
    direction: Directions,
    startT: number,
    startX: number,
    startY: number,
    preX: number,
    preY: number
  } => ({
    localValue: [],
    localData: [],
    disposes: [],
    status: Status.WAITING,
    direction: Directions.NONE,
    startT: 0,
    startX: 0,
    startY: 0,
    preX: 0,
    preY: 0
  }),

  watch: {
    value: {
      immediate: true,
      handler(newValue: PickerValue) {
        this.localValue = newValue
      }
    },
    data: {
      immediate: true,
      handler(newData: RawPickerData) {
        this.localData = normalizeData(newData, this.cascaded)
      }
    }
  },

  beforeDestroy() {
    let dispose
    while (dispose = this.disposes.pop()) {
      dispose()
    }
  },

  methods: {
    startOrUpdate() {
      const viewEl = this.$refs.view as HTMLElement
      const targetEl = window
      this.disposes.push(
        bindEvent(viewEl, 'touchstart', this.handleTouchStart.bind(this)),
        bindEvent(targetEl, 'touchmove', this.handleTouchMove.bind(this)),
        bindEvent(targetEl, 'touchend', this.handleTouchEnd.bind(this)),
        bindEvent(targetEl, 'touchcancel', this.handleTouchCancel.bind(this))
      )
    },
    handleTouchStart(e: TouchEvent) {
      this.status = Status.STARTED
      this.startT = new Date().getTime()
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
      this.preX = this.startX
      this.preY = this.startY
    },
    handleTouchMove(e: TouchEvent) {
      if (this.status & Status.STARTED) {
        const currentX = e.touches[0].pageX
        const currentY = e.touches[0].pageY
        const deltaX = currentX - this.preX
        const deltaY = currentY - this.preY
        const deltaD = Math.abs(deltaX) - Math.abs(deltaY)
        if (deltaD > 0) return
        this.status |= Status.MOVING
        this.direction = deltaY > 0 ? Directions.UP : Directions.DOWN
        console.log('handleTouchMove')
      }
    },
    handleTouchEnd(e: TouchEvent) {
      if (this.status & Status.MOVING) {
        this.status = Status.ENDED
        console.log('handleTouchEnd')
      }
    },
    handleTouchCancel(e: TouchEvent) {
      if (this.status & Status.STARTED) {
        console.log('handleTouchEnd')
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.startOrUpdate()
    })
  },

  render(h: CreateElement): VNode {
    return h('div', { staticClass: 'vc-picker-view', ref: 'view' }, [
      h('div', { staticClass: 'vc-picker-content' }, [
        h('div', { staticClass: 'vc-picker-group' })
      ])
    ])
  }
})
