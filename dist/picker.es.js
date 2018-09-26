/*!
 * laa v0.1.0
 * (c) 2018-present Jay Fong <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
import Vue from 'vue';

var inBrowser = typeof window !== 'undefined';
var DEFAULT_EVENT_OPTIONS = { passive: false, capture: false };
function bindEvent(el, type, listener, options) {
    if (options === void 0) { options = DEFAULT_EVENT_OPTIONS; }
    el.addEventListener(type, listener, options);
    return function () { return unbindEvent(el, type, listener, options); };
}
function unbindEvent(el, type, listener, options) {
    if (options === void 0) { options = DEFAULT_EVENT_OPTIONS; }
    el.removeEventListener(type, listener, options);
}

var Directions;
(function (Directions) {
    Directions[Directions["NONE"] = 1] = "NONE";
    Directions[Directions["LEFT"] = 2] = "LEFT";
    Directions[Directions["RIGHT"] = 4] = "RIGHT";
    Directions[Directions["UP"] = 8] = "UP";
    Directions[Directions["DOWN"] = 16] = "DOWN";
    Directions[Directions["HORIZONTAL"] = 6] = "HORIZONTAL";
    Directions[Directions["VERTICAL"] = 24] = "VERTICAL";
    Directions[Directions["START"] = 10] = "START";
    Directions[Directions["END"] = 20] = "END";
})(Directions || (Directions = {}));
var Status;
(function (Status) {
    Status[Status["WAITING"] = 1] = "WAITING";
    Status[Status["STARTED"] = 2] = "STARTED";
    Status[Status["MOVING"] = 4] = "MOVING";
    Status[Status["FIRST_MOVE"] = 8] = "FIRST_MOVE";
    Status[Status["ENDED"] = 16] = "ENDED";
    Status[Status["IN_TRANSITION"] = 32] = "IN_TRANSITION";
    Status[Status["CANCELED"] = 64] = "CANCELED";
})(Status || (Status = {}));
var PickerView = Vue.extend({
    name: 'VcPickerView',
    props: {
        value: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        preData: {
            type: Array,
            default: function () { return []; }
        },
        postData: {
            type: Array,
            default: function () { return []; }
        },
        primaryKey: [String, Number],
        cascaded: {
            type: Boolean,
            default: false
        }
    },
    data: function () { return ({
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
    }); },
    watch: {
        value: {
            immediate: true,
            handler: function (newValue) {
                this.localValue = newValue;
            }
        },
        data: {
            immediate: true,
            handler: function (newData) {
                this.localData = newData;
            }
        }
    },
    beforeDestroy: function () {
        var dispose = this.disposes.pop();
        while (dispose) {
            dispose();
            dispose = this.disposes.pop();
        }
    },
    methods: {
        startOrUpdate: function () {
            var viewEl = this.$refs.view;
            var targetEl = window;
            this.disposes.push(bindEvent(viewEl, 'touchstart', this.handleTouchStart.bind(this)), bindEvent(targetEl, 'touchmove', this.handleTouchMove.bind(this)), bindEvent(targetEl, 'touchend', this.handleTouchEnd.bind(this)), bindEvent(targetEl, 'touchcancel', this.handleTouchCancel.bind(this)));
        },
        handleTouchStart: function (e) {
            this.status = Status.STARTED;
            this.startT = new Date().getTime();
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
            this.preX = this.startX;
            this.preY = this.startY;
        },
        handleTouchMove: function (e) {
            if (this.status & Status.STARTED) {
                var currentX = e.touches[0].pageX;
                var currentY = e.touches[0].pageY;
                var deltaX = currentX - this.preX;
                var deltaY = currentY - this.preY;
                var deltaD = Math.abs(deltaX) - Math.abs(deltaY);
                if (deltaD > 0)
                    return;
                this.status |= Status.MOVING;
                this.direction = deltaY > 0 ? Directions.UP : Directions.DOWN;
                console.log('handleTouchMove');
            }
        },
        handleTouchEnd: function (e) {
            if (this.status & Status.MOVING) {
                this.status = Status.ENDED;
                console.log('handleTouchEnd');
            }
        },
        handleTouchCancel: function (e) {
            if (this.status & Status.STARTED) {
                console.log('handleTouchEnd');
            }
        }
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.startOrUpdate();
        });
    },
    render: function (h) {
        return h('div', { staticClass: 'vc-picker-view', ref: 'view' }, [
            h('div', { staticClass: 'vc-picker-content' }, [
                h('div', { staticClass: 'vc-picker-group' })
            ])
        ]);
    }
});

var picker = {
    PickerView: PickerView,
    install: function (Vue$$1) {
        Vue$$1.component(PickerView.options.name, PickerView);
    },
};
if (inBrowser && window.Vue !== undefined) {
    window.Vue.use(picker);
}

export default picker;
