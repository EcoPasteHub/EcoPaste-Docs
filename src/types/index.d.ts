export interface Release {
  body: string;
  name: string;
  created_at: string;
  assets: ReleaseAsset[];
}

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}
