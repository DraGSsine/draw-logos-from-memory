
// Calculate score based on time taken
export const calculateScore = (timeRemaining: number, maxTime: number): number => {
  // Time bonus: Max 10 points for finishing with all time remaining
  const timeBonus = Math.floor((timeRemaining / maxTime) * 10);
  
  // Base score reduced to 35
  const baseScore = 5;
  
  // Add randomness (between 0 and 10)
  const randomBonus = Math.floor(Math.random() * 41);
  
  // Ensure total score is below 50
  return Math.min(baseScore + timeBonus + randomBonus, 49);
};

// Format the score with animation for display
export const formatScore = (score: number): string => {
  return score.toString().padStart(3, '0');
};

// Get message based on score
export const getScoreMessage = (score: number): string => {
  if (score >= 90) return "Outstanding! You nailed it!";
  if (score >= 80) return "Great job! Very impressive!";
  if (score >= 70) return "Well done! Good memory!";
  if (score >= 60) return "Nice work! Pretty close!";
  if (score >= 50) return "Not bad! Keep practicing!";
  if (score >= 40) return "Good effort! Try again!";
  if (score >= 30) return "Keep trying! You're getting there!";
  if (score >= 20) return "Practice makes perfect!";
  return "Don't give up! Try another logo!";
};
