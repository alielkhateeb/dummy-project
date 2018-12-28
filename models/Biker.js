let mongoose = require('mongoose');

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
    registrationDay: {type: Date, default: Date.now},
});

BikerSchema.statics = {
    getAllBikers: async function () {
        return await this.find({}).exec();
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
        } catch(err) {
            throw new Error(err.message);
        }
    }
};

let Biker = mongoose.model('Biker', BikerSchema);
Biker.RIDE_IN_GROUP_ALWAYS = 0;
Biker.RIDE_IN_GROUP_SOMETIMES = 1;
Biker.RIDE_IN_GROUP_NEVER = 2;

module.exports = Biker;