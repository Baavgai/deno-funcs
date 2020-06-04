import { Point, addPoint, subPoint } from "./Point.ts";
import { Size } from "./Size.ts";

export interface Rect extends Point, Size {
}

export function createRect(x: number, y: number, width: number, height: number): Rect;
export function createRect(pt: Point, size: Size): Rect;
export function createRect(ptOrX: Point | number, szOrY: Size | number, w = 0, h = 0): Rect {
  const create = (x: number, y: number, width: number, height: number): Rect => ({ x, y, width, height });
  if (typeof (ptOrX) === "number" && typeof (szOrY) === "number") {
    return create(ptOrX, szOrY, w, h)
  } else if (typeof (ptOrX) !== "number" && typeof (szOrY) !== "number") {
    return create(ptOrX.x, ptOrX.y, szOrY.width, szOrY.height);
  } else {
    return create(0, 0, w, h);
  }
}

export const translateRect = (r: Rect, p: Point) => createRect(addPoint(r, p), r);
export const inRect = (r: Rect, p: Point): boolean => {
  const ps = subPoint(p, r);
  return ps.x >= 0 && ps.y >= 0 && ps.x < r.width && ps.y < r.height;
};
