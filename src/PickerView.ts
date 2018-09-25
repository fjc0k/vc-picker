import Vue, { CreateElement, VNode } from 'vue'

export type VCPickerData = Array<{
  label: string | number,
  value: any,
  children?: VCPickerData
}>

export default Vue.extend({
 props: {
   value: {
     type: Array,
     required: true
   },
   data: Array as VCPickerData,
   preData: {
     type: Array,
     default: () => []
   },
   postData: {
     type: Array,
     required: true
   },
   primaryKey: [String, Number],
   cascaded: {
     type: Boolean,
     default: false
   }
 },

 data: (): {
   localValue: any[],
   localData: any[]
  } => ({
   localValue: [],
   localData: []
 }),

 watch: {
   value: {
     immediate: true,
     handler(newValue: any[]): void {
       this.localValue = newValue
     }
   },
   data: {
     immediate: true,
     handler(newData: any[]): void {
       this.localData = newData
     }
   }
 },

 render(h: CreateElement): VNode {
  return h('div', { staticClass: 'view' })
 }
})
