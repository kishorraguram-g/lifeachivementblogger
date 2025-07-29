import { connectDB } from '@/lib/db';
import { AchievementModel } from '@/models/AchievementModel';

export const GET = async (_, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    console.log(id);
    console.log('achivement id  consoled')
    const achievement = await AchievementModel.findById(id);
    if (!achievement) {
      return Response.json(
        {
          status: 'fail',
          message: 'Achievement not found. Please check the ID'
        },
        { status: 404 }
      );
    }
    
    return Response.json(
      {
        status: 'success',
        data: achievement
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        message: err.message
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const achievement = await AchievementModel.findById(id);
    
    if (!achievement) {
      return Response.json(
        {
          status: 'fail',
          message: 'Achievement not found. Please check the ID'
        },
        { status: 404 }
      );
    }
    
    const updateData = await req.json();
    
    if (updateData._id) {
      return Response.json(
        {
          status: 'fail',
          message: 'Cannot update the ID field'
        },
        { status: 400 }
      );
    }
    
    const updatedAchievement = await AchievementModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    return Response.json(
      {
        status: 'success',
        data: updatedAchievement
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        message: err.message
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const achievement = await AchievementModel.findById(id);
    
    if (!achievement) {
      return Response.json(
        {
          status: 'fail',
          message: 'Achievement not found. Please check the ID'
        },
        { status: 404 }
      );
    }
    
    await AchievementModel.findByIdAndDelete(id);
    
    return Response.json(
      {
        status: 'success',
        data: null,
        message: 'Achievement deleted successfully'
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        message: err.message
      },
      { status: 500 }
    );
  }
};