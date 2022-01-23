export interface Toast {
  message: string
  type: ToastType
}

export enum ToastType {
  Error,
  Warning,
  Fine
}
