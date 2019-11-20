import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { endTimeSelector, startTimeSelector } from "../selectors/time";
import { useTime } from "../../hooks/useTime";

function msToTime(milliseconds: number): string {
  // Get hours from milliseconds
  const hours = milliseconds / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);
  const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  return `${h}:${m}:${s}`;
}

function duration(
  startTime: Date | null,
  endTime: Date | null,
  now: number
): string {
  if (startTime == null) {
    // Not started
    return "00:00:00";
  }
  const largerTime = endTime ? endTime.getTime() : now;
  return msToTime(largerTime - startTime.getTime());
}

export function UsedTimeDisplay() {
  const { t } = useTranslation();
  const currTime = useTime();

  const startTime = useSelector(startTimeSelector);
  const endTime = useSelector(endTimeSelector);

  const time = duration(startTime, endTime, currTime);
  return (
    <Typography variant="body1" gutterBottom align="right">
      {t("Time: {{time}}", { time })}
    </Typography>
  );
}
