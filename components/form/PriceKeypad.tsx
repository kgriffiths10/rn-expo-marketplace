import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Delete } from 'lucide-react-native';

interface PriceKeypadProps {
    onPriceChange?: (price: string) => void;
}

const PriceKeypad = ({ onPriceChange }: PriceKeypadProps) => {
    const [whole, setWhole] = useState('0');
    const [decimal, setDecimal] = useState('00'); // Max two decimal places
    const [price, setPrice] = useState(whole + '.' + decimal);

    useEffect(() => {
        setPrice(whole + '.' + decimal);
        onPriceChange?.(whole + '.' + decimal);
    }, [whole, decimal]);

    const [isDecimal, setIsDecimal] = useState(false); 


    const handleDigitPress = (digit: string) => {
        if (isDecimal === false) {   // If not in decimal mode, appends digits to the whole number (max 6 digits).
            if (whole === '0') {
                setWhole(digit);
            } else if (whole.length < 6) {
                setWhole(whole + digit);
            }
        } else { // If in decimal mode, modifies the first or second decimal place.
            if (decimal[0] === '0') {
                setDecimal(digit + decimal[1]);
            } else if (decimal[1] === '0') {
                setDecimal(decimal[0] + digit);
            }
        }
    }   
    // Toggles into decimal input mode
    const handleDecimalPress = () => {
        setIsDecimal(true);
    }

    // Handles delete key press
    const handleDeletePress = () => {
        if (isDecimal === true && decimal !== '00') { // If in decimal mode, resets both decimal digits one by one.
            if (decimal[1] !== '0') {
                setDecimal(decimal[0] + '0');
            } else if (decimal[0] !== '0') {
                setDecimal('0' + decimal[1]);
            }
        } else { // If in whole number mode, removes digits from the right and making single remaining digit 0
            setIsDecimal(false);
            whole.length > 1 ? setWhole(whole.slice(0, -1)) : setWhole('0');
        }
    }

    const numberPadButtonClassName = 'w-20 h-14 border border-neutral-200 items-center justify-center rounded-full';
    const numberPadTextClassName = 'text-2xl font-medium';

    return (
        <View>
            
                
                {/* Price Display */}
                <View className='flex flex-row justify-center'>
                    <Text className='text-5xl leading-[2] font-medium'>$</Text>
                    <Text className='text-5xl leading-[2] font-medium'>{price}</Text>
                </View>


                {/* Number Pad */}
                <View className=' flex gap-4'>
                    <View className='flex flex-row justify-center gap-8'>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('1')}>
                            <Text className={numberPadTextClassName}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('2')}>
                            <Text className={numberPadTextClassName}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('3')}>
                            <Text className={numberPadTextClassName}>3</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View className='flex flex-row justify-center gap-8'>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('4')}>
                            <Text className={numberPadTextClassName}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('5')}>
                            <Text className={numberPadTextClassName}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('6')}>
                            <Text className={numberPadTextClassName}>6</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-row justify-center gap-8'>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('7')}>
                            <Text className={numberPadTextClassName}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('8')}>
                            <Text className={numberPadTextClassName}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('9')}>
                            <Text className={numberPadTextClassName}>9</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-row justify-center gap-8'>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDecimalPress()}>
                            <Text className={numberPadTextClassName}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDigitPress('0')}>
                            <Text className={numberPadTextClassName}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={numberPadButtonClassName} onPress={() => handleDeletePress()}>
                            <Delete className='stroke-neutral-800' size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

        </View>
    );
}

export default PriceKeypad