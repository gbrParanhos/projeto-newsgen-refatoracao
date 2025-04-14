import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;

export function listNews() {
  return prisma.news.findMany({
    orderBy: {
      publicationDate: "desc"
    }
  });
}

export function readNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}

export async function saveNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) }
  });
}

export async function updateNews(id: number, news: CreateNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) }
  })
}

export async function excludeNews(id: number) {
  return prisma.news.delete({
    where: { id }
  })
}