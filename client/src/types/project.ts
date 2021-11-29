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
  title: string;
  description: string;
  banner: string;
  images: string[];
}

export default IProject;
