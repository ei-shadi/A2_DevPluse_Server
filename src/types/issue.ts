export const issueType = {
  bug: "bug",
  feature_request: "feature_request",
} as const;

export const issueStatus = {
  open: "open",
  in_progress: "in_progress",
  resolved: "resolved",
} as const;

export type TIssueType = keyof typeof issueType;
export type TIssueStatus = keyof typeof issueStatus;

export type TIssue = {
  id: number;
  reporter_id: number;
  title: string;
  description: string;
  type: TIssueType;
  status?: TIssueStatus;
  created_at: Date;
  updated_at: Date;
};

// Filter Type For fetching 
export type TIssueQueryFilters = {
  sort?: string;
  type?: string;
  status?: string;
};