import { ArrowDown2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { AppLayout, BaseText, Pressable, Row } from 'src/components/ui';
import Button, { ButtonVariant } from 'src/components/ui/buttons/button';
import FixedBtnFooter from 'src/components/ui/buttons/fixed-btn-footer';
import BottomModal from 'src/components/ui/modals/bottom-modal';
import { CustomImage } from 'src/components/ui/others';
import useRouteParams from 'src/hooks/use-route-params';
import { colors } from 'src/theme/colors';
import { wp } from 'src/utils/responsive-dimension';
import dayJs from 'dayjs';
import SelectDateModal from 'src/components/create-review/select-date-modal';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import useSteps from 'src/hooks/use-steps';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from 'src/components/inputs';
import RatingStep from 'src/components/create-review/rating-step';
import ReviewTextFormStep from 'src/components/create-review/review-text-form-step';
import { ReviewCard } from 'src/components/home';
import { useCreateReviewMutation } from 'src/redux/profile/restaurant-api';
import { useNavigation } from '@react-navigation/native';

interface formProps extends ReviewItem {
  step?: CREATE_REVIEW_STEP;
}

export interface CreateReviewSharedProps {
  form: FormikProps<formProps>;
  isActive: boolean;
}

interface ReviewItem {
  name: string;
  text: string;
  summary: string;
  date: Date;
  rating: number;
  image: string;
}

enum CREATE_REVIEW_STEP {
  REVIEW_RATING = 'Review Rating',
  REVIEW_TEXT_FORM = 'Review Text Form',
  SUMMARY = 'Summary',
}

const CreateReview = () => {
  const [showDate, setShowDate] = useState(false);
  const params = useRouteParams<'CreateReview'>();

  const formSteps = useSteps(Object.values(CREATE_REVIEW_STEP), 0);
  const { step, isActive, stepIndex, next, previous, canNext, canPrevious, steps, changeStep } = formSteps;

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const navigation = useNavigation();

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    form.setFieldValue('step', step);
  }, [step]);

  const form = useFormik<formProps>({
    initialValues: {
      date: new Date(),
      name: '',
      text: '',
      summary: '',
      rating: 0,
      image: '',
      step: CREATE_REVIEW_STEP.REVIEW_RATING,
    },
    validationSchema: createReviewValidationSchema,
    onSubmit: async values => {
      try {
        if (values.step === CREATE_REVIEW_STEP.REVIEW_RATING || values.step === CREATE_REVIEW_STEP.REVIEW_TEXT_FORM) {
          next();
        }
        if (values.step === CREATE_REVIEW_STEP.SUMMARY) {
          delete values.step;
          const reqData = {
            restaurantId: params?.item?.id!,
            item: {
              ...values,
              date: String(values.date),
              name: 'Oluwaferanmi Babalola',
              image: 'https://randomuser.me/api/portraits/women/29.jpg',
            },
          };
          console.log({ reqData });
          const res = await createReview(reqData).unwrap();
          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      }
      // const [response, error] = await createCategoriesRequest.makeRequest(values);
    },
  });

  useEffect(() => {
    console.log({ stepIndex });
    const percentage = Math.ceil(((stepIndex + 1) / steps.length) * 100);
    progressWidth.value = withDelay(300, withSpring(percentage));
  }, [stepIndex]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const btn = [
    ...(step !== CREATE_REVIEW_STEP.REVIEW_RATING
      ? [
          {
            text: 'Go back',
            variant: ButtonVariant.OUTLINE,
            onPress: previous,
          },
        ]
      : []),
    {
      text: step === CREATE_REVIEW_STEP.SUMMARY ? 'Create review' : 'Next',
      onPress: () => form.handleSubmit(),
      // addOnIcon: <ArrowRight size={wp(18)} color={colors.black} />
    },
  ];

  console.log(form.errors);

  return (
    <AppLayout showHeader headerProps={{ showBorder: true }}>
      <ScrollView>
        <View className="mx-20 pt-20">
          <Row>
            <View className="h-45 w-45 rounded-4 overflow-hidden">
              <CustomImage
                imageProps={{
                  src: params?.item?.image,
                }}
                className="h-full w-full"
              />
            </View>
            <View className="flex-1 mx-10">
              <BaseText fontSize={16} weight="semiBold">
                {params?.item.name}
              </BaseText>
              <BaseText fontSize={12} className="mt-5 opacity-60">
                {params?.item?.address}
              </BaseText>
            </View>
          </Row>
          <RatingStep isActive={isActive(CREATE_REVIEW_STEP.REVIEW_RATING)} form={form} />
          <ReviewTextFormStep isActive={isActive(CREATE_REVIEW_STEP.REVIEW_TEXT_FORM)} form={form} />
          <View className="mt-40" style={{ display: isActive(CREATE_REVIEW_STEP.SUMMARY) ? 'flex' : 'none' }}>
            <BaseText fontSize={16} weight="semiBold">
              Summary
            </BaseText>
            <View className="mt-30">
              <ReviewCard item={{ ...form.values, date: String(form.values.date) }} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="bg-gray1 rounded-full mt-6 mx-20 my-10">
        <Animated.View style={progressStyle} className="h-5 bg-primary rounded-full" />
      </View>
      <FixedBtnFooter buttons={btn} />
      <SelectDateModal isVisible={showDate} closeModal={() => setShowDate(false)} />
    </AppLayout>
  );
};

export default CreateReview;

export const createReviewValidationSchema = Yup.object().shape({
  rating: Yup.number().min(0.5, 'Please select your rating').required('Rating is required'),
  date: Yup.string().required('Date is required'),

  text: Yup.string().when('step', ([step], schema) => {
    if (step === CREATE_REVIEW_STEP.REVIEW_TEXT_FORM) return Yup.string().required('Please enter review to continue');
    return schema;
  }),
  summary: Yup.string().when('step', ([step], schema) => {
    if (step === CREATE_REVIEW_STEP.REVIEW_TEXT_FORM)
      return Yup.string().required('Please enter title for your review');
    return schema;
  }),

  // name: Yup.string().required('Name is required'),
  // image: Yup.string().required('image is required'),
});
