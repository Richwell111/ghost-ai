import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { getProjectsForUser } from "@/lib/projects";
import { EditorHomeClient } from "@/components/editor/editor-home-client";

export default async function EditorPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const allProjects = await getProjectsForUser(userId, email || "");

  const ownedProjects = allProjects.filter(p => p.role === 'owner');
  const sharedProjects = allProjects.filter(p => p.role === 'collaborator');

  return (
    <EditorHomeClient 
      ownedProjects={ownedProjects}
      sharedProjects={sharedProjects}
    />
  );
}
