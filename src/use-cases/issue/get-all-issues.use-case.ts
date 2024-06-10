import { COMMON } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { Issue } from '../../models/issue.model';

export const getAllIssuesUseCase = async (req: any, res: any) => {
  try {
    const issues = await Issue.find().lean();

    return res.json({ issues });
  } catch (err) {
    console.log('get All Issues Failed', err);
    return res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ error: COMMON.SERVICE_UNAVAILABLE });
  }
};
