require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample products data matching your frontend
const sampleProducts = [
  {
    name: "Custom Portrait Drawing",
    description: "Personalized hand-drawn portrait from your photos. Perfect for gifts and home decor.",
    price: 299,
    category: "custom-art",
    images: [
      {
        url: "https://skyryedesign.com/wp-content/uploads/2024/06/4222193391251403-pin-image.jpg",
        alt: "Custom Portrait Drawing",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 10,
    isBestseller: true,
    isFeatured: true,
    tags: ["portrait", "custom", "gift", "handmade"],
    materials: ["Paper", "Pencil", "Charcoal"],
    customizable: true,
    deliveryTime: "5-7 days"
  },
  {
    name: "Abstract Canvas Art",
    description: "Modern abstract canvas painting perfect for contemporary spaces. Hand-painted with vibrant colors.",
    price: 1499,
    category: "paintings",
    images: [
      {
        url: "https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825727.jpg?t=st=1756626115~exp=1756629715~hmac=d622033bd50f81be196e54e61492d9f888f40ce7313f7987dd0a5d304452f0e9&w=1480",
        alt: "Abstract Canvas Art",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 5,
    isBestseller: true,
    isFeatured: true,
    tags: ["abstract", "canvas", "modern", "colorful"],
    materials: ["Canvas", "Acrylic Paint"],
    dimensions: { width: 16, height: 20, unit: "inches" },
    deliveryTime: "3-5 days"
  },
  {
    name: "Digital Art Print",
    description: "High-quality digital art print on premium paper. Modern design perfect for any room.",
    price: 199,
    category: "digital-art",
    images: [
      {
        url: "https://img.freepik.com/free-photo/representation-collective-mind-process-concept-digital-art-style_23-2151657790.jpg?t=st=1756626212~exp=1756629812~hmac=2fedf353c72b7322ace4e6964761a0e406da0fb64786e2dff5ee6099e2dd5475&w=1480",
        alt: "Digital Art Print",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 20,
    isBestseller: true,
    isFeatured: true,
    tags: ["digital", "print", "modern", "affordable"],
    materials: ["Premium Paper"],
    dimensions: { width: 12, height: 16, unit: "inches" },
    deliveryTime: "2-3 days"
  },
  {
    name: "Handmade Art Journal",
    description: "Beautiful handcrafted art journal with custom cover design. Perfect for artists and writers.",
    price: 399,
    category: "art-supplies",
    images: [
      {
        url: "https://img.freepik.com/free-photo/empty-notepad-painted-frame_23-2148660980.jpg?t=st=1756626324~exp=1756629924~hmac=d3ac07f17f4688bc56a62a1ec583ecf5f17e5afa9c2c220eff310b472535b2fc&w=1480",
        alt: "Handmade Art Journal",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 15,
    isBestseller: true,
    isFeatured: true,
    tags: ["journal", "handmade", "supplies", "gift"],
    materials: ["Handmade Paper", "Cardboard", "Fabric"],
    customizable: true,
    deliveryTime: "4-6 days"
  },
  {
    name: "Watercolor Landscape",
    description: "Serene watercolor landscape painting. Brings nature's beauty into your space.",
    price: 899,
    category: "watercolor",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
        alt: "Watercolor Landscape",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 8,
    isFeatured: true,
    tags: ["watercolor", "landscape", "nature", "peaceful"],
    materials: ["Watercolor Paper", "Watercolor Paint"],
    dimensions: { width: 14, height: 18, unit: "inches" },
    deliveryTime: "3-5 days"
  },
  {
    name: "Pencil Sketch Art",
    description: "Detailed pencil sketch artwork. Classic black and white drawing style.",
    price: 249,
    category: "sketches",
    images: [
      {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop&crop=center",
        alt: "Pencil Sketch Art",
        isPrimary: true
      }
    ],
    inStock: true,
    stockQuantity: 12,
    tags: ["sketch", "pencil", "black-white", "detailed"],
    materials: ["Drawing Paper", "Graphite Pencils"],
    dimensions: { width: 11, height: 14, unit: "inches" },
    deliveryTime: "2-4 days"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artwithshyz');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    // Display summary
    const productCount = await Product.countDocuments();
    console.log(`Total products in database: ${productCount}`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}
