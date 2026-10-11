// Facts that are the same in every language. Translated text lives in src/i18n/locales/.
export const company = {
  email: 'contact@xiontechs.com',
  phones: {
    usa: '+1 469 322 9899',
    vietnam: '+84 908 107 552',
    whatsapp: '+1 469 439 9345',
  },
  // Brand names, not translated.
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/xiontechs', icon: 'facebook' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/xiontechs', icon: 'linkedin' },
  ],
} as const;

/** `+1 469 322 9899` -> `tel:+14693229899` */
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

/** `+1 469 439 9345` -> `https://wa.me/14694399345` */
export const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`;
