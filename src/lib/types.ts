export interface TextConfig {
  recipientName: string;
  senderName: string;
  date: string;
  message: string;
  // position offsets as percentages (0-100) from top-left
  messageY: number;
}

export interface PhotoTransform {
  scale: number;
  // offset in % of card dimensions, 0 = centered
  x: number;
  y: number;
}

export const defaultPhotoTransform: PhotoTransform = {
  scale: 1,
  x: 0,
  y: 0,
};

export interface CardData {
  id: string;
  userId: string | null;
  photoUrl: string | null;
  template: string;
  animated: boolean;
  format: "landscape" | "portrait";
  textConfig: TextConfig;
  photoTransform?: PhotoTransform;
  createdAt: string;
}

export const defaultTextConfig: TextConfig = {
  recipientName: "",
  senderName: "",
  date: new Date().toISOString().split("T")[0],
  message: "Thinking of you!",
  messageY: 60,
};
