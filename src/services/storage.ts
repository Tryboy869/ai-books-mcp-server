/**
 * Library Storage Manager - Persistent with SQLite using better-sqlite3
 */
import { KnowledgeLibrary } from './gravitational.js';
import Database from 'better-sqlite3';

class LibraryStorage {
  private db: Database.Database;
  private dbPath: string;
  
  constructor(dbPath: string = './ai-books.db') {
    this.dbPath = dbPath;
    this.db = new Database(dbPath);
    this.initDb();
  }
  
  private initDb() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS libraries (
        name TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        created_at TEXT,
        updated_at TEXT
      );
    `);
  }
  
  save(library: KnowledgeLibrary): void {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO libraries (name, data, created_at, updated_at)
      VALUES (?, ?, ?, DATETIME('now'))
    `);
    stmt.run(
      library.name,
      JSON.stringify(library),
      library.created_at
    );
  }
  
  get(name: string): KnowledgeLibrary | undefined {
    const stmt = this.db.prepare('SELECT data FROM libraries WHERE name = ?');
    const row = stmt.get(name) as any;
    if (!row) return undefined;
    return JSON.parse(row.data);
  }
  
  exists(name: string): boolean {
    const stmt = this.db.prepare('SELECT 1 FROM libraries WHERE name = ?');
    return !!stmt.get(name);
  }
  
  delete(name: string): boolean {
    const stmt = this.db.prepare('DELETE FROM libraries WHERE name = ?');
    const result = stmt.run(name);
    return result.changes > 0;
  }
  
  list(): KnowledgeLibrary[] {
    const stmt = this.db.prepare('SELECT data FROM libraries');
    const rows = stmt.all() as any[];
    return rows.map(row => JSON.parse(row.data));
  }
  
  count(): number {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM libraries');
    const row = stmt.get() as any;
    return row.count;
  }
  
  clear(): void {
    this.db.exec('DELETE FROM libraries');
  }
}

// Singleton
export const libraryStorage = new LibraryStorage();
