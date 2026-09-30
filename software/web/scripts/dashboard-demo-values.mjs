const demoCycle = [
  { temperature: 22, humidity: 48, illuminance: 320, queueDepth: 0 },
  { temperature: 22.6, humidity: 50.5, illuminance: 420, queueDepth: 8 },
  { temperature: 23.2, humidity: 53, illuminance: 560, queueDepth: 24 },
  { temperature: 24, humidity: 56, illuminance: 720, queueDepth: 52 },
  { temperature: 24.8, humidity: 59.5, illuminance: 880, queueDepth: 210 },
  { temperature: 25.5, humidity: 62, illuminance: 760, queueDepth: 96 },
  { temperature: 24.7, humidity: 57.5, illuminance: 610, queueDepth: 36 },
  { temperature: 23.8, humidity: 52, illuminance: 450, queueDepth: 0 },
];

export function dashboardDemoValues(sequenceNumber) {
  if (!Number.isInteger(sequenceNumber) || sequenceNumber < 1) {
    throw new TypeError("sequenceNumber deve ser um inteiro positivo.");
  }

  return { ...demoCycle[(sequenceNumber - 1) % demoCycle.length] };
}
