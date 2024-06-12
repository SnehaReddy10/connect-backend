import { COMMON, ISSUE } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { Issue } from '../../models/issue.model';

export const getIssueByIdUseCase = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id).lean();

    if (!issue) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: ISSUE.ISSUE_NOT_FOUND });
    }

    return res.json({ issue });
  } catch (err) {
    console.log('getIssueById Failed', err);
    return res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ error: COMMON.SERVICE_UNAVAILABLE });
  }
};
