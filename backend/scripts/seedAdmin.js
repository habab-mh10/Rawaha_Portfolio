import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Seed admin user
const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({
      email: process.env.ADMIN_EMAIL || 'ownerrawiporfolio@rawaha.me',
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      process.exit(0);
    }

    // Create new admin user
    const admin = await AdminUser.create({
      email: process.env.ADMIN_EMAIL || 'ownerrawiporfolio@rawaha.me',
      password: process.env.ADMIN_PASSWORD || 'rawahamr11',
      name: process.env.ADMIN_NAME || 'M.Rawaha',
      role: 'superadmin',
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

// Run seed
seedAdmin();
