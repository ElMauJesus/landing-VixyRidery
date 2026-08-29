import {
  NavItem,
  FeatureItem,
  ProcessStep,
  BenefitItem,
  SafetyPillar,
} from "../types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Pasajeros", href: "#pasajeros" },
  { label: "Riders", href: "#riders" },
  { label: "Tienda", href: "#tienda" },
  { label: "Seguridad", href: "#seguridad" },
];

export const VIXY_FEATURES: FeatureItem[] = [
  {
    id: "rapido",
    title: "Rápido",
    description: "Llega más rápido a tu destino.",
    iconName: "Zap",
  },
  {
    id: "economico",
    title: "Económico",
    description: "Tarifas justas y accesibles.",
    iconName: "DollarSign",
  },
  {
    id: "seguro",
    title: "Seguro",
    description: "Riders verificados y viajes protegidos.",
    iconName: "ShieldCheck",
  },
  {
    id: "disponible",
    title: "Disponible 24/7",
    description: "Viaja cuando lo necesites.",
    iconName: "Clock",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Ingresa tu destino",
    description: "Dinos a dónde quieres ir.",
    iconName: "MapPin",
  },
  {
    stepNumber: 2,
    title: "Elegimos tu Rider",
    description: "Te asignamos el rider más cercano.",
    iconName: "Bike",
  },
  {
    stepNumber: 3,
    title: "Disfruta tu viaje",
    description: "Viaja seguro y cómodo.",
    iconName: "HardHat",
  },
  {
    stepNumber: 4,
    title: "Llegas a tu destino",
    description: "Rápido, fácil y sin complicaciones.",
    iconName: "CheckCircle2",
  },
];

export const PASSENGER_BENEFITS: BenefitItem[] = [
  {
    id: "p1",
    title: "Tarifas bajas",
    description: "Viaja desde los $2 con precios justos.",
    iconName: "Banknote",
  },
  {
    id: "p2",
    title: "Viajes seguros",
    description: "Riders verificados y seguimiento en tiempo real.",
    iconName: "ShieldCheck",
  },
  {
    id: "p3",
    title: "Disponibilidad",
    description: "Servicio 24/7, cuando lo necesites.",
    iconName: "Clock",
  },
  {
    id: "p4",
    title: "Soporte 24/7",
    description: "Estamos para ayudarte en todo momento.",
    iconName: "Headphones",
  },
  {
    id: "p5",
    title: "Botón de pánico",
    description: "Tu seguridad es nuestra prioridad.",
    iconName: "Siren",
  },
];

export const RIDER_BENEFITS: BenefitItem[] = [
  {
    id: "r1",
    title: "90% de ganancia",
    description: "Quédate con el 90% de cada viaje.",
    iconName: "TrendingUp",
  },
  {
    id: "r2",
    title: "Pago inmediato",
    description: "Recibe tu dinero al instante después de cada viaje.",
    iconName: "Wallet",
  },
  {
    id: "r3",
    title: "Póliza de seguros",
    description: "Te protegemos a ti y a los pasajeros.",
    iconName: "ShieldCheck",
  },
  {
    id: "r4",
    title: "Soporte 24/7",
    description: "Asistencia para riders todos los días.",
    iconName: "Headphones",
  },
  {
    id: "r5",
    title: "Botón de pánico",
    description: "Tu seguridad es primero.",
    iconName: "Siren",
  },
];

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    id: "s1",
    title: "Riders verificados",
    description: "Todos nuestros riders pasan por un proceso de verificación.",
    iconName: "UserCheck",
  },
  {
    id: "s2",
    title: "Seguimiento en vivo",
    description: "Comparte tu viaje en tiempo real con quien quieras.",
    iconName: "Share2",
  },
  {
    id: "s3",
    title: "Botón de pánico",
    description: "Alerta inmediata a nuestro equipo de seguridad.",
    iconName: "AlertTriangle",
  },
  {
    id: "s4",
    title: "Atención 24/7",
    description: "Estamos disponibles para ayudarte siempre que nos necesites.",
    iconName: "Headphones",
  },
];
