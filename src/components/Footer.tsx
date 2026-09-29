import Link from "next/link";
import type { AgencySettings } from "@/lib/settings";
import { formatPhoneDisplay, hasConfiguredAddress, whatsappLink } from "@/lib/settings";
import { Logo } from "@/components/Logo";

export function Footer({ settings }: { settings: AgencySettings }) {
  const wa = whatsappLink(settings.whatsappNumber, settings.whatsappMessage);
  const showAddress = hasConfiguredAddress(settings);
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo href="/" height={72} invertSafe />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/80">
            A modern independent insurance agency combining personal service, insurance
            expertise, digital convenience, AI-assisted support, and WhatsApp communication.
          </p>
          <p className="mt-4 text-sm text-teal-200">{settings.markets}</p>
          <Link
            href="/quote"
            className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-gold px-5 text-sm font-bold tracking-wide text-navy hover:bg-gold-dark"
          >
            GET A QUOTE
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Insurance</p>
          <ul className="mt-4 space-y-2 text-sm text-blue-100/85">
            <li><Link href="/insurance/auto" className="hover:text-white">Auto</Link></li>
            <li><Link href="/insurance/homeowners" className="hover:text-white">Home</Link></li>
            <li><Link href="/insurance/renters" className="hover:text-white">Renters</Link></li>
            <li><Link href="/insurance/landlord" className="hover:text-white">Landlord</Link></li>
            <li><Link href="/business-insurance" className="hover:text-white">Business</Link></li>
            <li><Link href="/insurance/commercial-auto" className="hover:text-white">Commercial Auto</Link></li>
            <li><Link href="/insurance/life" className="hover:text-white">Life</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-blue-100/85">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/team" className="hover:text-white">Team</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link href="/claims" className="hover:text-white">Claims</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/portal" className="hover:text-white">Client Portal</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-blue-100/85">
            <li>
              {settings.phone ? (
                <a href={`tel:${settings.phone}`} className="hover:text-white">
                  {formatPhoneDisplay(settings.phone)}
                </a>
              ) : (
                <span>Phone: configure in admin settings</span>
              )}
            </li>
            <li>
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              ) : (
                <span>Email: configure in admin settings</span>
              )}
            </li>
            <li>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
              ) : (
                <span>WhatsApp: configure in admin settings</span>
              )}
            </li>
            <li>
              {showAddress
                ? `${settings.address}, ${settings.city}, ${settings.state} ${settings.zip}`
                : "Address will display after it is configured."}
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-blue-100/85">
            <li><Link href="/legal/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/legal/accessibility" className="hover:text-white">Accessibility</Link></li>
            <li><Link href="/legal/communications" className="hover:text-white">Communications</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-blue-100/60">
        <p>
          Insurance products are offered only where the agency and producers are properly licensed.
          Coverage, eligibility, and pricing are determined by the insurance carrier.
        </p>
        <p className="mt-2">
          {new Date().getFullYear()} {settings.companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
