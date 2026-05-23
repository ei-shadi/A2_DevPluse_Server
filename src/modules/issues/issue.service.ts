import type { TIssue, TIssueQueryFilters } from "../../types/issue";
import { sql } from "../../db";
import { issueStatus, issueType } from "../../types/issue";

// Get All Issues Service with Dynamic Filtering and Sorting
const getAllIssuesFromDB = async (filters: TIssueQueryFilters) => {
  const { sort, type, status } = filters;

  // 1. Array to store dynamic WHERE conditions as SQL fragments
  const whereConditions = [];

  // 2. Type Validation & Dynamic WHERE clause fragments
  if (type) {
    if (issueType[type as keyof typeof issueType] === undefined) {
      throw new Error(
        `Invalid Issue Type: '${type}'. Please provide a valid type.`,
      );
    }
    whereConditions.push(sql`type = ${type}`);
  }

  // 2. Status Validation & Dynamic WHERE clause fragments
  if (status) {
    if (issueStatus[status as keyof typeof issueStatus] === undefined) {
      throw new Error(
        `Invalid Issue Status: '${status}'. Please provide a valid status.`,
      );
    }
    whereConditions.push(sql`status = ${status}`);
  }

  // 3. Dynamic Sorting & Validation fragment
  if (sort && sort !== "oldest" && sort !== "newest") {
    throw new Error(
      `Invalid Sort Option: '${sort}'. Please use 'oldest' or 'newest' as valid options.`,
    );
  }

  const orderClause =
    sort === "oldest"
      ? sql`ORDER BY created_at ASC`
      : sql`ORDER BY created_at DESC`;

  // 4. Combine everything into one single safe query using Neon's template compiler
  const issues = await sql`
    SELECT id, title, description, type, status, reporter_id, created_at, updated_at 
    FROM issues
    ${whereConditions.length > 0 ? sql`WHERE ${whereConditions.reduce((acc, current) => sql`${acc} AND ${current}`)}` : sql``}
    ${orderClause}
  `;

  // Return an empty array early if no issues are found
  if (issues.length === 0) return [];

  // 5. Batching: Extract unique reporter IDs to minimize redundant queries
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  // Fetch all reporters in a single batch query
  const reporters = await sql`
    SELECT id, name, role FROM users WHERE id = ANY(${reporterIds})
  `;

  // Create a fast O(1) lookup dictionary map for reporters
  const reporterMap = reporters.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<number, any>,
  );

  // 6. Data Mapping: Reshape response to match the required format
  return issues.map((issue) => {
    const { reporter_id, ...issueData } = issue;
    return {
      ...issueData,
      reporter: reporterMap[reporter_id] || null,
    };
  });
};

// Get Single Issue By Id Service
const getIssueByIdFromDB = async (id: string) => {
  // Input Validation: Ensure 'id' is a valid numeric string before querying
  if (!id || isNaN(Number(id))) {
    throw new Error(
      "Invalid Issue ID Provided. Please provide a valid numeric ID.",
    );
  }

  // 1. Fetch the issue by ID with proper typing
  const issues = (await sql`
    SELECT id, title, description, type, status, reporter_id, created_at, updated_at 
    FROM issues
    WHERE id = ${id}
  `) as TIssue[];

  // Early return if no issue is found with the given ID
  if (issues.length === 0) {
    throw new Error(`Issue with ID ${id} not found or does not exist.`);
  }

  // 2. Safely extract the first element from your typed array
  const issue = issues[0];

  // 3. Early return check to ensure 'issue' is not undefined
  if (!issue) return null;

  // 4. Fetch the reporter's details from the users table
  const users = await sql`
    SELECT id, name, role 
    FROM users 
    WHERE id = ${issue.reporter_id}
  `;

  // 5. Exclude 'reporter_id' from the issue object using destructuring
  const { reporter_id, ...issueData } = issue;

  // 6. Return the reshaped data with the clean reporter object injected
  return {
    ...issueData,
    reporter: users[0] || null,
  };
};

// Create Issue Service
const createIssueIntoDB = async (payload: TIssue) => {
  const { title, description, type, status, reporter_id } = payload;

  //  TODO: Issue Type Validation
  if (!type || issueType[type] === undefined) {
    throw new Error(
      "Invalid Issue Type Provided. Please try with valid issue type!",
    );
  }

  //  TODO: Issue Status Validation
  if (status && issueStatus[status] === undefined) {
    throw new Error(
      "Invalid Issue Status Provided. Please try with valid issue status!",
    );
  }

  const result = await sql`
  INSERT INTO issues (id, title, description, type, status, reporter_id, created_at, updated_at) VALUES (DEFAULT, ${title}, ${description}, ${type}, COALESCE(${status || null}, 'open'), ${reporter_id}, NOW(), NOW()) RETURNING *
 `;

  return result[0];
};

// Update Issue Service
export const updateIssueIntoDB = async (
  issueId: string,
  currentUser: any,
  updateData: { title?: string; description?: string; type?: string; status?: string }, 
) => {
  const { title, description, type, status } = updateData;

  // 1. Check if the user is authenticated
  if (!currentUser) {
    const error: any = new Error("Unauthorized Access!!");
    error.statusCode = 401;
    throw error;
  }

  // 2. Fetch the current state of the issue from the database
  const issues = await sql`
    SELECT id, reporter_id, status FROM issues WHERE id = ${issueId}
  `;
  const existingIssue = issues[0];

  // Throw a 404 Error if the issue does not exist in the database
  if (!existingIssue) {
    const error: any = new Error("Issue not found!!");
    error.statusCode = 404;
    throw error;
  }

  // 3. Evaluate Authorization Access Rules
  const isMaintainer = currentUser.role === "maintainer";
  const isOwner = existingIssue.reporter_id === currentUser.id;
  const isStatusOpen = existingIssue.status === "open";

  // Contributors are only authorized if they own the issue and its status is still 'open'
  const isAllowedContributor =
    currentUser.role === "contributor" && isOwner && isStatusOpen;

  // Throw a 403 Forbidden Error if the user matches neither permissible criteria
  if (!isMaintainer && !isAllowedContributor) {
    const error: any = new Error(
      "Forbidden! Contributors can only update their own issues, not other people's issues, and only if their issue status is still 'open'.",
    );
    error.statusCode = 403;
    throw error;
  }

  // If a contributor tries to pass a 'status' field in the body, block it
  if (status && !isMaintainer) {
    const error: any = new Error("Forbidden! Only Maintainers are allowed to update the Issue Status.");
    error.statusCode = 403;
    throw error;
  }

  // If maintainer tries to update the status to an empty string, block it
  if(status?.length === 0) {
    const error: any = new Error("Invalid Issue Status. Status cannot be an empty string. Please provide a valid status.");
    error.statusCode = 400;
    throw error;
  }

  // 4. Validate the issue type if it is provided in the request body
  if (type && issueType[type as keyof typeof issueType] === undefined) {
    const error: any = new Error(`Invalid Issue Type: '${type}'. Please provide a valid type.`);
    error.statusCode = 400;
    throw error;
  }

  // Validate the issue status if it is provided by a maintainer
  if (status && issueStatus[status as keyof typeof issueStatus] === undefined) {
    const error: any = new Error(`Invalid Issue Status: '${status}'. Please provide a valid status.`);
    error.statusCode = 400;
    throw error;
  }

  // 5. Execute the dynamic database update query using COALESCE to safely preserve missing fields
  const updatedIssues = await sql`
    UPDATE issues
    SET 
      title = COALESCE(${title}, title),
      description = COALESCE(${description}, description),
      type = COALESCE(${type}, type),
      status = COALESCE(${status}, status),
      updated_at = NOW()
    WHERE id = ${issueId}
    RETURNING id, title, description, type, status, reporter_id, created_at, updated_at
  `;

  return updatedIssues[0];
};


// Delete Issue Service
const deleteIssueFromDB = async (issueId: string, currentUser: any) => {
  // 1. Check if the user is authenticated
  if (!currentUser) {
    const error: any = new Error("Unauthorized Access!!");
    error.statusCode = 401;
    throw error;
  }

  // 2. Is the user a Maintainer?
  const isMaintainer = currentUser.role === "maintainer";
  
  if (!isMaintainer) {
    const error: any = new Error("Forbidden: Only Maintainers can delete Issues.");
    error.statusCode = 403; 
    throw error;
  }

  // 3. Validate the issue ID input
  if (!issueId) {
    const error: any = new Error("Issue ID is required for deletion.");
    error.statusCode = 400;
    throw error;
  }

  // 4. Delete the issue from the database
  const result = await sql`
    DELETE FROM issues
    WHERE id = ${issueId}`;
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getIssueByIdFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};
