import { eventService } from '../services/EventService'

let instance: LoaderService | null = null

export class LoaderService {

  constructor() {
    if (!instance) {
      instance = this
    }
    return this
  }

  public showLoader() {
    eventService.emit(eventService.showLoaderKey)
  }

  public hideLoader() {
    eventService.emit(eventService.hideLoaderKey)
  }
}

export const loaderService: LoaderService = new LoaderService()
