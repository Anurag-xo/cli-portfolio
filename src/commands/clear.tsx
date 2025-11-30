export const clear = (
  setCommandHistory: React.Dispatch<React.SetStateAction<{ input: string; output: React.ReactNode }[]>>
): void => {
  setCommandHistory([]);
};
