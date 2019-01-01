let conn = new Mongo();
db = conn.getDB('dummyApp');
db.dropDatabase();
db.bikers.insertMany([
    {
        fullName: 'Ali Elkhateeb',
        email: 'ali.elkhateeb1990@gmail.com',
        city: 'Kuala Lumpur',
        rideInGroup: 0,
        daysOfWeek: ["1", "2", "3", "4", "5", "6"],
        deleted: false,
        createdAt: new Date('2/1/2019 10:00').toISOString(),
    },
    {
        fullName: 'Omar Elkhateeb',
        email: 'omar@example.com',
        city: 'Cairo',
        rideInGroup: 1,
        daysOfWeek: ["0", "6"],
        deleted: false,
        createdAt: new Date('2/1/2019 10:05').toISOString(),
    }, {
        fullName: 'Ahmed Elkhatib',
        email: 'ahmed@example.com',
        city: 'Alexandria',
        rideInGroup: 2,
        daysOfWeek: ["1", "2", "3", "4", "5"],
        deleted: false,
        createdAt: new Date('2/1/2019 10:12').toISOString(),
    },
]);