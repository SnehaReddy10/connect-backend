import { COMMON, ISSUE } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { Issue } from '../../models/issue.model';

export const deleteIssueUseCase = async (req: any, res: any) => {
  try {
    const issueId = req.params.id;

    // Find the issue by ID and delete it
    const deletedIssue = await Issue.findByIdAndDelete(issueId);

    if (!deletedIssue) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: ISSUE.ISSUE_NOT_FOUND });
    }

    return res
      .status(STATUS_CODES.NoContent)
      .json({ message: ISSUE.ISSUE_DELETE_SUCCESSFULLY });
  } catch (err) {
    console.log('Delete Issue Failed', err);
    return res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ error: COMMON.SERVICE_UNAVAILABLE });
  }
};
