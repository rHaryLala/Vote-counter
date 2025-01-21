"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getCandidates() {
  return await prisma.candidate.findMany({
    orderBy: { votes: "desc" },
  })
}

export async function addCandidate(name: string) {
  await prisma.candidate.create({
    data: { name },
  })
  revalidatePath("/")
}

export async function voteForCandidate(id: number) {
  await prisma.candidate.update({
    where: { id },
    data: { votes: { increment: 1 } },
  })
  revalidatePath("/")
}

export async function resetVotes() {
  await prisma.candidate.updateMany({
    data: { votes: 0 },
  })
  revalidatePath("/")
}

export async function endVoting() {
  const winner = await prisma.candidate.findFirst({
    orderBy: { votes: "desc" },
  })
  revalidatePath("/")
  return winner
}

