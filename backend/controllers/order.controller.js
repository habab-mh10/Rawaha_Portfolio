import Order from '../models/Order.js';
import { successResponse, errorResponse, paginate, paginationMeta } from '../utils/response.utils.js';

// @desc    Submit new order (Public)
// @route   POST /api/orders
// @access  Public
export const submitOrder = async (req, res, next) => {
  try {
    const {
      clientName,
      email,
      phone,
      whatsapp,
      serviceType,
      projectDescription,
      budget,
      deadline,
    } = req.body;

    // Validate required fields
    if (!clientName || !email || !projectDescription) {
      return errorResponse(
        res,
        400,
        'Please provide client name, email, and project description'
      );
    }

    // Create order
    const order = await Order.create({
      clientName,
      email,
      phone,
      whatsapp,
      serviceType,
      projectDescription,
      budget,
      deadline,
      status: 'new',
    });

    successResponse(res, 201, 'Order submitted successfully! We will contact you soon.', {
      orderId: order.orderId,
      clientName: order.clientName,
      email: order.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { serviceType: { $regex: search, $options: 'i' } },
      ];
    }

    // Get orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: paginationMeta(total, pageNum, limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order (Admin)
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).select('-__v');

    if (!order) {
      return errorResponse(res, 404, 'Order not found');
    }

    successResponse(res, 200, 'Order fetched successfully', order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    if (!status) {
      return errorResponse(res, 400, 'Please provide order status');
    }

    const validStatuses = ['new', 'accepted', 'in-progress', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return errorResponse(res, 400, 'Invalid order status');
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 404, 'Order not found');
    }

    order.status = status;

    if (adminNotes !== undefined) {
      order.adminNotes = adminNotes;
    }

    await order.save();

    successResponse(res, 200, 'Order status updated successfully', order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order details (Admin)
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
export const updateOrder = async (req, res, next) => {
  try {
    const {
      clientName,
      email,
      phone,
      whatsapp,
      serviceType,
      projectDescription,
      budget,
      deadline,
      notes,
      adminNotes,
    } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 404, 'Order not found');
    }

    // Update fields
    if (clientName) order.clientName = clientName;
    if (email) order.email = email;
    if (phone !== undefined) order.phone = phone;
    if (whatsapp !== undefined) order.whatsapp = whatsapp;
    if (serviceType) order.serviceType = serviceType;
    if (projectDescription) order.projectDescription = projectDescription;
    if (budget !== undefined) order.budget = budget;
    if (deadline !== undefined) order.deadline = deadline;
    if (notes !== undefined) order.notes = notes;
    if (adminNotes !== undefined) order.adminNotes = adminNotes;

    await order.save();

    successResponse(res, 200, 'Order updated successfully', order);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order (Admin)
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 404, 'Order not found');
    }

    await order.deleteOne();

    successResponse(res, 200, 'Order deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get order statistics (Admin)
// @route   GET /api/admin/orders/stats
// @access  Private/Admin
export const getOrderStats = async (req, res, next) => {
  try {
    // Get total orders by status
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get total orders
    const totalOrders = await Order.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderId clientName serviceType status createdAt');

    // Format stats
    const formattedStats = {
      total: totalOrders,
      new: 0,
      accepted: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    };

    stats.forEach((stat) => {
      switch (stat._id) {
        case 'new':
          formattedStats.new = stat.count;
          break;
        case 'accepted':
          formattedStats.accepted = stat.count;
          break;
        case 'in-progress':
          formattedStats.inProgress = stat.count;
          break;
        case 'completed':
          formattedStats.completed = stat.count;
          break;
        case 'cancelled':
          formattedStats.cancelled = stat.count;
          break;
      }
    });

    successResponse(res, 200, 'Order statistics fetched successfully', {
      stats: formattedStats,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};
