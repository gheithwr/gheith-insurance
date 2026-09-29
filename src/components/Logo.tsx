import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string | null;
  className?: string;
  height?: number;
  invertSafe?: boolean;
  priority?: boolean;
};

export function Logo({
  href = "/",
  className = "",
  height = 52,
  invertSafe = false,
  priority = false,
}: LogoProps) {
  const image = (
    <Image
      src="/images/gheith-logo.webp"
      alt="Gheith Insurance Agency Inc. logo"
      width={1536}
      height={1024}
      priority={priority}
      className={`h-full w-auto max-w-full object-contain object-left ${className}`}
    />
  );

  const wrapped = (
    <span
      className={`inline-flex items-center ${invertSafe ? "rounded-xl bg-white px-2.5 py-1.5" : ""}`}
      style={{ height }}
    >
      {image}
    </span>
  );

  if (!href) return wrapped;
  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Gheith Insurance Agency home">
      {wrapped}
    </Link>
  );
}
