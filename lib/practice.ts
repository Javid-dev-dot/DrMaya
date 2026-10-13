/**
 * Single source of truth for practice details and approved remote imagery.
 * Keeping URLs here means image hosts are audited in one place (see
 * `images.remotePatterns` in next.config.ts).
 */

export const practice = {
  name: "Dr. Maya Reynolds, PsyD",
  shortName: "Dr. Maya Reynolds",
  role: "Licensed Clinical Psychologist",
  license: "PSY 31245",
  licenseFull: "CA PSY 31245",
  phoneDisplay: "(310) 555-0198",
  phoneHref: "tel:+13105550198",
  emailDisplay: "contact@drmayareynolds.com",
  emailHref: "mailto:contact@drmayareynolds.com",
  addressLines: ["1230 Montana Ave, Suite 300", "Santa Monica, CA 90403"],
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=1230+Montana+Ave+Suite+300+Santa+Monica+CA+90403",
  responseTime: "24 to 48 business hours",
  crisisLine: "988",
  crisisHref: "tel:988",
  crisisText: "Text or call 988",
  crisisLabel: "988 Suicide & Crisis Lifeline",
  siteUrl: "https://www.drmayareynolds.com",
} as const;

export const images = {
  hero: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
  portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  officeSeating: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  officeLight: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e",
  officeCorner: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
} as const;

export const imageAlts = {
  hero:
    "Calm, light-filled therapy room with two armchairs facing each other across a low table",
  portrait:
    "Portrait of Dr. Maya Reynolds, PsyD, Clinical Psychologist in Santa Monica, California",
  officeSeating:
    "Intimate consultation seating with warm textiles in the Santa Monica office",
  officeLight:
    "Sunlit therapy room with tall windows and indoor plants",
  officeCorner:
    "Quiet corner of the practice with soft textiles and natural textures",
} as const;
