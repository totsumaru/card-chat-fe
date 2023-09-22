// URLの部分をaタグに変更
export const urlToA = (text: string) => {
  const urlRegex = /(https?:\/\/\S+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (i % 2 === 0) {
      return part;
    } else {
      return (
        <a className="text-blue-600"
           href={part}
           target="_blank"
           rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    }
  });
}
