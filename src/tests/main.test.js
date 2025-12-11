import { describe, test, expect } from "vitest";
import {
  crearTableroHTML,
  manejarClick,
  comprobarJuego,
  comprobarGanador,
  reiniciarJuego
} from "/src/components/content.js";

describe("crearTableroHTML", () => {
  test("genera el número correcto de celdas", () => {
    const size = 5;
    const html = crearTableroHTML(size);
    const count = (html.match(/class="celda/g) || []).length;
    expect(count).toBe(size * size);
  });

  test("cada celda tiene atributos data-x y data-y", () => {
    const html = crearTableroHTML(3);
    expect(html).toContain('data-x="0"');
    expect(html).toContain('data-y="0"');
  });
});

describe("manejarClick", () => {
  test("no modifica una celda ya ocupada", () => {
    const tablero = [
      [1, 0],
      [0, 0],
    ];
    const res = manejarClick(tablero, 0, 0, 2, 2);
    expect(res.tablero[0][0]).toBe(1);
  });

  test("coloca la ficha y cambia al jugador contrario", () => {
    const tablero = [
      [0, 0],
      [0, 0],
    ];
    const res = manejarClick(tablero, 0, 0, 1, 2);
    expect(res.tablero[0][0]).toBe(1);
    expect(res.jugador).toBe(2);
  });

  test("pinta las celdas vecinas correctamente", () => {
    const tablero = [
      [0, 0],
      [0, 0],
    ];
    const res = manejarClick(tablero, 0, 0, 1, 2);

    // Celdas afectadas
    expect(res.tablero[0][0]).toBe(1); // click
    expect(res.tablero[1][0]).toBe(1); // abajo
    expect(res.tablero[0][1]).toBe(1); // derecha
  });
});

describe("comprobarJuego", () => {
  test("detecta tablero incompleto", () => {
    const tablero = [
      [1, 2],
      [0, 1],
    ];
    expect(comprobarJuego(tablero)).toBe(false);
  });

  test("detecta tablero completo", () => {
    const tablero = [
      [1, 2],
      [2, 1],
    ];
    expect(comprobarJuego(tablero)).toBe(true);
  });
});

describe("comprobarGanador", () => {
  test("gana jugador 1", () => {
    const tablero = [
      [1, 1],
      [2, 0],
    ];
    const r = comprobarGanador(tablero);
    expect(r.mensaje).toContain("Jugador 1");
  });

  test("gana jugador 2", () => {
    const tablero = [
      [2, 2],
      [1, 0],
    ];
    const r = comprobarGanador(tablero);
    expect(r.mensaje).toContain("Jugador 2");
  });

  test("empate", () => {
    const tablero = [
      [1, 2],
      [2, 1],
    ];
    const r = comprobarGanador(tablero);
    expect(r.mensaje).toContain("Empate");
  });
});

describe("reiniciarJuego", () => {
  test("devuelve tablero vacío", () => {
    const res = reiniciarJuego(3);
    expect(res.tablero.flat().every(v => v === 0)).toBe(true);
  });

  test("jugador es 1 o 2", () => {
    const res = reiniciarJuego(3);
    expect([1, 2]).toContain(res.jugador);
  });
});
