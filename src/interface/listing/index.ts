export interface Listing {
  id?: number;
  etsyListingId?: string;
  title?: string;
  imageUrl?: string;
  priceFrom?: number;
  priceTo?: number;
  status?: string;
  last3numberVisits?: number;
  last3numberFavourites?: number;
  allTimeSales?: number;
  allTimeRevenue?: number;
  allTimeRenewals?: number;
  stock?: number;
  shopId: string;
  shopName: string;
  currencyCode: string;
  currencySymbol: string
}
