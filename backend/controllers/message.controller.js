import Message from '../models/Message.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * @desc    Submit a new message (Public)
 * @route   POST /api/messages/public
 * @access  Public
 */
export const submitMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!message) {
      return errorResponse(res, 400, 'Message content is required');
    }

    // Create message
    const newMessage = await Message.create({
      source: 'website',
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      subject: subject,
      message: message,
    });

    return successResponse(res, 201, 'Message sent successfully', newMessage);
  } catch (error) {
    console.error('Submit message error:', error);
    return errorResponse(res, 500, error.message || 'Failed to send message');
  }
};

/**
 * @desc    Get all messages (Admin)
 * @route   GET /api/admin/messages
 * @access  Private/Admin
 */
export const getAllMessages = async (req, res) => {
  try {
    const { 
      source, 
      read, 
      replied, 
      search, 
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};

    if (source) {
      query.source = source;
    }

    if (read !== undefined) {
      query.read = read === 'true';
    }

    if (replied !== undefined) {
      query.replied = replied === 'true';
    }

    if (search) {
      query.$or = [
        { senderName: { $regex: search, $options: 'i' } },
        { senderEmail: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [messages, total, unreadCount] = await Promise.all([
      Message.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Message.countDocuments(query),
      Message.countDocuments({ read: false }),
    ]);

    return successResponse(
      res,
      200,
      'Messages fetched successfully',
      {
        messages,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalMessages: total,
          perPage: parseInt(limit),
        },
        unreadCount,
      }
    );
  } catch (error) {
    console.error('Get all messages error:', error);
    return errorResponse(res, 500, 'Failed to fetch messages');
  }
};

/**
 * @desc    Get message by ID (Admin)
 * @route   GET /api/admin/messages/:id
 * @access  Private/Admin
 */
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).select('-__v');

    if (!message) {
      return errorResponse(res, 404, 'Message not found');
    }

    // Mark as read when viewed
    if (!message.read) {
      message.read = true;
      await message.save();
    }

    return successResponse(res, 200, 'Message fetched successfully', message);
  } catch (error) {
    console.error('Get message by ID error:', error);
    return errorResponse(res, 500, 'Failed to fetch message');
  }
};

/**
 * @desc    Mark message as read/unread (Admin)
 * @route   PATCH /api/admin/messages/:id/read
 * @access  Private/Admin
 */
export const toggleReadStatus = async (req, res) => {
  try {
    const { read } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: read !== undefined ? read : true },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!message) {
      return errorResponse(res, 404, 'Message not found');
    }

    return successResponse(
      res,
      200,
      `Message marked as ${message.read ? 'read' : 'unread'}`,
      message
    );
  } catch (error) {
    console.error('Toggle read status error:', error);
    return errorResponse(res, 500, 'Failed to update message status');
  }
};

/**
 * @desc    Mark message as replied (Admin)
 * @route   PATCH /api/admin/messages/:id/reply
 * @access  Private/Admin
 */
export const markAsReplied = async (req, res) => {
  try {
    const { replyMessage } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
      return errorResponse(res, 404, 'Message not found');
    }

    message.replied = true;
    
    if (replyMessage) {
      message.replyHistory.push({
        message: replyMessage,
        status: 'sent',
      });
    }

    await message.save();

    return successResponse(res, 200, 'Message marked as replied', message);
  } catch (error) {
    console.error('Mark as replied error:', error);
    return errorResponse(res, 500, 'Failed to mark message as replied');
  }
};

/**
 * @desc    Delete message (Admin)
 * @route   DELETE /api/admin/messages/:id
 * @access  Private/Admin
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return errorResponse(res, 404, 'Message not found');
    }

    await message.deleteOne();

    return successResponse(res, 200, 'Message deleted successfully', null);
  } catch (error) {
    console.error('Delete message error:', error);
    return errorResponse(res, 500, 'Failed to delete message');
  }
};

/**
 * @desc    Bulk delete messages (Admin)
 * @route   POST /api/admin/messages/bulk-delete
 * @access  Private/Admin
 */
export const bulkDeleteMessages = async (req, res) => {
  try {
    const { messageIds } = req.body;

    if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) {
      return errorResponse(res, 400, 'Invalid message IDs');
    }

    const result = await Message.deleteMany({ _id: { $in: messageIds } });

    return successResponse(
      res,
      200,
      `${result.deletedCount} message(s) deleted successfully`,
      { deletedCount: result.deletedCount }
    );
  } catch (error) {
    console.error('Bulk delete messages error:', error);
    return errorResponse(res, 500, 'Failed to delete messages');
  }
};

/**
 * @desc    Get message statistics (Admin)
 * @route   GET /api/admin/messages/stats
 * @access  Private/Admin
 */
export const getMessageStats = async (req, res) => {
  try {
    const [
      total,
      unread,
      replied,
      unreplied,
      bySource,
    ] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Message.countDocuments({ replied: true }),
      Message.countDocuments({ replied: false }),
      Message.aggregate([
        {
          $group: {
            _id: '$source',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Get messages from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentMessages = await Message.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    return successResponse(
      res,
      200,
      'Message statistics fetched successfully',
      {
        total,
        unread,
        replied,
        unreplied,
        recentMessages,
        bySource: bySource.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      }
    );
  } catch (error) {
    console.error('Get message stats error:', error);
    return errorResponse(res, 500, 'Failed to fetch message statistics');
  }
};
