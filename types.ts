import React from 'react';

export type StyleType = 'image' | 'color' | 'intensity';

export interface Style {
  id: string;
  label: string;
  englishLabel: string;
  type: StyleType;
  value: string; // URL for 'image', hex code for 'color', label for 'intensity'
  isPremium?: boolean;
  promptInstruction?: string;
}

export interface SubFeature {
  id: string;
  label:string;
  englishLabel: string;
  isPremium?: boolean;
  styles: Style[];
  promptInstruction?: string;
  hasIntensitySlider?: boolean;
}

export type BadgeType = 'Free' | 'Hot' | 'NEW';

export interface Feature {
  id: string;
  label: string;
  englishLabel: string;
  icon: React.ReactNode;
  badge?: BadgeType;
  subFeatures?: SubFeature[];
  promptInstruction?: string;
  isPremium?: boolean;
}

export interface HistoryItem {
  id: string;
  imageDataUrl: string;
}
