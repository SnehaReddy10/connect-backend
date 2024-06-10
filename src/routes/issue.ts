import { Router } from 'express';
import { createIssueUseCase } from '../use-cases/issue/create-issue.use-case';
import { getAllIssuesUseCase } from '../use-cases/issue/get-all-issues.use-case';

export const issueRouter = Router();

issueRouter.get('/', getAllIssuesUseCase);
issueRouter.post('/', createIssueUseCase);
