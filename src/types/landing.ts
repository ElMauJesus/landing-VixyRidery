export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BenefitCategory {
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface SafetyPillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  image: string;
}
