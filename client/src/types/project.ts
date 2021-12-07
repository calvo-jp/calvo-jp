type TechStack =
  // frontend frameworks, ui kit and preprocessors
  | 'react'
  | 'nextjs'
  | 'flutter'
  | 'tailwind'
  | 'material ui'
  // frontend languages
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'dart'
  // backend frameworks
  | 'express'
  | 'nestjs'
  | 'fastapi'
  // backend languages
  | 'nodejs'
  | 'python'
  // orms and odms
  | 'prisma'
  | 'sqlmodel'
  // database
  | 'mongodb'
  | 'sqlite3'
  | 'postgres';

interface IProject {
  id: string;
  name: string;
  description: string;
  /** aka. keywords */
  tags: string[];
  banner: string;
  screenshots: string[];
  /** techstacks used to develop the app */
  techstacks: TechStack[];
}

export default IProject;
