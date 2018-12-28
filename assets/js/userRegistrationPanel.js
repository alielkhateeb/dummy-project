let userRegistrationPanel = function (ele) {
    this.init(ele);
};

userRegistrationPanel.prototype = {
    init: function (ele) {
        let me = this;
        me.ele = ele;

        me.bindAddNewBikerForm();
    },
    bindAddNewBikerForm: function () {
        let me = this;
        me.addNewBikerForm = me.ele.find('form');

        me.addNewBikerForm.on('submit', function (e) {
            e.preventDefault();

            let url = me.addNewBikerForm.attr('action');
            let formDataSerialized = me.addNewBikerForm.serializeArray();
            let formData = {daysOfWeek: []};
            for (let formKey of formDataSerialized) {
                if (formKey.name === 'daysOfWeek') {
                    formData[formKey.name].push(formKey.value);
                } else {
                    let value = formKey.value.trim();
                    if (value) {
                        formData[formKey.name] = value;
                    }
                }
            }

            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                success: function (data) {
                    if (data.success) {
                        me.appendNewBiker(data.biker);
                        alertify.success('A new biker has been added');
                    } else {
                        alertify.error(data.message);
                    }
                },
                error: function () {
                    alertify.error('Sorry, an error occurred. Please try again later')
                }
            });
        });
    },
    appendNewBiker: function(biker) {
        console.log(biker);
    }
};