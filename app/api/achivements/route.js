// app/api/achievements/route.js
import { connectDB } from '@/lib/db';
import { AchievementModel } from '@/models/AchievementModel';

export async function GET() {
  try {
    await connectDB();
    const achievements = await AchievementModel.find().sort({ dateAchieved: -1 });
    console.log(achievements);
    return Response.json(
      {
        status: 'success',
        results: achievements.length || 0,
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
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.title || !data.description || !data.category) {
      return Response.json(
        { 
          status: 'fail',
          message: 'Please provide title, description, and category' 
        },
        { status: 400 }
      );
    }

    const newAchievement = await AchievementModel.create({
      ...data,
      dateAchieved: new Date() // Add current date if your schema requires it
    });
    
    return Response.json(
      { 
        status: 'success',
        data: newAchievement,
        message: 'Achievement created successfully'
      },
      { status: 201 }
    );
  } catch (err) {
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
}