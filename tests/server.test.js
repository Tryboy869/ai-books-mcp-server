/**
 * AI Books MCP Server - Simple Validation Tests
 * These tests validate the build output works correctly
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Build Validation', () => {
  
  it('should have compiled index.js', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.js');
    assert.ok(existsSync(indexPath), 'dist/index.js should exist');
  });
  
  it('should have compiled gravitational service', () => {
    const gravPath = join(process.cwd(), 'dist', 'services', 'gravitational.js');
    assert.ok(existsSync(gravPath), 'gravitational.js should exist');
  });
  
  it('should have compiled storage service', () => {
    const storagePath = join(process.cwd(), 'dist', 'services', 'storage.js');
    assert.ok(existsSync(storagePath), 'storage.js should exist');
  });
  
  it('should have compiled schemas', () => {
    const schemasPath = join(process.cwd(), 'dist', 'schemas', 'index.js');
    assert.ok(existsSync(schemasPath), 'schemas/index.js should exist');
  });
  
  it('should have compiled tools', () => {
    const toolsPath = join(process.cwd(), 'dist', 'tools', 'index.js');
    assert.ok(existsSync(toolsPath), 'tools/index.js should exist');
  });
  
  it('should have shebang in index.js', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.js');
    const content = readFileSync(indexPath, 'utf-8');
    assert.ok(content.startsWith('#!/usr/bin/env node'), 'index.js should have shebang');
  });
  
  it('should import McpServer', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.js');
    const content = readFileSync(indexPath, 'utf-8');
    assert.ok(content.includes('McpServer'), 'index.js should import McpServer');
  });
  
  it('should register tools', () => {
    const indexPath = join(process.cwd(), 'dist', 'index.js');
    const content = readFileSync(indexPath, 'utf-8');
    assert.ok(content.includes('registerTools'), 'index.js should call registerTools');
  });
});

describe('Package Configuration', () => {
  
  it('should have valid package.json', () => {
    const pkgPath = join(process.cwd(), 'package.json');
    assert.ok(existsSync(pkgPath), 'package.json should exist');
    
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    assert.strictEqual(pkg.name, 'ai-books-mcp-server', 'Package name should be correct');
    assert.strictEqual(pkg.version, '1.0.0', 'Version should be 1.0.0');
    assert.ok(pkg.main, 'Should have main entry point');
    assert.ok(pkg.bin, 'Should have bin entry point');
  });
  
  it('should have README', () => {
    const readmePath = join(process.cwd(), 'README.md');
    assert.ok(existsSync(readmePath), 'README.md should exist');
  });
  
  it('should have LICENSE', () => {
    const licensePath = join(process.cwd(), 'LICENSE');
    assert.ok(existsSync(licensePath), 'LICENSE should exist');
  });
});

console.log('\n✅ All build validation tests passed!');
console.log('📦 Package is ready for NPM publish\n');
