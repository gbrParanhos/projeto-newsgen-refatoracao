import { QueryParams } from "../controllers/news-controller";
import prisma from "../database";
import { conflictError, invalidDateError, minCharactersError, notFoundError } from "../errors/errors";
import * as newsRepository from "../repositories/news-repository";
import { CreateNewsData } from "../repositories/news-repository";

export async function getNews(params: QueryParams) {

  return newsRepository.listNews(params);
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

async function validate(newsData: CreateNewsData, isNewTitle = true) {
  // validate if news with specific text already exists
  if (isNewTitle) {
    const duplicateNews = await prisma.news.findFirst({
      where: { title: newsData.title }
    });

    if (duplicateNews) {
      throw conflictError(newsData.title);
    }
  }

  // checks news text length
  const minCharacters = 500
  if (newsData.text.length < minCharacters) {
    throw minCharactersError();
  }

  // checks date
  const currentDate = new Date();
  const publicationDate = new Date(newsData.publicationDate);
  if (publicationDate < currentDate) {
    throw invalidDateError();
  }
}