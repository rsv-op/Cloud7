
import launchData from '../data/launchseven-data.json';

export interface PricingTier {
  name: string;
  price: string;
  tagline: string;
  badge: string;
  highlight: boolean;
  features: string[];
}

export interface CompanyInfo {
  name: string;
  parentEntity: string;
  founder: string;
  deliveryWindow: string;
  pricingBase: string;
}

export interface LaunchDataSchema {
  company: CompanyInfo;
  pricingTiers: PricingTier[];
  categories: string[];
}

/**
 * Retrieves structured LaunchSeven Studio configuration data.
 * Executes entirely at build time for zero runtime latency.
 */
export function getLaunchData(): LaunchDataSchema {
  return launchData as LaunchDataSchema;
}

export function getPricingTiers(): PricingTier[] {
  return launchData.pricingTiers;
}

export function getCategories(): string[] {
  return launchData.categories;
}
