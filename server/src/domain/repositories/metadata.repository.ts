import { Tags } from 'exiftool-vendored';

export const IMetadataRepository = 'IMetadataRepository';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface ReverseGeocodeResult {
  country: string | null;
  state: string | null;
  city: string | null;
}

export interface ExifDuration {
  Value: number;
  Scale?: number;
}

export interface ImmichTagsBase extends Omit<Tags, 'FocalLength' | 'Duration'> {
  ContentIdentifier?: string;
  MotionPhoto?: number;
  MotionPhotoVersion?: number;
  MotionPhotoPresentationTimestampUs?: number;
  MediaGroupUUID?: string;
  ImagePixelDepth?: string;
  FocalLength?: number;
  Duration?: number | ExifDuration;
}

// Extends properties not defined by exiftools tag
export interface ImmichTags extends Omit<ImmichTagsBase, 'RegionInfo'> {
  /** ☆☆☆☆ ✔ Example: {"AppliedToDimensions":{"H":3552,"W":2000},"RegionList":[…ace"}]} */
  RegionInfo?: {
    /** ☆☆☆☆ ✔ Example: {"H": 640, "Unit": "pixel", "W": 800} */
    AppliedToDimensions: {
      W: number;
      H: number;
      Unit: string;
    },
    /** ☆☆☆☆ ✔ Example: [{"Area":{},"Name":"John Doe","Type":"Face"}] */
    RegionList: {
      Area: {
        // (X,Y) // center of the rectancle
        // W & H: rectangle width and height
        X: number;
        Y: number;
        W: number;
        H: number;
        Unit: string;
      },
      Rotation?: number;
      Type?: string;
      Name?: string;
    }[],
  };
}

export interface IMetadataRepository {
  init(): Promise<void>;
  teardown(): Promise<void>;
  reverseGeocode(point: GeoPoint): Promise<ReverseGeocodeResult | null>;
  readTags(path: string): Promise<ImmichTags | null>;
  writeTags(path: string, tags: Partial<Tags>): Promise<void>;
}
