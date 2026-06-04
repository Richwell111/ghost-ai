import { prisma } from './prisma';

export type ProjectRole = 'owner' | 'collaborator';

export interface ProjectWithRole {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  status: 'DRAFT' | 'ARCHIVED';
  canvasJsonPath: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: ProjectRole;
}

/**
 * Fetches all projects accessible by a user (owned + shared).
 * Queries the database directly for use in Server Components and API routes.
 */
export async function getProjectsForUser(userId: string, email: string): Promise<ProjectWithRole[]> {
  // Fetch owned projects
  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch shared projects
  const sharedProjects = await prisma.project.findMany({
    where: {
      collaborators: {
        some: { email },
      },
      NOT: { ownerId: userId },
    },
    orderBy: { createdAt: 'desc' },
  });

  return [
    ...ownedProjects.map((p: any) => ({ ...p, role: 'owner' as const })),
    ...sharedProjects.map((p: any) => ({ ...p, role: 'collaborator' as const })),
  ];
}
