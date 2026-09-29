import {
  Car,
  Home,
  KeyRound,
  Building2,
  Landmark,
  Briefcase,
  Shield,
  Layers,
  Truck,
  HardHat,
  Heart,
  Umbrella,
  MessageCircle,
  Phone,
  Mail,
  Quote,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  car: Car,
  home: Home,
  key: KeyRound,
  building: Building2,
  landmark: Landmark,
  briefcase: Briefcase,
  shield: Shield,
  layers: Layers,
  truck: Truck,
  hardhat: HardHat,
  heart: Heart,
  umbrella: Umbrella,
  chat: MessageCircle,
  phone: Phone,
  mail: Mail,
  quote: Quote,
};

export function ProductIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] || Shield;
  return <Icon className={className} aria-hidden />;
}

export { ArrowRight };
