import { Dimensions, FlatListProps, View } from 'react-native';
import { ReactNode, useState } from 'react';
import { Calendar2 } from 'iconsax-react-native';
import BottomModal, { BottomModalProps } from '../ui/modals/bottom-modal';
import { BaseText, Pressable } from '../ui';
import dayJs from 'dayjs';

export interface SelectDateModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  onSelectDate?: (d: Date) => void;
}

const { width } = Dimensions.get('screen');

const SelectDateModal = ({ closeModal, onSelectDate, ...props }: SelectDateModalProps) => {
  return (
    <BottomModal closeModal={closeModal} {...props}>
      <View className="px-0">
        {date.map((item, index) => (
          <Pressable onPress={() => onSelectDate?.(item)} key={index} className="mb-20 pb-20 px-20 border-b border-b-gray1">
            <BaseText weight="semiBold" className="text-center">
              {dayJs(item).format('MMMM YYYY')}
            </BaseText>
          </Pressable>
        ))}
      </View>
    </BottomModal>
  );
};

export default SelectDateModal;

const getLastTwelveMonths = (baseDate: Date = new Date()): Date[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(baseDate);
    date.setMonth(baseDate.getMonth() - i);
    return date;
  });
};

const date = getLastTwelveMonths(new Date());
