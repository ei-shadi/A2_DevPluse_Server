import type { TIssue } from "../../types/issue";


const createIssueIntoDB = async (payload: TIssue) => {
console.log(payload)
}

export const issueService = {
  createIssueIntoDB,
};