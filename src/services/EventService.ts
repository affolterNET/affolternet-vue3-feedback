import mitt, { EventType, Handler as h } from 'mitt'

let instance: EventService | null = null

export class EventService {

  public emitter = mitt()

  // Loader
  public readonly showLoaderKey = 'showLoader'
  public readonly hideLoaderKey = 'hideLoader'
  // Toasts
  public readonly showToastKey = 'showToast'
  
  constructor() {
    if (!instance) {
      instance = this
    }

    return this
  }

  public on(eventType: string | symbol | '*', handler: (e: any) => void) {
    this.emitter.on(eventType, handler)
  }

  public off(eventType: string | symbol | '*', handler: (e: any) => void) {
    this.emitter.off(eventType, handler)
  }

  public emit(eventType: string, arg: any = null) {
    this.emitter.emit(eventType, arg)
  }
}

export const eventService: EventService = new EventService()
