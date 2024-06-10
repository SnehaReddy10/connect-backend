import { Router } from 'express';
import { createIssueUseCase } from '../use-cases/issue/create-issue.use-case';

export const issueRouter = Router();

issueRouter.post('/', createIssueUseCase);
