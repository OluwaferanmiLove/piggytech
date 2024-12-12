import { ArrowDown2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { BaseText, Pressable } from 'src/components/ui';
import { colors } from 'src/theme/colors';
import { wp } from 'src/utils/responsive-dimension';
import SelectDateModal from 'src/components/create-review/select-date-modal';
import { CreateReviewSharedProps } from 'src/screens/reviews/create-review';
import dayjs from 'dayjs';

interface RatingStepProps extends CreateReviewSharedProps {}

const RatingStep = ({ isActive, form }: RatingStepProps) => {
  const [showDate, setShowDate] = useState(false);

  return (
    <View style={{ display: isActive ? 'flex' : 'none' }}>
      <View className="mt-40">
        <BaseText fontSize={16} weight="semiBold">
          How would you rate your experience
        </BaseText>
        <View className="mt-15">
          <StarRating
            rating={form.values.rating}
            color={colors.primary}
            starSize={wp(40)}
            onChange={s => form.setFieldValue('rating', s)}
            starStyle={{ marginHorizontal: 0, marginRight: wp(2) }}
          />
          {form.errors.rating && (
            <View className="mt-5">
              <BaseText fontSize={10} weight={'medium'} className="text-red">
                {form.errors.rating}
              </BaseText>
            </View>
          )}
        </View>
      </View>
      <View className="mt-40">
        <BaseText fontSize={16} weight="semiBold">
          Select Date
        </BaseText>
        <Pressable
          onPress={() => setShowDate(true)}
          className="flex-row items-center mt-15 border border-gray2 rounded-full py-14 px-20 self-start">
          <BaseText fontSize={14} weight="medium" className="mr-10">
            {form.values.date ? dayjs(form.values.date).format('MMMM YYYY') : 'Select Date'}
          </BaseText>
          <ArrowDown2 size={wp(18)} color={colors.white} />
        </Pressable>
      </View>
      <SelectDateModal
        isVisible={showDate}
        closeModal={() => setShowDate(false)}
        onSelectDate={d => {
          form.setFieldValue('date', d);
          setShowDate(false);
        }}
      />
    </View>
  );
};

export default RatingStep;
