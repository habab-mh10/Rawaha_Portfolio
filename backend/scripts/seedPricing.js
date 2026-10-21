import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import PricingPackage from '../models/PricingPackage.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample Pricing Packages
const packages = [
  {
    name: 'Web Development',
    description: 'Complete website development with modern technologies',
    price: 1500,
    duration: 'project',
    features: [
      'Responsive Design (Mobile, Tablet, Desktop)',
      'Up to 10 Pages',
      'Contact Form Integration',
      'SEO Optimization',
      'Fast Loading Speed',
      'Cross-Browser Compatible',
      'Free 1 Month Support',
      '3 Revisions Included',
    ],
    isPopular: true,
    displayOrder: 1,
    published: true,
  },
  {
    name: 'Graphic Designing',
    description: 'Professional graphic design for your brand identity',
    price: 500,
    duration: 'project',
    features: [
      'Logo Design (3 Concepts)',
      'Brand Color Palette',
      'Typography Selection',
      'Social Media Graphics (5 Posts)',
      'Business Card Design',
      'Source Files Included',
      'Unlimited Revisions',
      '48 Hour Delivery',
    ],
    isPopular: false,
    displayOrder: 2,
    published: true,
  },
  {
    name: 'UGC Ads',
    description: 'User-Generated Content style advertisements',
    price: 300,
    duration: 'ad campaign',
    features: [
      'Script Writing',
      'Professional Video Editing',
      'Background Music & Effects',
      'Captions & Text Overlays',
      'Platform Optimization (TikTok, Instagram, Facebook)',
      '30-60 Second Video',
      '2 Revisions',
      '72 Hour Delivery',
    ],
    isPopular: false,
    displayOrder: 3,
    published: true,
  },
];

// Seed function
const seedPricing = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing pricing packages...');
    await PricingPackage.deleteMany({});

    console.log('✨ Seeding Pricing Packages...');
    await PricingPackage.insertMany(packages);
    console.log(`✅ ${packages.length} pricing packages seeded`);

    console.log('\n🎉 Pricing packages seeded successfully!');
    console.log('\n📊 Summary:');
    packages.forEach(pkg => {
      console.log(`   • ${pkg.name}: $${pkg.price}/${pkg.duration} ${pkg.isPopular ? '⭐ POPULAR' : ''}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding pricing:', error);
    process.exit(1);
  }
};

// Run seeder
seedPricing();
