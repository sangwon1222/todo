import { login } from "@store/login";
import { reactive } from "vue";
import api from "@api/index";

interface TodoType {
  idx: number;
  contents: string;
  status: number;
  creatorName: string;
  creatorId: string;
  createDate: string;
  creatorTeamId: string;
  updaterName?: string;
  updaterId?: string;
  updateDate?: string;
  updaterTeamId?: string;
  tag: any;
}
interface UpdateParamType {
  idx: number;
  todo?: string;
  status?: number;
  teamId?: number;
}

class TodoApi {
  /**
   * ** USER TODO 항목 조회
   * @returns `{ok: boolean , result:[] ,error: string }`
   */
  async getTodo({ teamId }: { teamId?: number | null }) {
    try {
      const apiName = "/todo/get";
      const { data } = await api.get(apiName, { params: { teamId } });
      const { ok, result } = data;

      return { ok, result, error: "" };
    } catch (e) {
      return { ok: false, result: [], error: e };
    }
  }

  /**
   * ** USER TODO 항목 추가
   * @param todo 추가할 todo의 내용
   * @returns -{ok: boolean , error: string }
   */
  async addTodo({ todo, teamId }: { todo: string; teamId?: number }) {
    if (!todo) return { ok: false, error: "TODO 내용이 없습니다." };

    const { data } = await api.post("todo/add", { todo, teamId });
    const { ok } = data;

    return { ok, error: "" };
  }

  /**
   * **TODO 항목 UPDATE
   * @param idx 수정할 todo의 고유idx
   * @param todo 수정할 todo의 내용
   * @returns `{ok: boolean , error: string }`
   */
  async updateTodo({ idx, todo, status, teamId }: UpdateParamType) {
    const apiName = "/todo/update";
    const { data } = await api.post(apiName, { idx, todo, status, teamId });
    const { ok, error } = data;

    return { ok, error };
  }

  /**
   * **TODO 항목 삭제
   * @param idx 수정할 todo의 고유idx
   * @returns `{ok: boolean , error: string }`
   */
  async deleteTodo({ idx, teamId }: { idx: number; teamId?: number }) {
    const apiName = "/todo/delete";
    const { data } = await api.post(apiName, { idx, teamId });
    const { ok, result, error } = data;

    return { ok, result, error };
  }
}

export const todoApi = reactive(new TodoApi());
export { TodoType };
