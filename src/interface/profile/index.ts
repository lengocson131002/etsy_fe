export interface CreateProfile {
  goLoginProfileId: string;
  name: string;
  notes?: string;
  createdDate: string;
  proxy: string;
  folderName?: string;
}


export interface Profile {
  id: string | number;
  goLoginProfileId: string;
  name: string;
  notes?: string;
  createdDate: string;
  proxy: string;
  folderName?: string;
  shopId?: string;
  shopName?: string;
}
