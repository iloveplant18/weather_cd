import { DeviceType } from "../Types/types.ts";

function defineDeviceTypeService() {
  const ua = navigator.userAgent;
  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
      .test(ua)
  ) {
    return DeviceType.Mobile;
  }
  return DeviceType.Desktop;
}

export default defineDeviceTypeService;
