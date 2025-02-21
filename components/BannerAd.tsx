import { Text, View } from "react-native";
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

const InteropLinearGradient = cssInterop(LinearGradient, {
    className: {
      target: "style",
      nativeStyleToProp: {},
    },
});

const BannerAd = () => {
    return (
        <InteropLinearGradient
                colors={['#f56565', '#ed8936']}
                start={[0, 0]}
                end={[1, 0]}
                className='h-24 rounded-xl items-center justify-center'
        >
            <Text className="text-base font-PoppinsRegular text-neutral-100 text-center">Banner Ad Placement</Text>
        </InteropLinearGradient>
    );
}

export default BannerAd;