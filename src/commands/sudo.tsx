export const sudo = (args: string[]): React.ReactNode => {
  if (args.length === 0) {
    return 'sudo: missing operand';
  }
  return `sudo: ${args.join(' ')}: command not found`;
};
