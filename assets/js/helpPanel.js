let helpPanel = function (ele) {
    this.init(ele);
};

helpPanel.prototype = {
    init: function (ele) {
        let me = this;
        me.ele = ele;

        me.helpTitle = me.ele.find('.help-title');
        me.helpBody = me.ele.find('.help-body');
        me.helpCloseButton = me.helpTitle.find('.help-close');
        me.helpOpenButton = me.helpTitle.find('.help-open');

        me.helpTitle.on('click', function () {
            me.helpBody.toggleClass('expanded');
            me.helpCloseButton.toggleClass('hide');
            me.helpOpenButton.toggleClass('hide');
        });
    }
};