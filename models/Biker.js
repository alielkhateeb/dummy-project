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
    getDaysOfWeekText: function () {
        if (this.daysOfWeek && this.daysOfWeek.length) {
            let daysOfWeekTextArray = [];
            for (let day of this.daysOfWeek) {
                let dayText = moment().day(day).format('ddd');
                daysOfWeekTextArray.push(dayText);
            }
            return daysOfWeekTextArray.join(', ');
        } else {
            return 'None';
        }
    }
};

BikerSchema.statics = {
    getAllBikers: async function () {
        return await this.find({deleted: false}).sort({createdAt: -1}).exec();
    },
    getDaysOfWeekText: function (bikers) {
        let daysOfWeek = [];
        for(let biker of bikers) {
            daysOfWeek[biker.id] = biker.getDaysOfWeekText();
        }

        return daysOfWeek;
    },
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
    deleteBiker: async function (id) {
        try {
            await this.findOneAndUpdate({_id: id}, { $set: {deleted: true }}).exec();
            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    },
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