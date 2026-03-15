const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://hassham:comsats@cluster0.iciocgr.mongodb.net/hassham?appName=Cluster0";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const resetAdmin = async () => {
    await mongoose.connect(mongoURI, { tls: true });
    console.log('MongoDB connected');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('123456', salt);

    let user = await User.findOne({ email: 'admin@example.com' });

    if (user) {
        user.password = hashed;
        user.isAdmin = true;
        await user.save();
        console.log('Admin password RESET to 123456 and isAdmin set to true!');
    } else {
        await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, isAdmin: true });
        console.log('Admin CREATED: admin@example.com / 123456');
    }

    await mongoose.disconnect();
    process.exit(0);
};

resetAdmin().catch(err => { console.error(err); process.exit(1); });
