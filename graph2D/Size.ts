export interface Size {
  readonly width: number;
  readonly height: number;
}

export const isSize = (sz: any): sz is Size =>
  sz && sz.width && sz.height && typeof (sz.width) === "number" && typeof (sz.height) === "number";

export const createSize = (width: number, height?: number): Size =>
  ({ width, height: height !== undefined ? height : width });
