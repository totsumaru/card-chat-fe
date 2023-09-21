import { avatarUrl1, avatarUrl2, hostId1, hostId2 } from "@/utils/sample/Sample";

export type User = {
  id: string
  name: string
  avatarUrl: string
  headline: string
  introduction: string
  company: {
    name: string
    position: string
    tel: string
    email: string
    website: string
  }
}

/**
 * ユーザーのモックです
 */
export const usersDB: User[] = [
  {
    id: hostId1,
    name: "戸塚 翔太",
    avatarUrl: avatarUrl1,
    headline: "ナンバーワンよりオンリーワンを目指します",
    introduction: "はじめまして。株式会社びずまっぷすの営業担当、佐藤次郎です。ありきたりな名前の私ですが、座右の銘は「ナンバーワンよりオンリーワンをめざせ」です！営業はどの業界でも成績が重要視される傾向にありますが、私はお客様の本当の幸せを提供するために、オンリーワンの営業活動をモットーとしております。お客様の相談役として精一杯サポートいたしますので、ご相談やご要望など、遠慮なくお申しつけください！",
    company: {
      name: "株式会社ArGate",
      position: "営業部 営業第二課",
      tel: "090-7685-1396",
      email: "techstart35@gmail.com",
      website: "https://argate.jp",
    },
  },
  {
    id: hostId2,
    name: "斎藤佑樹",
    avatarUrl: avatarUrl2,
    headline: "ホスト2です",
    introduction: "はじめまして。ホスト2です",
    company: {
      name: "遠州鉄道 株式会社",
      position: "計画課",
      tel: "053-455-2255",
      email: "totsuka.ast@entetsu.co.jp",
      website: "https://entetsu.jp",
    },
  },
]
