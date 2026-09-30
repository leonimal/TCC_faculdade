export function classifyLocalReading(
  reading: { value: number | null; status: string },
  rule: { lowerLimit: number; upperLimit: number },
): "BELOW" | "ABOVE" | null {
  if (reading.status !== "VALID" || reading.value === null) {
    return null;
  }
  if (reading.value < rule.lowerLimit) {
    return "BELOW";
  }
  if (reading.value > rule.upperLimit) {
    return "ABOVE";
  }
  return null;
}
