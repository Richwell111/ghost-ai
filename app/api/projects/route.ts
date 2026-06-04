import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getProjectsForUser } from '@/lib/projects';

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;

  if (!userEmail) {
    return new NextResponse('User email not found', { status: 400 });
  }

  const projects = await getProjectsForUser(userId, userEmail);

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description } = body;

    const project = await prisma.project.create({
      data: {
        ownerId: userId,
        name: name || 'Untitled Project',
        description: description || null,
        status: 'DRAFT',
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[PROJECTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
