import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import Svg, {
    Circle,
    Defs,
    Path,
    RadialGradient,
    Stop,
} from 'react-native-svg';

const AnimatedLinearGradientComponent =
    Animated.createAnimatedComponent(LinearGradient);

type AnimatedLinearGradientProps = Omit<LinearGradientProps, 'colors'> & {
    colors: (string | Animated.AnimatedInterpolation<string>)[];
    style?: StyleProp<ViewStyle>;
};

// fetches the device screen width and height for responsive design.
const { width, height } = Dimensions.get('window');

const StarIcon = ({ size = 8, style }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
            <Path
                d="M 0 -10 M 12 5 C 12 11 15 14 20 14 C 15 14 12 17 12 23 c 0 -6 -3 -9 -9 -9 C 9 14 12 11 12 5 z"
                fill="white"
                opacity={0.9}
            />
        </Svg>
    );
};
//번짝이는 모션
const TwinklingDot = ({ cx, cy, r = 2, delay = 0 }) => {
    const opacityAnim = useRef(new Animated.Value(0.8)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const startAnimation = () => {
            const twinkleAnimation = Animated.loop(
                Animated.sequence([
                    // 밝아지고 커지기
                    Animated.parallel([
                        Animated.timing(opacityAnim, {
                            toValue: 1,
                            duration: 800 + Math.random() * 400, // 0.8~1.2초
                            useNativeDriver: true,
                        }),
                        Animated.timing(scaleAnim, {
                            toValue: 1.3,
                            duration: 800 + Math.random() * 400,
                            useNativeDriver: true,
                        }),
                    ]),
                    // 잠시 유지
                    Animated.delay(200 + Math.random() * 1000), // 0.2~0.5초
                    // 원래대로 돌아가기
                    Animated.parallel([
                        Animated.timing(opacityAnim, {
                            toValue: 0.6,
                            duration: 800 + Math.random() * 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(scaleAnim, {
                            toValue: 1,
                            duration: 800 + Math.random() * 400,
                            useNativeDriver: true,
                        }),
                    ]),
                    // 잠시 어두운 상태 유지
                    Animated.delay(1000 + Math.random() * 2000), // 1~3초
                ]),
            );

            // 딜레이 후 애니메이션 시작
            setTimeout(() => {
                twinkleAnimation.start();
            }, delay);
        };
        startAnimation();
    }, [opacityAnim, scaleAnim, delay]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: cx - r,
                top: cy - r,
                width: r * 2,
                height: r * 2,
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
            }}
        >
            <View
                style={{
                    width: r * 2,
                    height: r * 2,
                    backgroundColor: 'white',
                    borderRadius: r,
                    shadowColor: 'white',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            />
        </Animated.View>
    );
};

const CircularLines = () => {
    // 점들의 위치 정보
    const dots = [
        { cx: width * 0.2, cy: 103, delay: 0 },
        { cx: width * 0.8, cy: 153, delay: 500 },
        { cx: width * 0.15, cy: 186, delay: 1000 },
        { cx: width * 0.85, cy: 240, delay: 1500 },
        { cx: width * 0.2, cy: 280, delay: 2000 },
        { cx: width * 0.4, cy: 320, delay: 2500 },
        { cx: width * 0.6, cy: 700, delay: 1000 },
        { cx: width * 0.9, cy: 650, delay: 1000 },
    ];

    return (
        <View style={StyleSheet.absoluteFillObject}>
            {/* SVG 원들 */}
            <Svg
                width={width}
                height={height * 0.6}
                style={StyleSheet.absoluteFillObject}
                viewBox={`0 0 ${width} ${height * 0.6}`}
            >
                <Defs>
                    <RadialGradient
                        id="whiteToTransparent"
                        cx="80%"
                        cy="100%"
                        r="80%"
                    >
                        <Stop offset="0%" stopColor="white" stopOpacity="1" />
                        <Stop offset="80%" stopColor="white" stopOpacity="0" />
                    </RadialGradient>
                </Defs>

                {[...Array(6)].map((_, index) => (
                    <Circle
                        key={index}
                        cx={width / 2}
                        cy={-50}
                        r={80 + index * 40}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth="0.4"
                    />
                ))}

                {/* Gradient circle - 새로 추가된 원 */}
                <Circle
                    cx={width / 2}
                    cy={-50}
                    r={280}
                    fill="url(#whiteToTransparent)"
                    opacity={0.2}
                />
            </Svg>

            {/* 반짝이는 점들 */}
            {dots.map((dot, index) => (
                <TwinklingDot
                    key={index}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={1.5}
                    delay={dot.delay}
                />
            ))}
        </View>
    );
};

export const AnimatedLinearGradient = ({
    colors,
    style,
    ...props
}: AnimatedLinearGradientProps) => {
    return (
        <AnimatedLinearGradientComponent
            {...props}
            colors={colors}
            style={style}
        >
            {/* Background decorative elements */}
            <CircularLines />

            {/* Stars */}
            <StarIcon
                size={20}
                style={[
                    styles.star,
                    { top: height * 0.27, left: width * 0.05 },
                ]}
            />
            <StarIcon
                size={8}
                style={[
                    styles.star,
                    { top: height * 0.45, right: width * 0.05 },
                ]}
            />
            <StarIcon
                size={15}
                style={[
                    styles.star,
                    { bottom: height * 0.35, left: width * 0.2 },
                ]}
            />
            <StarIcon
                size={6}
                style={[
                    styles.star,
                    { bottom: height * 0.15, right: width * 0.5 },
                ]}
            />
        </AnimatedLinearGradientComponent>
    );
};

const styles = StyleSheet.create({
    star: {
        position: 'absolute',
    },
});
