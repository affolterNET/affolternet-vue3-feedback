import { eventService } from '../services/EventService';

type Param = { [key: string]: string }
export type ToastType = 'error' | 'warning' | 'info' | 'done'
export type ToastParams = {
  type: ToastType,
  message: string | null,
  duration: number,
  param: Param | undefined,
}

let instance: ToastService | null = null;

export class ToastService {

  constructor() {
    if (!instance) {
      instance = this
    }
    return this
  }

  private getParams(type: ToastType, message: string, duration: number, param?: Param): ToastParams {
    return {
      type: type,
      message: message,
      duration: duration,
      param: param,
    }
  }

  public showError(message: string, param?: Param, duration?: number): void {
    const params = this.getParams('error', message, duration || 50000000, param)
    eventService.emit(eventService.showToastKey, params)
  }

  public showWarning(message: string, param?: Param, duration?: number): void {
    const params = this.getParams('warning', message, duration || 5000, param)
    eventService.emit(eventService.showToastKey, params)
  }

  public showInfo(message: string, param?: Param, duration?: number): void {
    const params = this.getParams('info', message, duration || 5000, param)
    eventService.emit(eventService.showToastKey, params)
  }

  public showDone(message: string, param?: Param, duration?: number): void {
    const params = this.getParams('done', message, duration || 1000, param)
    eventService.emit(eventService.showToastKey, params)
  }
}

export const toastService: ToastService = new ToastService()
