import { ExtraFormData } from '../../query';
import { JsonObject } from '../..';

export type HandlerFunction = (...args: unknown[]) => void;

export enum Behavior {
  CROSS_FILTER = 'CROSS_FILTER',
  NATIVE_FILTER = 'NATIVE_FILTER',
}

export type DataMaskCurrentState = { value?: any; [key: string]: any };

export type DataMask = {
  nativeFilters?: {
    extraFormData?: ExtraFormData;
    currentState: DataMaskCurrentState;
  };
  crossFilters?: {
    extraFormData?: ExtraFormData;
    currentState: DataMaskCurrentState;
  };
  ownState?: JsonObject;
};

export type SetDataMaskHook = {
  ({ nativeFilters, crossFilters, ownState }: DataMask): void;
};

export interface PlainObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default {};
