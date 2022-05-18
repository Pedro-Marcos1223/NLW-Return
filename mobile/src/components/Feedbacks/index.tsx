import React from 'react';
import { View, Text } from 'react-native';
import { Copyright } from '../Copyright';
import { Feedback } from '../Feedback';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { styles } from './styles';
import { FeedbackType } from '../Widget';


interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Feedbacks({ onFeedbackTypeChanged } : Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.feedbacks}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Feedback
              key={key}
              title={value.title}
              image={value.image}
              onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
            />
          ))
        }
      </View>

      <Copyright />
    </View>
  );
}