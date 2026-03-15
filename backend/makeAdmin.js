const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://hassham:comsats@cluster0.iciocgr.mongodb.net/hassham?appName=Cluster0";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const makeAdmin = async (email) => {
    await mongoose.connect(mongoURI, { tls: true });
    console.log('MongoDB connected');

    const user = await User.findOneAndUpdate(
        { email },
        { isAdmin: true },
        { new: true }
    );

    if (user) {
        console.log(`SUCCESS: ${user.email} (${user.name}) is now an admin!`);
    } else {
        console.log(`ERROR: No user found with email ${email}`);
    }

    await mongoose.disconnect();
    process.exit(0);
};

// Promote the Google account to admin
makeAdmin('hishu6505@gmail.com').catch(err => { console.error(err); process.exit(1); });
