let parent;
$(document).ready(function () {
    parent = new app($('body'));
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

        me.bikersPanelEle = me.ele.find('#bikers-panel');
        me.bikersPanel = new bikersPanel(me.bikersPanelEle);

        me.userRegistrationPanelEle = me.ele.find('#user-registration-panel');
        me.userRegistrationPanel = new userRegistrationPanel(me.userRegistrationPanelEle );
    }
};