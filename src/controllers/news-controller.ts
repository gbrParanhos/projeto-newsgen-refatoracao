import { query, Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";

import { CreateNewsData } from "../repositories/news-repository";

const isInvalidId = (id: number) => isNaN(id) || id <= 0;

export type QueryParams = {
  per_page?: string;
  page?: string;
  order?: "asc" | "desc";
  title?: string;
};

export async function getNews(req: Request, res: Response) {
  const params = req.query as QueryParams;
  const news = await service.getNews(params);
  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isInvalidId(id)) return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isInvalidId(id)) return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");

  const newsData = req.body as CreateNewsData;
  const alteredNews = await service.alterNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isInvalidId(id)) return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}