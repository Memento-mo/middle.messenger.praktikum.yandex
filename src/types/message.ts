export interface IMessage {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  user_name?: string;
  content: string;
  isMine?: boolean;
  events?: Record<string, (e?: Event) => void>;
}
