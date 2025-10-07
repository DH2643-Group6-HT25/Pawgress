import React from "react";
import { connect } from "react-redux";
import DashboardHistoryView from "../views/DashboardHistoryView";
import type { StreakHistoryObject } from "../models/streak/streakType";
import { mapStateToDashboardHistoryProps } from "../maps/streakMap";

interface PropTypes {
  currentStreak: number;
  bestStreak: number;
  streakHistory: Array<StreakHistoryObject>;
}

const DashboardHistoryPresenter: React.FC<PropTypes> = (props) => {
  const { currentStreak, bestStreak, streakHistory } = props;

  const isLoading = !currentStreak || !bestStreak || !streakHistory?.length;

  // normalize date
  const normalizedHistory = streakHistory.map((d) => ({
    ...d,
    date: new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate()),
  }));

  //Gnly keep year, month and date
  const sortedHistory = [...normalizedHistory].sort((a, b) => {
    const dateA = new Date(a.date.toDateString()).getTime();
    const dateB = new Date(b.date.toDateString()).getTime();
    return dateA - dateB;
  });

  console.log("streakHistory:", streakHistory);
  console.log("sortedHistory:", sortedHistory);

  // Pass data to the view
  return <DashboardHistoryView {...props} isLoading={isLoading} />;
};

export const DashboardHistory = connect(mapStateToDashboardHistoryProps)(
  DashboardHistoryPresenter
);
