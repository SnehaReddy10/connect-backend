import { Router } from 'express';
import { createIssueUseCase } from '../use-cases/issue/create-issue.use-case';
import { getAllIssuesUseCase } from '../use-cases/issue/get-all-issues.use-case';
import { deleteIssueUseCase } from '../use-cases/issue/delete-issue.use-case';

export const issueRouter = Router();

issueRouter.get('/', getAllIssuesUseCase);
issueRouter.post('/', createIssueUseCase);
issueRouter.delete('/:id', deleteIssueUseCase);
