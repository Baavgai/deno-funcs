import { Point, createPoint } from "./Point.ts";
import { degToRad } from "./functions.ts";

export type Vector = Point;

export const createVector = createPoint;

export const vectorFromMagRad = (magnitude: number, rad: number) =>
  createVector(magnitude * Math.cos(rad), magnitude * Math.sin(rad));

export const vectorFromMagDeg = (magnitude: number, deg: number) =>
  vectorFromMagRad(magnitude, degToRad(deg));

export const vectorMag = (vector: Vector) =>
  Math.sqrt(vector.x * vector.x + vector.y * vector.y);

export const vectorRad = (vector: Vector) => {
  const rad = Math.atan2(vector.y, vector.x);
  return rad < 0 ? 2 * Math.PI + rad : rad;
};

export const vectorDeg = (vector: Vector) => degToRad(vectorRad(vector));

export const getIntersect = (v1: Vector, p1: Point, v2: Vector, p2: Point) => {
  const abc1 = posToABC(v1, p1);
  if (v2.x === 0) {
    return createPoint((abc1.c - (abc1.b * v2.y)) / abc1.a, v2.y);
  } else if (v2.y === 0) {
    return createPoint(v2.x, (abc1.c - (abc1.a * v2.x)) / abc1.b);
  } else {
    const abc2 = posToABC(v2, p2);
    const det = abc1.a * abc2.b - abc2.a * abc1.b;
    return (det === 0) ? createPoint(0, 0) : createPoint(
      (abc2.b * abc1.c - abc1.b * abc2.c) / det,
      (abc1.a * abc2.c - abc2.a * abc1.c) / det,
    );
  }
  function posToABC(v: Vector, p: Point) {
    const a = v.y;
    const b = -v.x;
    const c = a * p.x + b * p.y;
    return { a, b, c };
  }
};

