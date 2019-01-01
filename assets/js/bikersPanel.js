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
        me.noBikersPanel = me.ele.find('#no-bikers');

        me.bindDeleteBikerButton();
    },
    /**
     * Append the newly added biker to the DOM
     *
     * @param biker
     */
    appendNewBiker: function(biker) {
        let me = this;

        me.noBikersPanel.addClass('hide');
        me.bikersTable.removeClass('hide');

        console.log(biker);
        let newBikerRow = me.newBikerRowToClone.clone();
        newBikerRow.attr('data-id', biker._id);
        newBikerRow.find('.full-name').text(biker.fullName);
        newBikerRow.find('.email').text(biker.email);
        newBikerRow.find('.city').text(biker.city);
        newBikerRow.find('.ride-in-group').text(biker.rideInGroupText);
        newBikerRow.find('.days-of-week').text(biker.daysOfWeekText);
        newBikerRow.find('.registration-date').prepend(moment(biker.createdAt).format('DD/MM/Y'));
        newBikerRow.find('.time').text(moment(biker.createdAt).format('HH:mmA'));

        newBikerRow.removeClass('hide clone');
        me.bikersTableBody.prepend(newBikerRow);
    },
    /**
     * Bind the delete biker button
     */
    bindDeleteBikerButton: function () {
        let me = this;

        me.bikersTableBody.on('click', '.actions .delete-icon', function () {
            let bikerToDelete = $(this).parents('tr.biker');
            $.ajax({
                method: 'DELETE',
                url: '/biker' + `?id=${bikerToDelete.data('id')}`,
                success: function (data) {
                    if (data.success) {
                        bikerToDelete.remove();
                        alertify.success('Biker has been deleted successfully.');
                        if (!me.bikersTableBody.find('tr:not(.clone)').length) {
                            me.noBikersPanel.removeClass('hide');
                            me.bikersTable.addClass('hide');
                        }
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