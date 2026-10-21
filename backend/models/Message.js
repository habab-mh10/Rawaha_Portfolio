import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ['email', 'whatsapp', 'website'],
      required: true,
      default: 'website',
    },
    senderName: {
      type: String,
      trim: true,
    },
    senderEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    senderPhone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
    },
    conversationId: {
      type: String,
      trim: true,
    },
    externalId: {
      type: String,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    replied: {
      type: Boolean,
      default: false,
    },
    replyHistory: [
      {
        message: String,
        sentAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['sent', 'delivered', 'failed'],
          default: 'sent',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
messageSchema.index({ source: 1, createdAt: -1 });
messageSchema.index({ read: 1 });
messageSchema.index({ senderEmail: 1 });
messageSchema.index({ conversationId: 1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
