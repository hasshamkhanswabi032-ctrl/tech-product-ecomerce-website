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

const listUsers = async () => {
    await mongoose.connect(mongoURI, { tls: true });
    console.log('MongoDB connected');

    const users = await User.find({}, 'name email isAdmin');
    console.log('Current Users in Database:');
    users.forEach(u => {
        console.log(`- ${u.name} | ${u.email} | isAdmin: ${u.isAdmin}`);
    });

    await mongoose.disconnect();
    process.exit(0);
};

listUsers().catch(err => { console.error(err); process.exit(1); });
