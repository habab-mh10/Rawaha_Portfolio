import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: [
        'Full-Stack Web Development',
        'Frontend Development',
        'Backend Development',
        'E-Commerce Website',
        'Landing Page',
        'Dashboard',
        'API Development',
        'Other',
      ],
      default: 'Other',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
    },
    budget: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['new', 'accepted', 'in-progress', 'completed', 'cancelled'],
      default: 'new',
    },
    notes: {
      type: String,
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique order ID before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    this.orderId = `ORD-${year}${month}${day}-${random}`;
  }
  next();
});

// Index for better query performance
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ email: 1 });
// orderId already has unique index from schema definition

const Order = mongoose.model('Order', orderSchema);

export default Order;
