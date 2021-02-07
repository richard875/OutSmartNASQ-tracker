const addBlankLine = (text: string, repeatNumber: number): string => {
  for (let i = 0; i < repeatNumber; i++) {
    text += "\n<br />";
  }
  return text;
};

export default addBlankLine;
