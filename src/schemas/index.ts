/**
 * Zod validation schemas for AI Books MCP Server
 */

import { z } from 'zod';

// Create Library Schema
export const CreateLibraryInputSchema = z.object({
  name: z.string()
    .min(1, "Library name is required")
    .max(100, "Library name must be less than 100 characters")
    .regex(/^[a-z0-9-_]+$/, "Library name must be lowercase alphanumeric with hyphens/underscores")
    .describe("Unique name for the knowledge library (e.g., 'react-docs', 'ml-papers')"),
  
  text: z.string()
    .min(100, "Text must be at least 100 characters")
    .describe("The text content to compress into a knowledge library"),
  
  n_max: z.number()
    .int()
    .min(5, "n_max must be at least 5")
    .max(20, "n_max must be at most 20")
    .default(15)
    .optional()
    .describe("Maximum orbital level for gravitational compression (higher = more compression, default: 15)")
});

export const CreateLibraryOutputSchema = z.object({
  library_name: z.string(),
  chunks_created: z.number(),
  total_words: z.number(),
  compression_ratio: z.number(),
  created_at: z.string()
});

// Query Library Schema
export const QueryLibraryInputSchema = z.object({
  library_name: z.string()
    .min(1)
    .describe("Name of the knowledge library to query"),
  
  query: z.string()
    .min(1, "Query cannot be empty")
    .describe("The question or search query"),
  
  top_k: z.number()
    .int()
    .min(1, "top_k must be at least 1")
    .max(20, "top_k must be at most 20")
    .default(8)
    .optional()
    .describe("Number of most relevant chunks to retrieve (default: 8)")
});

export const QueryLibraryOutputSchema = z.object({
  query: z.string(),
  chunks_retrieved: z.number(),
  context: z.string(),
  total_words: z.number(),
  library_name: z.string()
});

// Extend Context Schema
export const ExtendContextInputSchema = z.object({
  file_paths: z.array(z.string())
    .min(1, "At least one file path is required")
    .describe("Array of file paths to load and compress"),
  
  query: z.string()
    .min(1, "Query cannot be empty")
    .describe("The question to answer using extended context"),
  
  top_k: z.number()
    .int()
    .min(1)
    .max(20)
    .default(8)
    .optional()
    .describe("Number of chunks to retrieve per file (default: 8)")
});

export const ExtendContextOutputSchema = z.object({
  query: z.string(),
  files_processed: z.number(),
  total_chunks_retrieved: z.number(),
  extended_context: z.string(),
  total_words: z.number(),
  compression_stats: z.object({
    original_size: z.number(),
    compressed_size: z.number(),
    compression_ratio: z.number()
  })
});

// List Libraries Schema
export const ListLibrariesOutputSchema = z.object({
  libraries: z.array(z.object({
    name: z.string(),
    chunks_count: z.number(),
    compression_ratio: z.number(),
    created_at: z.string(),
    updated_at: z.string()
  })),
  total_libraries: z.number()
});

// Get Library Stats Schema
export const GetLibraryStatsInputSchema = z.object({
  library_name: z.string()
    .min(1)
    .describe("Name of the library to get statistics for")
});

export const GetLibraryStatsOutputSchema = z.object({
  library_name: z.string(),
  total_chunks: z.number(),
  total_words: z.number(),
  total_characters: z.number(),
  compression_ratio: z.number(),
  average_chunk_size: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  n_max: z.number()
});

// Delete Library Schema
export const DeleteLibraryInputSchema = z.object({
  library_name: z.string()
    .min(1)
    .describe("Name of the library to delete")
});

export const DeleteLibraryOutputSchema = z.object({
  deleted: z.boolean(),
  library_name: z.string(),
  message: z.string()
});

// Verify Integrity Schema
export const VerifyIntegrityInputSchema = z.object({
  library_name: z.string()
    .min(1)
    .describe("Name of the library to verify")
});

export const VerifyIntegrityOutputSchema = z.object({
  library_name: z.string(),
  total_chunks: z.number(),
  verified_chunks: z.number(),
  failed_chunks: z.number(),
  integrity_percentage: z.number(),
  all_verified: z.boolean()
});

// Search Documents Schema
export const SearchDocumentsInputSchema = z.object({
  library_name: z.string()
    .min(1)
    .describe("Name of the library to search in"),
  
  query: z.string()
    .min(1)
    .describe("Search query"),
  
  max_results: z.number()
    .int()
    .min(1)
    .max(50)
    .default(10)
    .optional()
    .describe("Maximum number of results to return (default: 10)")
});

export const SearchDocumentsOutputSchema = z.object({
  query: z.string(),
  results: z.array(z.object({
    chunk_id: z.string(),
    content_preview: z.string(),
    relevance_score: z.number(),
    word_count: z.number()
  })),
  total_results: z.number(),
  library_name: z.string()
});
