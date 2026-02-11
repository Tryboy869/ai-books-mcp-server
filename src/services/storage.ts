/**
 * Library Storage Manager
 * In-memory storage for knowledge libraries
 */

import { KnowledgeLibrary } from './gravitational.js';

class LibraryStorage {
  private libraries: Map<string, KnowledgeLibrary>;
  
  constructor() {
    this.libraries = new Map();
  }
  
  /**
   * Save a library
   */
  save(library: KnowledgeLibrary): void {
    this.libraries.set(library.name, library);
  }
  
  /**
   * Get a library by name
   */
  get(name: string): KnowledgeLibrary | undefined {
    return this.libraries.get(name);
  }
  
  /**
   * Check if library exists
   */
  exists(name: string): boolean {
    return this.libraries.has(name);
  }
  
  /**
   * Delete a library
   */
  delete(name: string): boolean {
    return this.libraries.delete(name);
  }
  
  /**
   * List all libraries
   */
  list(): KnowledgeLibrary[] {
    return Array.from(this.libraries.values());
  }
  
  /**
   * Get total count
   */
  count(): number {
    return this.libraries.size;
  }
  
  /**
   * Clear all libraries
   */
  clear(): void {
    this.libraries.clear();
  }
}

// Singleton instance
export const libraryStorage = new LibraryStorage();
