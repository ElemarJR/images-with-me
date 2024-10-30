export interface Prediction {
  id: string;
  output: string[];
  status: string;
}

export interface Version {
  prompt: string;
  predictions: Prediction[];
  isGenerating: boolean;
  currentImageIndex: number;
} 