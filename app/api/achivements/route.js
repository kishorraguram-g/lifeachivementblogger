import { connectDB } from '@/lib/db';
import { AchievementModel } from '@/models/AchievementModel';

export const GET = async () => {
  try {
    await connectDB();
    const achievements = await AchievementModel.find().sort({ dateAchieved: -1 }); // Sort by newest first
    
    return Response.json(
      {
        status: 'success',
        results: achievements.length,
        data: achievements
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        message: 'Failed to fetch achievements',
        error: err.message
      },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    await connectDB();
    const data = await req.json();
    
    // Validate required fields based on your schema
    if (!data.title || !data.description || !data.category) {
      return Response.json(
        { 
          status: 'fail',
          message: 'Please provide title, description, and category' 
        },
        { status: 400 }
      );
    }

    // Create and save the new achievement
    const newAchievement = await AchievementModel.create(data);
    
    return Response.json(
      { 
        status: 'success',
        data: newAchievement,
        message: 'Achievement created successfully'
      },
      { status: 201 }
    );
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return Response.json(
        {
          status: 'fail',
          message: 'Validation error',
          errors
        },
        { status: 400 }
      );
    }
    
    return Response.json(
      {
        status: 'error',
        message: 'Failed to create achievement',
        error: err.message
      },
      { status: 500 }
    );
  }
};