export interface Point {
  readonly x: number;
  readonly y: number;
}

export const isPoint = (pt: any): pt is Point =>
  pt && pt.x && pt.y && typeof(pt.x) === "number" && typeof(pt.y) === "number";

export const createPoint = (x: number, y: number): Point => ({ x, y });
export const addPoint = (a: Point, b: Point) => createPoint(a.x + b.x, a.y + b.y);
export const subPoint = (a: Point, b: Point) => createPoint(a.x - b.x, a.y - b.y);
export const negPoint = (pt: Point) => createPoint(-pt.x, -pt.y);
export const eqPoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
