let userRegistrationPanel = function (ele) {
    this.init(ele);
};

userRegistrationPanel.prototype = {
    init: function (ele) {
        let me = this;
        me.ele = ele;

        me.bindAddNewBikerFormSubmit();
        me.bindCancelForm();
    },
    getFormData: function () {
        let me = this;

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

        return formData;
    },
    bindAddNewBikerFormSubmit: function () {
        let me = this;
        me.addNewBikerForm = me.ele.find('form');

        me.addNewBikerForm.on('submit', function (e) {
            e.preventDefault();

            let url = me.addNewBikerForm.attr('action');
            let formData = me.getFormData();

            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                success: function (data) {
                    if (data.success) {
                        data.biker.rideInGroupText = data.rideInGroupText;
                        data.biker.daysOfWeekText = data.daysOfWeekText;
                        parent.bikersPanel.appendNewBiker(data.biker);
                        me.addNewBikerForm.get(0).reset();
                        alertify.success('A new biker has been added successfully.');
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
    bindCancelForm: function () {
        let me = this;
        me.cancelFormButton = me.addNewBikerForm.find('button.cancel');

        me.cancelFormButton.on('click', function (e) {
            e.preventDefault();
            me.addNewBikerForm.get(0).reset();
        });
    }
};