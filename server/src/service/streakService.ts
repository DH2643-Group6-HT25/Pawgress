import * as streakRepo from "../repository/streakRepo";

/*Get users streak*/
export const getStreak = async (userId: string) => {
  let streak = await streakRepo.getStreakByUserId(userId);
  //if no streak, create a new streak
  if (!streak) {
    streak = await streakRepo.createStreak(userId);
  }
  return streak;
};

/* Update users streak*/
export const updateStreak = async (userId: string) => {
  const streak = await getStreak(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // keep date only

  // get the last streak's date
  const lastDay =
    streak.history.length > 0
      ? new Date(streak.history[streak.history.length - 1].date)
      : null;
  if (lastDay) lastDay.setHours(0, 0, 0, 0);

  // Determine if today is recorded or not
  const isTodayRecorded = lastDay && today.getTime() === lastDay.getTime();

  if (isTodayRecorded) {
    streak.history[streak.history.length - 1].finishedTodos += 1;
  } else {
    // Dertermine whether to get streak continuously
    const isContinuous =
      lastDay && today.getTime() - lastDay.getTime() === 86400000;

    if (isContinuous) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1; //Interrupt and restart recording current streak
    }

    // update best streak
    if (streak.currentStreak > streak.bestStreak) {
      streak.bestStreak = streak.currentStreak;
    }

    // update streak history
    streak.history.push({ date: today, finishedTodos: 1 });
  }

  // save streak data
  await streak.save();

  return streak;
};
