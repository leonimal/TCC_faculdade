import { describe, expect, it } from "vitest";

import { deviceCreateSchema, devicePublicIdSchema, deviceUpdateSchema } from "./schema";

describe("deviceCreateSchema", () => {
  it("aceita um nó com identificador que pode ser gravado no firmware", () => {
    expect(deviceCreateSchema.safeParse({
      public_id: "classroom-node-02",
      name: "Nó reserva ESP32",
    }).success).toBe(true);
  });

  it("rejeita identificadores inseguros e campos fora do contrato", () => {
    expect(devicePublicIdSchema.safeParse("sala 02").success).toBe(false);
    expect(deviceCreateSchema.safeParse({ public_id: "no", name: "Nó", active: true }).success).toBe(false);
  });

  it("aceita nome e disponibilidade, mas nao a troca do identificador", () => {
    expect(deviceUpdateSchema.safeParse({ name: "No de reserva", active: false }).success).toBe(true);
    expect(deviceUpdateSchema.safeParse({ name: "No", active: true, public_id: "outro-no" }).success).toBe(false);
  });
});
