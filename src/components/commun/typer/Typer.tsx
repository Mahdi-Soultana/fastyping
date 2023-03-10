import { useLayoutEffect, useState } from 'react';
import { text, useTypedWord } from '../../../hooks';
import InputTyper from './Input';
import MyTimer from './MyTimer';
import Word from './Word';

function Typer() {
  return (
    <div>
      <TextTyping />
      <MyTimer />
    </div>
  );
}
const textArr: {
  word: string;
  isCorrect: boolean | null;
  isIn: boolean;
}[] = text.split(' ').map((w) => ({ word: w, isCorrect: null, isIn: false }));

function TextTyping() {
  const { currentWord, currentIndex, captureWord } = useTypedWord();
  const [text, setText] = useState(() => textArr);
  useLayoutEffect(() => {
    const index =
      currentIndex == 0
        ? currentIndex
        : currentIndex > text.length - 1
        ? currentIndex
        : currentIndex - 1;
    setText(() =>
      text.map((item, i) =>
        i === index
          ? {
              isIn: false,
              word: item.word,
              isCorrect: index === i ? text[index].word === captureWord : null,
            }
          : item,
      ),
    );

    return () => {};
  }, [currentIndex]);

  return (
    <div className="w-[500px] m-auto  p-4 my-10 mb-2 space-y-4 break-words">
      <div className="flex  flex-wrap  border border-red-500 p-4">
        {text.map(({ word, isCorrect }, index, arr) => {
          let classNameHighlighted =
            isCorrect === null || currentIndex == 0
              ? ''
              : isCorrect
              ? ' text-green-600   '
              : 'text-red-500  ';
          if (currentIndex == index && word.length && word === currentWord) {
            classNameHighlighted += 'bg-green-500 border-transparent';
          } else if (currentIndex === index) {
            classNameHighlighted +=
              currentWord.length > 0
                ? 'border-red-500 bg-red-500 '
                : 'bg-gray-200 border-transparent';
          } else {
            classNameHighlighted += 'bg-transparent border-transparent';
          }

          return (
            <Word
              key={index}
              index={index}
              classNameHighlighted={classNameHighlighted}
              word={word}
              currentIndex={currentIndex}
            />
          );
        })}
      </div>
      <InputTyper />
    </div>
  );
}

export default Typer;
