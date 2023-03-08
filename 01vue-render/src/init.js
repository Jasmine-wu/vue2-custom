import { initState } from "./state";
import { compileToFunction } from "./compile/index";
import { mountComponent } from "./lifeCicle";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    // 1.data数据劫持
    initState(vm);

    // 2.实现挂载
    if (options.el) {
      vm.$mount(options.el);
    }

    // 
  };

  Vue.prototype.$mount = function (el) {
    console.log("开始挂载了");
    const vm = this;
    const opt = vm.$options;

    el = document.querySelector(el);

    // 1.根据模版生成render函数
    // 1.如果没有render函数
    if (!opt.render) {
      // 2.看有没有template
      let template;
      // 3.如果没有template但是有el,那么模版就是el的outerHtml
      if (!template && el) {
        template = el.outerHTML;
      } else {
        if (el) {
          // 4.如果写了template项，则template就是模版
          template = opt.template;
        }
      }

      // 将template转换成渲染函数
      if (template && el) {
        const render = compileToFunction(template);
        opt.render = render;
      }

      //
    }

    // 2.组件挂载
    // 组件挂载以及初始渲染时根实例挂载
    mountComponent(vm, el);
  };
}
