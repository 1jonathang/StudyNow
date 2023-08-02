"use client";

import { useTheme } from "next-themes";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

// hard coded data for now
const data = [
  {
    text: "React",
    value: 3,
  },
  {
    text: 'Python',
    value: 100,
  },
  {
    text: 'Carleton',
    value: 5
  },
  {
    text: 'Glenlake',
    value: 300
  },
  {
    text: 'UFA',
    value: 55
  }
];

// function to change the font size depending on how frequently a word has been used
// deconstructs the word into its value, and then returns a font size
const fontSizeMapper = (word: {value: number}) => {
    return Math.log2(word.value) * 5 + 16
}

const CustomWordCloud = (props: Props) => {
  // to pass in theme styling into word cloud
  const theme = useTheme();
  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font='Times'
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}
      />
    </>
  );
};

export default CustomWordCloud;
