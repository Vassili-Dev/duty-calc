import { Timezone } from "countries-and-timezones";
import { Settings } from "../contexts/settings";
import { DateTime, Duration } from "luxon";

export interface Form {
  startTime: DateTime | null;
  startTimezone: Timezone | null;
  flightTime: DateTime | null;
  useAbnormal: boolean;
}

interface ValidatedForm {
  startTime: DateTime;
  startTimezone: Timezone;
  flightTime: DateTime;
  useAbnormal: boolean;
}

export function validateForm({ startTime, startTimezone, flightTime }: Form) {
  return startTime && startTimezone && flightTime;
}

export interface Result {
  durationDelta: Duration;
  overtime: boolean;
}

export function calculateDutyTime(
  form: Form,
  { normalDutyHours, abnormalDutyHours }: Settings
): Result {
  let overtime = false;
  if (!validateForm(form)) {
    throw Error("Missing form fields");
  }

  const { startTime, startTimezone, flightTime, useAbnormal } =
    form as ValidatedForm;

  const dutyHours = useAbnormal ? abnormalDutyHours : normalDutyHours;

  const nowAdjusted = DateTime.now().setZone(startTimezone.name);

  const maxTime = startTime
    .setZone(startTimezone.name, { keepLocalTime: true })
    .plus({ hours: dutyHours });

  const flightDuration = Duration.fromObject({
    hours: flightTime.hour,
    minute: flightTime.minute,
    second: flightTime.second,
  });

  const projectedDuty = nowAdjusted.plus(flightDuration);
  let delta = maxTime.diff(projectedDuty).toMillis();

  if (delta < 0) {
    delta = Math.abs(delta);
    overtime = true;
  }

  const durationDelta = Duration.fromMillis(delta).normalize();

  return { durationDelta, overtime };
}
