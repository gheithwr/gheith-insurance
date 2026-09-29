import { prisma } from "./db";
import { PRODUCTS } from "./products";
import { FAQ_ITEMS } from "./faq";
import { hashPassword } from "./auth";
import { DEFAULT_SETTINGS } from "./settings";

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: PRODUCTS.map((p, i) => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        shortDesc: p.shortDesc,
        longDesc: p.longDesc,
        icon: p.icon,
        highlights: JSON.stringify(p.highlights),
        sortOrder: i,
        published: true,
      })),
    });
  }

  const faqCount = await prisma.faq.count();
  if (faqCount === 0) {
    await prisma.faq.createMany({
      data: FAQ_ITEMS.map((f, i) => ({
        question: f.question,
        answer: f.answer,
        sortOrder: i,
        published: true,
      })),
    });
  }

  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    const articles = [
      {
        slug: "what-to-have-ready-for-an-auto-quote",
        title: "What to Have Ready for an Auto Insurance Quote Request",
        category: "Auto",
        excerpt:
          "A practical checklist of non-sensitive details that help an independent agency start an auto insurance conversation.",
        content: `Requesting an auto insurance quote does not require sharing Social Security numbers, payment information, or driver's license numbers on an initial website form.

Helpful details often include:

- ZIP code where the vehicle is kept
- Year, make, and model
- Number of drivers
- Whether you currently have insurance

A Gheith Insurance representative may later request additional information required by an insurance carrier. Coverage, eligibility, and pricing are determined by the carrier.`,
      },
      {
        slug: "home-insurance-questions-to-consider",
        title: "Home Insurance Questions Worth Considering",
        category: "Home",
        excerpt:
          "Coverage needs vary by property. These questions can help you prepare for a conversation with a representative.",
        content: `Home-related insurance conversations often start with occupancy, property type, and location. Gheith Insurance can help you request a quote and discuss typical coverage categories.

This article is educational and does not describe a specific policy, premium, or carrier offering.`,
      },
      {
        slug: "starting-a-business-insurance-conversation",
        title: "Starting a Business Insurance Conversation",
        category: "Business",
        excerpt:
          "Business insurance depends on operations, location, and contracts. Here is how to begin a quote request.",
        content: `If you operate a business in New York or New Jersey, it can help to gather:

- Business name and ZIP code
- Type of work
- Approximate number of employees
- Coverages you have been asked about, such as general liability or workers' compensation

Gheith Insurance can help you start that conversation. We do not invent carrier partnerships or guaranteed savings.`,
      },
      {
        slug: "how-claims-assistance-works-with-an-agency",
        title: "How Claims Assistance Works With an Agency",
        category: "Claims",
        excerpt:
          "Agencies can help you start a claim conversation. Carriers make coverage and payment decisions.",
        content: `If you need to file a claim, Gheith Insurance can help you gather next steps, request a callback, or connect by phone or WhatsApp.

Applicable insurance carriers make claim coverage and payment decisions. This website cannot report claim status or promise an outcome.`,
      },
      {
        slug: "insurance-tips-for-new-york-and-new-jersey-households",
        title: "Insurance Tips for New York and New Jersey Households",
        category: "Insurance Tips",
        excerpt:
          "A high-level overview of how to prepare for a coverage conversation in NY and NJ.",
        content: `Household insurance needs vary widely. Useful preparation includes knowing your ZIP code, property or vehicle basics, and preferred contact method.

Gheith Insurance serves New York and New Jersey where licensing and service availability are confirmed. Always verify current licensing before assuming a product can be offered in a specific location.`,
      },
    ];
    await prisma.article.createMany({
      data: articles.map((a) => ({
        ...a,
        status: "published",
        seoTitle: a.title,
        seoDesc: a.excerpt,
        publishedAt: new Date(),
      })),
    });
  }

  const settingsCount = await prisma.siteSetting.count();
  if (settingsCount === 0) {
    await prisma.siteSetting.createMany({
      data: Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
        key,
        value,
      })),
    });
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        username: "admin",
        name: "Agency Administrator",
        role: "admin",
        passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || "ChangeMeNow!"),
      },
    });
  }

  seeded = true;
}

export async function getSettingsMap() {
  await ensureSeed();
  const rows = await prisma.siteSetting.findMany();
  const map = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    if (row.key in map) {
      (map as Record<string, string>)[row.key] = row.value;
    }
  }
  if (process.env.WHATSAPP_NUMBER) map.whatsappNumber = process.env.WHATSAPP_NUMBER;
  if (process.env.CONTACT_EMAIL) map.email = process.env.CONTACT_EMAIL;
  if (process.env.CONTACT_PHONE) map.phone = process.env.CONTACT_PHONE;
  if (process.env.SITE_URL) map.siteUrl = process.env.SITE_URL;
  return map;
}
