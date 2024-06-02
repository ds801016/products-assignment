export interface ResponseType {
  data: null | any;
  message: string | null;
  success: true;
}
export interface DialogPropType {
  show: boolean;
  hide: () => void;
}
