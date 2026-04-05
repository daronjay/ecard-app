export interface TextConfig {
  recipientName: string;
  senderName: string;
  date: string;
  message: string;
  // position offsets as percentages (0-100) from top-left
  messageY: number;
}

export interface CardData {
  id: string;
  userId: string | null;
  photoUrl: string | null;
  template: string;
  animated: boolean;
  format: "landscape" | "portrait";
  textConfig: TextConfig;
  createdAt: string;
}

export const defaultTextConfig: TextConfig = {
  recipientName: "",
  senderName: "",
  date: new Date().toISOString().split("T")[0],
  message: "Thinking of you!",
  messageY: 60,
};
