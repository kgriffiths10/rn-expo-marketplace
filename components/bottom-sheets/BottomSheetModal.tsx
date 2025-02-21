import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView, BottomSheetHandleProps, BottomSheetFooter } from '@gorhom/bottom-sheet';

export type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
  footer?: React.ReactNode;
  header?: string;
  snapPoints?: string[];
  enableDynamicSizing?: boolean;

  filters?: any;
  setFilters?: any;
  applyFilters?: any;

};


const BottomSheetModalComponent = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content, header, footer, snapPoints, enableDynamicSizing }, ref) => { 

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        ),
        [] 
    );

    const renderHeader = useCallback(
        (props: BottomSheetHandleProps) => (
          <View className='items-center'>
            <View className='w-10 h-1 rounded-full bg-neutral-400 mt-4 mb-8'></View>
            <Text className='bottom-sheet-heading mb-4'>{header}</Text>
          </View>
        ),
        [header]
    );

    const renderFooter = useCallback(
      (props: any) => ( 
        <BottomSheetFooter {...props} bottomInset={0}>
            {footer}
        </BottomSheetFooter>
      ),
      []
    );


    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={true}
        enableDynamicSizing={enableDynamicSizing} // If false, snapPoints are required
        backdropComponent={renderBackdrop}
        handleComponent={renderHeader}
        footerComponent={renderFooter}
        backgroundStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 28 }}
        snapPoints={snapPoints} // Pass snapPoints to BottomSheetModal
      >		
        <BottomSheetScrollView
			enableFooterMarginAdjustment={true}
		>
			<View className='px-8 pb-8 flex-1'>
				{content || <Text>No Content Available</Text>}
			</View>
        </BottomSheetScrollView>
        
      </BottomSheetModal>
    );
  }
);



export default BottomSheetModalComponent;
