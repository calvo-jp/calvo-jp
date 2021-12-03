type Tag =
  // frontend
  | 'html'
  | 'css'
  | 'tailwind'
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'javascript'
  | 'dart'
  | 'flutter'
  // backend
  | 'express'
  | 'nestjs'
  | 'nodejs'
  | 'fastapi'
  | 'python'
  // database
  | 'mongodb'
  | 'sqlite3'
  | 'postgres';

interface IProject {
  id: string;
  tags: Tag[];
  name: string;
  description: string;
  banner: string;
  screenshots: string[];

  /** specific to keyword meta tag */
  keywords: string[];
}

export default IProject;
