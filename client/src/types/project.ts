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
  slug: string;
  name: string;
  description: string;
  /** aka. keywords */
  tags: string[];
  banner: ImageInfo;
  screenshots: ImageInfo[];
  /** techstacks used to develop the app */
  techstacks: TechStack[];
}

type Orientation = 'square' | 'portrait' | 'landscape';

interface ImageInfo {
  url: string;
  width: number;
  height: number;
  orientation: Orientation;
}

export default IProject;
