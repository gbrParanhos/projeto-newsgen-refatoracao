import prisma from "../database";
import { conflictError, invalidDateError, maxCharactersError, notFoundError } from "../errors/errors";
import * as newsRepository from "../repositories/news-repository";
import { CreateNewsData } from "../repositories/news-repository";

export async function getNews() {
  return newsRepository.listNews();
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.readNewsById(id);
  if (!news) {
    throw notFoundError(id);
  }

  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await validate(newsData);
  return newsRepository.saveNews(newsData);
}

export async function alterNews(id: number, newsData: CreateNewsData) {
  const news = await getSpecificNews(id);
  await validate(newsData, news.title !== newsData.title);

  return newsRepository.updateNews(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.excludeNews(id);
}

async function validate(newsData: CreateNewsData, isNew = true) {
  // validate if news with specific text already exists
  if (isNew) {
    const newsWithTitle = await prisma.news.findFirst({
      where: { title: newsData.title }
    });

    if (newsWithTitle) {
      throw conflictError(newsData.title);
    }
  }

  // checks news text length
  if (newsData.text.length < 500) {
    throw maxCharactersError();
  }

  // checks date
  const currentDate = new Date();
  const publicationDate = new Date(newsData.publicationDate);
  if (publicationDate.getTime() < currentDate.getTime()) {
    throw invalidDateError();
  }
}