export interface Shop {
  id: number;
  name: string;
  slug: string;
  logo: string;
  websiteUrl: string;
  address: string;
  description: string;
  isActive: boolean;
  profileId: string;
  profileName: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string
}
