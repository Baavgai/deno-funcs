import { Point, addPoint, createPoint } from "./Point.ts";
import { Vector, getIntersect } from "./Vector.ts";

export interface BoundVector extends Vector {
  readonly origin: Point;
}

export const createBoundVector = ({ x, y }: Vector, origin: Point): BoundVector =>
  ({ x, y, origin });

export const translateBoundVector = (v: BoundVector) =>
  createBoundVector(addPoint(v, v.origin), v.origin);

export const getIntersectVect = (bv: BoundVector, v: Vector) =>
  getIntersect(bv, bv.origin, v, createPoint(0, 0));
