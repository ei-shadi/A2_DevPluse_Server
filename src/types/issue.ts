export const issueType = ["bug", "feature_request"] as const;

export type TIssueType = typeof issueType[number];

export type TIssue = {
  id: number;
  reporter_id: number;
  title: string;
  description: string;
  type: TIssueType;
  status: string;
  created_at: Date;
  updated_at: Date;
}