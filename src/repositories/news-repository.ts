import { QueryParams } from "../controllers/news-controller";
import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;

export function listNews({per_page, page, order, title}: QueryParams) {
  const numberPage = isNaN(Number(page)) || Number(page) <= 0 ? 1 : Number(page);
  const numberPerPage = isNaN(Number(per_page)) || Number(per_page) <= 0 ? 10 : Number(per_page);
  const orderBy = order === "asc" ? "asc" : "desc";

  return prisma.news.findMany({
    where: {
      title: title ? {
        contains: title,
        mode: "insensitive"
      } : undefined
    },
    orderBy: {
      publicationDate: orderBy
    },
    take: numberPerPage,
    skip: (numberPage - 1) * numberPerPage
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