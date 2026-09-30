import { describe, expect, it } from "vitest";

import { classroomCreateSchema, classroomCodeSchema, classroomUpdateSchema } from "./schema";

describe("classroomCreateSchema", () => {
  it("aceita uma sala com a associação opcional do nó", () => {
    expect(classroomCreateSchema.safeParse({
      code: "BLOCO-A.201",
      name: "Sala 201",
      building: "Bloco A",
      device_id: "classroom-node-01",
      installation_height_cm: 180,
    }).success).toBe(true);
  });

  it("rejeita identificadores, altura e campos fora do contrato", () => {
    expect(classroomCodeSchema.safeParse("Sala 201").success).toBe(false);
    expect(classroomCreateSchema.safeParse({
      code: "SALA-201",
      name: "Sala 201",
      installation_height_cm: -1,
      extra: true,
    }).success).toBe(false);
  });

  it("aceita a atualizacao sem permitir alterar o codigo historico", () => {
    expect(classroomUpdateSchema.safeParse({
      name: "Sala 201 atualizada", building: null, floor: "2", device_id: null,
      installation_position: null, installation_height_cm: null, responsible: null, notes: null,
    }).success).toBe(true);
    expect(classroomUpdateSchema.safeParse({ name: "Sala", code: "NOVO-CODIGO" }).success).toBe(false);
  });
});
