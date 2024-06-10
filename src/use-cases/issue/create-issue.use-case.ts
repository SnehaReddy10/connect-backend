import { z } from 'zod';
import { ISSUE } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { Issue } from '../../models/issue.model';

const createIssueSchema = z.object({
  title: z.string({ message: ISSUE.INVALID_TITLE }),
  description: z.string({ message: ISSUE.INVALID_DESCRIPTION }),
});

export const createIssueUseCase = async (req: any, res: any) => {
  const { success, data, error } = createIssueSchema.safeParse(req.body);

  if (!success) {
    const errors = error.errors.map((x) => x.message);
    return res.status(STATUS_CODES.BadRequest).json({ errors });
  }

  const issue = new Issue(data);
  await issue.save();

  return res.json({ issue });
};
