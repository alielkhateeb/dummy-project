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

        me.userRegistrationPanelEle = me.ele.find('#user-registration-panel');
        me.userRegistrationPanel = new userRegistrationPanel(me.userRegistrationPanelEle );
    }
};