const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://hassham:comsats@cluster0.iciocgr.mongodb.net/hassham?appName=Cluster0";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const seedAdmin = async () => {
    await mongoose.connect(mongoURI, { tls: true });
    console.log('MongoDB connected');

    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
        if (!existing.isAdmin) {
            existing.isAdmin = true;
            await existing.save();
            console.log('Updated existing user to admin!');
        } else {
            console.log('Admin already exists!');
        }
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash('123456', salt);
        await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, isAdmin: true });
        console.log('Admin created: admin@example.com / 123456');
    }

    await mongoose.disconnect();
    process.exit(0);
};

seedAdmin().catch(err => { console.error(err); process.exit(1); });
