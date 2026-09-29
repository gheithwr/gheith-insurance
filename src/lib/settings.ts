export type AgencySettings = {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  markets: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  smsConsent: string;
};

export const DEFAULT_SETTINGS: AgencySettings = {
  companyName: "Gheith Insurance",
  tagline: "Insurance Made Simple. Protection Made Personal.",
  phone: "",
  email: "",
  whatsappNumber: "",
  whatsappMessage:
    "Hello Gheith Insurance, I would like help with an insurance quote.",
  address: "",
  city: "",
  state: "",
  zip: "",
  hours: "Hours will be published once confirmed.",
  markets: "New York & New Jersey",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  seoTitle:
    "Gheith Insurance | Independent Insurance Broker in New York & New Jersey",
  seoDescription:
    "Gheith Insurance helps individuals, families, property owners and businesses in New York and New Jersey find insurance solutions that fit their needs.",
  smsConsent:
    "By providing a phone number, you agree that Gheith Insurance may contact you about your inquiry by phone, text, or WhatsApp. Message frequency varies. Message and data rates may apply. Reply STOP to opt out.",
};

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function whatsappLink(number: string, message: string) {
  const digits = digitsOnly(number);
  const text = encodeURIComponent(message);
  if (!digits) return "";
  return `https://wa.me/${digits}?text=${text}`;
}

export function hasConfiguredAddress(settings: AgencySettings) {
  return Boolean(settings.address && settings.city && settings.state);
}

export function formatPhoneDisplay(phone: string) {
  const digits = digitsOnly(phone);
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}
