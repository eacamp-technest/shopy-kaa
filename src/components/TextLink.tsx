import React, {Fragment, useCallback, useMemo} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

import {colors} from 'theme/colors';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';

interface HighlightedText {
  text: string;
  callback: () => void;
}

interface TextLinkProps {
  content: string;
  highlighted?: HighlightedText[];
  center?: boolean;
  fontColor?: string;
  style?: StyleProp<TextStyle>;
}

export const TextLink: React.FC<TextLinkProps> = ({
  content,
  highlighted,
  fontColor = colors.primary.base,
  center,
  style,
}: TextLinkProps) => {
  const createHighlightedText = useCallback(
    (text: string, callback?: () => void, index?: number) => {
      const key = callback ? `${text}-${index}-highlighted` : 'remaining';
      const color = callback ? fontColor : colors.ink.lighter;

      return (
        <Text
          key={key}
          onPress={callback}
          disabled={!callback}
          style={[TypographyStyles.SmallNormalRegular, style, {color}]}>
          {text}
        </Text>
      );
    },
    [fontColor, style],
  );

  const renderElements = useMemo(() => {
    let lastIndex = 0;
    const elements = highlighted?.map(({text, callback}, index) => {
      const startIndex = content.indexOf(text);
      const endIndex = startIndex + text.length;
      const normalText = content.slice(lastIndex, startIndex);
      lastIndex = endIndex;

      return (
        <Fragment key={`${text}-${index}`}>
          {createHighlightedText(normalText)}
          {createHighlightedText(text, callback, index)}
        </Fragment>
      );
    });

    elements?.push(createHighlightedText(content.slice(lastIndex)));
    return elements;
  }, [content, createHighlightedText, highlighted]);

  return (
    <Text style={[center && CommonStyles.textAlignCenter, style]}>
      {renderElements}
    </Text>
  );
};
