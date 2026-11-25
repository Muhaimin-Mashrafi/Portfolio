/** Boot-sequence settings shared by the component and the pre-paint script. */
export const BOOT_STORAGE_KEY = "boot-seen";
/** Total length of the sequence in ms. Keep in sync with the timings in globals.css (.boot animations). */
export const BOOT_TOTAL_MS = 3400;

/**
 * Runs in <head> before first paint. Marks the intro as skipped for reduced-motion visitors and for
 * anyone who has already seen it in this browser tab, so the overlay never flashes.
 */
export const bootPrePaintScript = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem(${JSON.stringify(
  BOOT_STORAGE_KEY,
)})){d.dataset.boot="skip"}}catch(e){}})();`;
