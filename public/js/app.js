let parent;$(document).ready(function(){parent=new app($("body"))});let app=function(a){this.init(a)};app.prototype={init:function(a){let b=this;b.ele=a,b.helpPanelEle=b.ele.find("#help-panel"),b.helpPanel=new helpPanel(b.helpPanelEle),b.bikersPanelEle=b.ele.find("#bikers-panel"),b.bikersPanel=new bikersPanel(b.bikersPanelEle),b.userRegistrationPanelEle=b.ele.find("#user-registration-panel"),b.userRegistrationPanel=new userRegistrationPanel(b.userRegistrationPanelEle)}};