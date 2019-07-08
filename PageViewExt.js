// 注意：btn，touch事件可能都会牵扯导致不正常
// 需要修改下cocos2d-js 的_doDispatchEvent 里 _capturingListeners非空判断
cc.Class({
    extends: cc.PageView,
    // 隐藏一些来自 scrollview的面板属性
    editor: {
        menu: 'i18n:MAIN_MENU.component.ui/PageView',
        help: 'i18n:COMPONENT.help_url.pageview',
        inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
        executeInEditMode: false
    },
    /** 源码处理嵌套的函数
     *
     * @param {*} event
     * @param {*} captureListeners
     * @return {是否吞噬} true
     */
    _hasNestedViewGroup(event, captureListeners) {
        if (event.eventPhase !== cc.Event.CAPTURING_PHASE) {
            return;
        }
        if (!event.touch) {
            return;
        }
        const moveDelta = event.touch.getDelta();
        // TODO： 2.如果是上移移动则直接吞噬
        if (captureListeners) {
            for (let i = 0; i < captureListeners.length; ++i) {
                const item = captureListeners[i];
                if (item) {
                    // 自身节点
                    if (this.node === item) {
                        if (moveDelta.y === 0) {
                            return false;
                        }
                        // if (event.target.getComponent(cc.ViewGroup)) {
                        //     return false;
                        // }
                    }
                    // 其他节点但有viewGroup
                    if (item.getComponent(cc.ViewGroup)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
});