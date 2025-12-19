
export interface ImageRef {
  base64: string;
  preview: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface AspectRatioOption extends Option {
  icon: string;
}

export interface ClothingOption {
    id: string;
    label: string;
}
