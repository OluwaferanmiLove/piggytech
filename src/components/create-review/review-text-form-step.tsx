import { ArrowDown2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BaseText, Pressable } from 'src/components/ui';
import { CreateReviewSharedProps } from 'src/screens/reviews/create-review';
import { Input } from '../inputs';

interface ReviewTextFormStepProps extends CreateReviewSharedProps {}

const ReviewTextFormStep = ({ isActive, form }: ReviewTextFormStepProps) => {
  return (
    <View style={{ display: isActive ? 'flex' : 'none' }}>
      <View className="mt-40">
        <BaseText fontSize={16} weight="semiBold">
          Write your review
        </BaseText>
        <View className="mt-15">
          <Input
            multiline
            containerClasses="min-h-[110px] max-h-[125px] rounded-8 border-black bg-gray1"
            value={form.values.text}
            error={form.errors.text}
            placeholder='Review'
            onChangeText={t => form.setFieldValue('text', t)}
          />
        </View>
      </View>
      <View className="mt-40">
        <BaseText fontSize={16} weight="semiBold">
          Title this review
        </BaseText>
        <View className="mt-15">
          <Input
            multiline
            placeholder='Title'
            value={form.values.summary}
            error={form.errors.summary}
            onChangeText={t => form.setFieldValue('summary', t)}
            containerClasses="min-h-[110px] max-h-[125px] rounded-8 border-black bg-gray1"
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewTextFormStep;
