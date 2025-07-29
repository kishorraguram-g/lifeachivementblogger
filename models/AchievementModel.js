import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateAchieved: {
    type: Date,
    default: Date.now,
    required: true
  },
  category: {
    type: String,
    enum: ['work', 'education', 'personal', 'fitness', 'other'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    default: 'medium'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  proofUrl: {
    type: String
  },
  points: {
    type: Number,
    min: 1,
    default: 1
  }
});

export const AchievementModel = 
  mongoose.models.achievements || mongoose.model('achievements', achievementSchema);

  