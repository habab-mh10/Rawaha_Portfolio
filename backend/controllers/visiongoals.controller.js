import VisionGoals from '../models/VisionGoals.js';

/**
 * @desc    Get public vision & goals
 * @route   GET /api/visiongoals/public
 * @access  Public
 */
export const getPublicVisionGoals = async (req, res) => {
  try {
    const visionGoals = await VisionGoals.findOne({ published: true }).select('-__v');
    
    if (!visionGoals) {
      return res.status(404).json({
        success: false,
        message: 'Vision & Goals not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vision & Goals fetched successfully',
      data: visionGoals
    });
  } catch (error) {
    console.error('Get public vision & goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * @desc    Get vision & goals for admin
 * @route   GET /api/visiongoals/admin
 * @access  Private/Admin
 */
export const getAdminVisionGoals = async (req, res) => {
  try {
    let visionGoals = await VisionGoals.findOne().select('-__v');
    
    // If no document exists, create a default one
    if (!visionGoals) {
      visionGoals = await VisionGoals.create({
        title: 'Our Goals and Vision',
        content: 'My goal is to continuously improve my skills, challenge my limits, and reach a high level of professional excellence. I aspire to grow as a developer and designer, build meaningful digital products, and turn ambitious ideas into reliable real-world solutions. Through consistent learning, creativity, and dedication, I aim to establish a strong professional identity, work with inspiring people, and create technology that delivers lasting value for individuals and businesses.',
        published: true
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vision & Goals fetched successfully',
      data: visionGoals
    });
  } catch (error) {
    console.error('Get admin vision & goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * @desc    Update vision & goals
 * @route   PUT /api/visiongoals/admin
 * @access  Private/Admin
 */
export const updateVisionGoals = async (req, res) => {
  try {
    const { title, content, published } = req.body;

    let visionGoals = await VisionGoals.findOne();
    
    if (!visionGoals) {
      // Create new document
      visionGoals = await VisionGoals.create({
        title: title || 'Our Goals and Vision',
        content,
        published: published !== undefined ? published : true
      });
    } else {
      // Update existing document
      if (title !== undefined) visionGoals.title = title;
      if (content !== undefined) visionGoals.content = content;
      if (published !== undefined) visionGoals.published = published;
      
      await visionGoals.save();
    }

    res.status(200).json({
      success: true,
      message: 'Vision & Goals updated successfully',
      data: visionGoals
    });
  } catch (error) {
    console.error('Update vision & goals error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};