import { VueConstructor } from 'vue'
import PickerView from './PickerView'
import { inBrowser } from './utils'

const picker = {
  PickerView,
  install: (Vue: VueConstructor) => {
    Vue.component((PickerView as any).options.name, PickerView)
  }
}

if (inBrowser && (window as any).Vue !== undefined) {
  (window as any).Vue.use(picker)
}

export default picker
