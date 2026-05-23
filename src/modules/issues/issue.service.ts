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

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
};
