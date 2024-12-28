export class SQLInjectionProtection {
  private static readonly SQL_PATTERNS = {
    comments: /\/\*[\s\S]*?\*\/|--[^\n]*\n/g,
    unions: /\bunion\b|\bselect\b/gi,
    systemTables: /information_schema|pg_catalog/gi,
    dangerousKeywords: /\b(drop|delete|truncate|alter|create)\b/gi
  };

  static sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove SQL comments and dangerous patterns
    return input
      .replace(this.SQL_PATTERNS.comments, '')
      .replace(this.SQL_PATTERNS.unions, '')
      .replace(this.SQL_PATTERNS.systemTables, '')
      .replace(this.SQL_PATTERNS.dangerousKeywords, '')
      .trim();
  }

  static validateQueryParam(param: string): boolean {
    return !Object.values(this.SQL_PATTERNS).some(pattern => 
      pattern.test(param)
    );
  }

  static escapeIdentifier(identifier: string): string {
    return `"${identifier.replace(/"/g, '""')}"`;
  }

  static escapeLiteral(literal: string): string {
    return `'${literal.replace(/'/g, "''")}'`;
  }
}