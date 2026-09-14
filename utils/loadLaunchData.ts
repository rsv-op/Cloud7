import launchData from '../data/launchseven-data.json';

export interface PricingTier {
  name: string;
  price: string;
  badge: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export interface LaunchDataSchema {
  company: {
    name: string;
    parentEntity: string;
    founder: string;
    deliveryWindow: string;
    pricingBase: string;
  };
  categories: string[];
  pricingTiers: PricingTier[];
  system?: any;
  modules?: any;
}

// Operational Bypass: Cast through 'unknown' to satisfy strict Webpack compilation
export function getLaunchData(): LaunchDataSchema {
  return (launchData as unknown) as LaunchDataSchema;
}

export function getPricingTiers(): PricingTier[] {
  const data = (launchData as unknown) as LaunchDataSchema;
  return data.pricingTiers || [];
}

export function getCategories(): string[] {
  const data = (launchData as unknown) as LaunchDataSchema;
  return data.categories || [];
}
