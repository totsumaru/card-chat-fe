export interface Message {
  text: string;
  sentBy: string;
  sentAt: Date;
  isChatOwner?: boolean;
}

export const messages: Message[] = [
  {
    text: "Hey!",
    sentBy: "devlazar",
    sentAt: new Date("2023-03-02T09:00:00Z"),
    isChatOwner: true
  },
  {
    text: "Hey, devlazar!",
    sentBy: "anon",
    sentAt: new Date("2023-03-02T09:01:00Z"),
    isChatOwner: false
  },
  {
    text: "Do you like this chat?",
    sentBy: "devlazar",
    sentAt: new Date("2023-03-02T09:02:00Z"),
    isChatOwner: true
  },
  {
    text: "Looks nice!",
    sentBy: "anon",
    sentAt: new Date("2023-03-02T09:03:00Z"),
    isChatOwner: false
  }
];

