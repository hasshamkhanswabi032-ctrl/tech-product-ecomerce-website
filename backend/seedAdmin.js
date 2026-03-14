const mongoose = require('mongoose');
const User = require('./model/userModel');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const seedAdmin = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, { tls: true });
        console.log('MongoDB connected for admin seeding...');

        // Check if user exists
        const email = 'admin@example.com';
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Admin user already exists!');
            userExists.isAdmin = true;
            await userExists.save();
            console.log('Made existing user an admin.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('123456', salt);

            await User.create({
                name: 'Admin User',
                email: email,
                password: hashedPassword,
                isAdmin: true
            });
            console.log('✅ Successfully created new Admin user!');
        }

        console.log('Credentials -> Email: admin@example.com | Password: 123456');

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

seedAdmin();
