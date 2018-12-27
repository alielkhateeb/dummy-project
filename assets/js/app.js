$(document).ready(function () {
    new app($('body'));
});

let app = function (ele) {
    this.init(ele);
};

app.prototype = {
    init: function (ele) {
        let me = this;
        me.ele = ele;

        me.helpPanelEle = me.ele.find('#help-panel');
        me.helpPanel = new helpPanel(me.helpPanelEle);
    }
};