let mongoose = require('mongoose');
let moment = require('moment');

const Schema = mongoose.Schema;

const BikerSchema = new Schema({
    fullName: String,
    email: String,
    city: String,
    /**
     * 0: Always | 1: Sometimes | 2: Never
     */
    rideInGroup: {type: Number, min: 0, max: 2},
    daysOfWeek: Array,
    deleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
});

BikerSchema.methods = {
    /**
     * Get the text output of all days of week selected
     *
     * @returns {string}
     */
    getDaysOfWeekText: function () {
        if (this.daysOfWeek && this.daysOfWeek.length) {
            if (this.daysOfWeek.length === 7) {
                return 'Every day'
            }

            if (this.isWeekdays()) {
                return 'Week days';
            }

            if (this.isWeekends()) {
                return 'Weekends';
            }

            let daysOfWeekTextArray = [];
            for (let day of this.daysOfWeek) {
                let dayText = moment().day(day).format('ddd');
                daysOfWeekTextArray.push(dayText);
            }

            return daysOfWeekTextArray.join(', ');
        } else {
            return 'None';
        }
    },
    /**
     * Check if the days selected are weekdays
     *
     * @returns {boolean}
     */
    isWeekdays: function () {
        if (this.daysOfWeek.length !== 5) {
            return false;
        }

        for (let day of this.daysOfWeek) {
            if (day === "0" || day === "6") {
                return false;
            }
        }

        return true;
    },
    /**
     * Check if the days selected are weekends
     *
     * @returns {boolean}
     */
    isWeekends: function () {
        if (this.daysOfWeek.length !== 2) {
            return false;
        }

        for (let day of this.daysOfWeek) {
            if (day !== "0" && day !== "6") {
                console.log('returning');
                return false;
            }
        }

        return true;
    }
};

BikerSchema.statics = {
    /**
     * Get all (non-deleted) bikers
     *
     * @returns {Promise<[Biker]>}
     */
    getAllBikers: async function () {
        return await this.find({deleted: false}).sort({createdAt: -1}).exec();
    },
    /**
     * Get the text output of all days of week selected for a set of bikers
     *
     * @param bikers
     * @returns {Array}
     */
    getDaysOfWeekText: function (bikers) {
        let daysOfWeek = [];
        for(let biker of bikers) {
            daysOfWeek[biker.id] = biker.getDaysOfWeekText();
        }

        return daysOfWeek;
    },
    /**
     * Get registration date and time formatted for a set of bikers.
     *
     * @param bikers
     * @returns {Array}
     */
    getRegistrationDateTime: function (bikers) {
        let registrationDateTime = [];
        for(let biker of bikers) {
            registrationDateTime[biker.id] = {
                date: moment(biker.createdAt).format('DD/MM/Y'),
                time: moment(biker.createdAt).format('HH:mmA')
            };
        }

        return registrationDateTime;
    },
    /**
     * Create a new biker
     *
     * @param data
     * @returns {Promise<void>}
     */
    createNew: async function (data) {
        let newBiker = {
            fullName: data.fullName,
            email: data.email,
            rideInGroup: data.rideInGroup,
        };
        if (data.city) {
            newBiker.city = data.city;
        }
        if (data['daysOfWeek[]']) {
            newBiker.daysOfWeek = data['daysOfWeek[]'];
        }

        try {
            return await Biker.create(newBiker);
        } catch (err) {
            throw new Error(err.message);
        }
    },
    /**
     * Delete a biker
     *
     * @param id
     * @returns {Promise<boolean>}
     */
    deleteBiker: async function (id) {
        try {
            await this.findOneAndUpdate({_id: id}, { $set: {deleted: true }}).exec();
            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    /**
     * Undo delete a biker.
     *
     * @param id
     * @returns {Promise<void>}
     */
    undoDeleteBiker: async function (id) {
        let biker = await this.find({id: id}).exec();

        biker.deleted = 0;
        try {
            await biker.save();
            return biker;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

let Biker = mongoose.model('Biker', BikerSchema);
Biker.RIDE_IN_GROUP_ALWAYS = 0;
Biker.RIDE_IN_GROUP_SOMETIMES = 1;
Biker.RIDE_IN_GROUP_NEVER = 2;
Biker.RIDE_IN_GROUP_TEXT = {
    0: 'Always',
    1: 'Sometimes',
    2: 'Never',
};

module.exports = Biker;