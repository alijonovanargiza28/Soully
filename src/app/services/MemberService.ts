import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getSeller(): Promise<Member> {
    try {
      const url = this.path + "/member/seller";
      const result = await axios.get(url);

      return result.data;
    } catch (err) {
      console.error("Error, getSeller", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";

      const result = await axios.post(url, input, {
        withCredentials: true,
      });

      const member: Member = result.data.member;

      return member;
    } catch (err) {
      console.error("Error, signup", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";

      const result = await axios.post(url, input, {
        withCredentials: true,
      });

      const member: Member = result.data.member;

      return member;
    } catch (err) {
      console.error("Error, login", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";

      await axios.post(
        url,
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.error("Error, logout", err);
      throw err;
    }
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();

      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      if (input.memberAdress !== undefined) formData.append("memberAdress", input.memberAdress);
      if (input.memberDesc !== undefined) formData.append("memberDesc", input.memberDesc);

      if (input.memberImage) {
        formData.append("memberImage", input.memberImage);
      }

      const result = await axios.post(`${this.path}/member/update`, formData, {
        withCredentials: true,
      });

      const member: Member = result.data;

      return member;
    } catch (err) {
      console.error("Error, updateMember", err);
      throw err;
    }
  }
}

export default MemberService;
