export const getUserUseCase = async (req: any, res: any) => {
  return res.json({ user: req.user });
};
