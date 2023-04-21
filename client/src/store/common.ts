import api from "@api/index";
import crypto from "crypto-js";

interface TeamListType {
  idx: number;
  nameEng: string;
  nameKor: string;
}

class Common {
  totalTeamList: TeamListType | [] = [];

  async getTeamList() {
    const { data } = await api.get("/list/team/list");
    this.totalTeamList = data.ok ? data.result : [];
    return this.totalTeamList;
  }

  async getTeam({ teamId }: { teamId: number }) {
    const { data } = await api.get("/list/team/list", { params: { teamId } });
    return { list: data.result };
  }

  setEncode(data: string, secretKey: string) {
    if (!data) return null;
    const byte = crypto.AES.encrypt(JSON.stringify(data), secretKey);
    const encode = byte.toString();
    return encode;
  }

  setDecode(data: string, secretKey: string) {
    if (!data) return null;
    const byte = crypto.AES.decrypt(data, secretKey);
    const decode = byte.toString(crypto.enc.Utf8);
    return JSON.parse(decode);
  }

  async saveLocalStorage(params: {
    accessToken: string;
    refreshToken: string;
    userName: string;
    account: string;
    teamId: string;
    teamName: string;
  }) {
    const account = localStorage.getItem("account");
    const keys = [
      "accessToken",
      "refreshToken",
      "userName",
      "teamId",
      "teamName",
    ];
    for (const key of keys) {
      const encode = common.setEncode(params[key], `${key}${account}`);
      localStorage.setItem(key, encode);
    }
  }
}

export const common = new Common();
