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

const createAdmin = async () => {
    await mongoose.connect(mongoURI, { tls: true });
    console.log('MongoDB connected');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);

    // Delete old admin if it exists and recreate
    await User.deleteOne({ email: 'shopxadmin@gmail.com' });
    
    await User.create({
        name: 'ShopX Admin',
        email: 'shopxadmin@gmail.com',
        password: hashed,
        isAdmin: true
    });
    
    console.log('SUCCESS! Admin created:');
    console.log('Email: shopxadmin@gmail.com');
    console.log('Password: admin123');

    await mongoose.disconnect();
    process.exit(0);
};

createAdmin().catch(err => { console.error(err); process.exit(1); });
