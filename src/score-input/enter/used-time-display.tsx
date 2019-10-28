import * as React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { endTimeSelector, startTimeSelector } from "../selectors/time";
import { RootState } from "../../types";
import Typography from "@material-ui/core/Typography/Typography";

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

const mapStateToProps = (state: RootState) => ({
  startTime: startTimeSelector(state),
  endTime: endTimeSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

export function UsedTimeDisplayImpl({ startTime, endTime }: stateType) {
  const { t } = useTranslation();
  const [currTime, setCurrTime] = React.useState(() => new Date().getTime());
  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const time = duration(startTime, endTime, currTime);
  return (
    <Typography variant="body1" gutterBottom align="right">
      {t("Time: {{time}}", { time })}
    </Typography>
  );
}

export const UsedTimeDisplay = connect(mapStateToProps)(UsedTimeDisplayImpl);
