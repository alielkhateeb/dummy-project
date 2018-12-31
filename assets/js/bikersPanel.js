let bikersPanel = function (ele) {
    this.init(ele);
};

bikersPanel.prototype = {
    init: function (ele) {
        let me = this;
        me.ele = ele;

        me.bikersTable = me.ele.find('#bikers-table');
        me.bikersTableBody = me.bikersTable.find('tbody');
        me.bikersTableRows = me.bikersTableBody.find('tr:not(.clone)');
        me.newBikerRowToClone = me.bikersTableBody.find('tr.biker.clone');

        me.bindDeleteBikerButton();
    },
    appendNewBiker: function(biker) {
        //TODO: add no-bikers panel logic
        console.log(biker);
        let me = this;

        let daysOfWeek;
        if (biker.daysOfWeek && biker.daysOfWeek.length) {
            let daysOfWeekTextArray = [];
            for (let day of biker.daysOfWeek) {
                let dayText = moment().day(day).format('ddd');
                daysOfWeekTextArray.push(dayText);
            }
            daysOfWeek = daysOfWeekTextArray.join(', ');
        } else {
            daysOfWeek = 'None';
        }

        let newBikerRow = me.newBikerRowToClone.clone();
        newBikerRow.attr('data-id', biker._id);
        newBikerRow.find('.full-name').text(biker.fullName);
        newBikerRow.find('.email').text(biker.email);
        newBikerRow.find('.city').text(biker.city);
        newBikerRow.find('.ride-in-group').text(biker.rideInGroupText);
        newBikerRow.find('.days-of-week').text(daysOfWeek);
        newBikerRow.find('.registration-date').prepend(moment(biker.createdAt).format('DD/MM/Y'));
        newBikerRow.find('.time').text(moment(biker.createdAt).format('HH:mmA'));

        newBikerRow.removeClass('hide clone');
        console.log(newBikerRow);
        me.bikersTableBody.prepend(newBikerRow);
    },
    bindDeleteBikerButton: function () {
        //TODO: add no-bikers panel logic
        let me = this;

        me.bikersTableBody.on('click', '.actions .delete-icon', function () {
            let bikerToDelete = $(this).parents('tr.biker');
            $.ajax({
                method: 'DELETE',
                url: '/biker' + `?id=${bikerToDelete.data('id')}`,
                success: function (data) {
                    if (data.success) {
                        //TODO: add animation
                        //TODO: add undo button
                        bikerToDelete.remove();
                        alertify.success('Biker has been deleted successfully.');
                    } else {
                        alertify.error(data.message);
                    }
                },
                error: function () {
                    alertify.error('Sorry, an error occurred. Please try again later')
                }
            })
        });
    },
};