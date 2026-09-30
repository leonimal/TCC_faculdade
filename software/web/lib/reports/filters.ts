export const REPORT_TIME_ZONE = "America/Sao_Paulo";
export const REPORT_MAXIMUM_DAYS = 31;

export type ReportSearchParams = {
  from?: string | string[];
  to?: string | string[];
  room?: string | string[];
  time?: string | string[];
  values?: string | string[];
};

export const reportTimeQualities = ["SYNCHRONIZED", "UNSYNCHRONIZED", "ALL"] as const;
export type ReportTimeQuality = (typeof reportTimeQualities)[number];

export const reportValueFormats = ["DISPLAY", "RAW"] as const;
export type ReportValueFormat = (typeof reportValueFormats)[number];

export type ReportPeriod = {
  fromDate: string;
  toDate: string;
  fromUtc: string;
  toExclusiveUtc: string;
};

export type ReportPeriodResult =
  | { success: true; period: ReportPeriod; errors: [] }
  | {
      success: false;
      period: null;
      errors: string[];
      formValues: { fromDate: string; toDate: string };
    };

function saoPauloDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: REPORT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addUtcDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function isDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function singleValue(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function parseReportTimeQuality(value: string | string[] | undefined): ReportTimeQuality {
  return typeof value === "string" && reportTimeQualities.includes(value as ReportTimeQuality)
    ? value as ReportTimeQuality
    : "SYNCHRONIZED";
}

export function parseReportValueFormat(value: string | string[] | undefined): ReportValueFormat {
  return typeof value === "string" && reportValueFormats.includes(value as ReportValueFormat)
    ? value as ReportValueFormat
    : "DISPLAY";
}

export function defaultReportPeriod(now = new Date()): ReportPeriod {
  const toDate = saoPauloDateKey(now);
  return reportPeriodFromDateKeys(addUtcDays(toDate, -6), toDate);
}

function reportPeriodFromDateKeys(fromDate: string, toDate: string): ReportPeriod {
  const toExclusiveDate = addUtcDays(toDate, 1);
  return {
    fromDate,
    toDate,
    fromUtc: new Date(`${fromDate}T00:00:00-03:00`).toISOString(),
    toExclusiveUtc: new Date(`${toExclusiveDate}T00:00:00-03:00`).toISOString(),
  };
}

export function parseReportPeriod(
  searchParams: ReportSearchParams,
  now = new Date(),
): ReportPeriodResult {
  const defaultPeriod = defaultReportPeriod(now);
  const rawFrom = singleValue(searchParams.from);
  const rawTo = singleValue(searchParams.to);

  if (searchParams.from === undefined && searchParams.to === undefined) {
    return { success: true, period: defaultPeriod, errors: [] };
  }

  const errors: string[] = [];
  if (Array.isArray(searchParams.from) || Array.isArray(searchParams.to)) {
    errors.push("Os parâmetros de período não podem ser repetidos.");
  }
  if (!rawFrom || !rawTo) {
    errors.push("Informe as datas inicial e final.");
  }
  if (rawFrom && !isDateKey(rawFrom)) {
    errors.push("A data inicial é inválida.");
  }
  if (rawTo && !isDateKey(rawTo)) {
    errors.push("A data final é inválida.");
  }

  if (errors.length === 0 && rawFrom && rawTo) {
    const period = reportPeriodFromDateKeys(rawFrom, rawTo);
    const durationMs =
      Date.parse(period.toExclusiveUtc) - Date.parse(period.fromUtc);
    const durationDays = durationMs / 86_400_000;

    if (durationMs <= 0) {
      errors.push("A data final deve ser igual ou posterior à data inicial.");
    } else if (durationDays > REPORT_MAXIMUM_DAYS) {
      errors.push(`O período máximo permitido é de ${REPORT_MAXIMUM_DAYS} dias.`);
    } else {
      return { success: true, period, errors: [] };
    }
  }

  return {
    success: false,
    period: null,
    errors,
    formValues: {
      fromDate: rawFrom ?? defaultPeriod.fromDate,
      toDate: rawTo ?? defaultPeriod.toDate,
    },
  };
}
