const mongoose = require('mongoose');
const Product = require('./model/productModel');

require('dotenv').config();

const products = [
    {
        title: 'iPhone 15 Pro Max',
        description: 'Apple iPhone 15 Pro Max with A17 Pro chip, 48MP camera system, titanium design, and Action Button. Available in 256GB storage.',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    },
    {
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Samsung flagship with 200MP camera, S Pen, 5000mAh battery, and Snapdragon 8 Gen 3 processor. 12GB RAM / 256GB storage.',
        price: 1099.99,
        image: 'https://images.unsplash.com/photo-1707148560309-80977b3113de?w=600&q=80',
    },
    {
        title: 'Apple MacBook Pro 16" M3',
        description: 'MacBook Pro with M3 Pro chip, 18GB Unified Memory, 512GB SSD, Liquid Retina XDR display, and up to 22 hours battery life.',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    },
    {
        title: 'Corsair Vengeance 32GB DDR5 RAM',
        description: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz CL36 desktop memory kit with XMP 3.0 support and heat spreader.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80',
    },
    {
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise cancellation headphones with 30-hour battery life, multipoint connectivity, and Hi-Res Audio support.',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1675243938563-398d79502449?w=600&q=80',
    },
    {
        title: 'NVIDIA GeForce RTX 4080 Super',
        description: 'High-end graphics card with 16GB GDDR6X VRAM, DLSS 3.5, Ray Tracing, and 4K gaming performance for AAA titles.',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1612197530467-646698663806?w=600&q=80',
    },
    {
        title: 'Samsung 990 Pro 2TB NVMe SSD',
        description: 'PCIe Gen 4 NVMe SSD with sequential read speeds up to 7450MB/s and write speeds up to 6900MB/s. For gaming and workloads.',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
    },
    {
        title: 'Apple iPad Pro 12.9" M4',
        description: 'iPad Pro with M4 chip, Ultra Retina XDR OLED display, Apple Pencil Pro support, 256GB, Wi-Fi + Cellular.',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    },
];

const seedProducts = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, { tls: true });
        console.log('MongoDB connected for seeding...');

        await Product.deleteMany({});
        console.log('Cleared existing products.');

        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} products!`);

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

seedProducts();
