import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Platform, PixelRatio } from 'react-native';

// Definir imágenes de forma estática con densidades para todas las plataformas
const images = {
    android: {
        neutral: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@1x/neutral/android_neutral_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@2x/neutral/android_neutral_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@3x/neutral/android_neutral_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@4x/neutral/android_neutral_sq_SU.png'),
            },
        },
        light: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@1x/light/android_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@1x/light/android_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@1x/light/android_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@1x/light/android_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@1x/light/android_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@1x/light/android_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@1x/light/android_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@1x/light/android_light_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@2x/light/android_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@2x/light/android_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@2x/light/android_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@2x/light/android_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@2x/light/android_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@2x/light/android_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@2x/light/android_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@2x/light/android_light_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@3x/light/android_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@3x/light/android_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@3x/light/android_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@3x/light/android_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@3x/light/android_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@3x/light/android_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@3x/light/android_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@3x/light/android_light_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@4x/light/android_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@4x/light/android_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@4x/light/android_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@4x/light/android_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@4x/light/android_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@4x/light/android_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@4x/light/android_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@4x/light/android_light_sq_SU.png'),
            },
        },
        dark: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@1x/dark/android_dark_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@2x/dark/android_dark_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@3x/dark/android_dark_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/android/png@4x/dark/android_dark_sq_SU.png'),
            },
        },
    },
    ios: {
        neutral: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@1x/neutral/ios_neutral_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@2x/neutral/ios_neutral_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@3x/neutral/ios_neutral_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@4x/neutral/ios_neutral_sq_SU.png'),
            },
        },
        light: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@1x/light/ios_light_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@2x/light/ios_light_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@3x/light/ios_light_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@4x/light/ios_light_sq_SU.png'),
            },
        },
        dark: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@1x/dark/ios_dark_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@2x/dark/ios_dark_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@3x/dark/ios_dark_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/ios/png@4x/dark/ios_dark_sq_SU.png'),
            },
        },
    },
    web: {
        neutral: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@1x/neutral/web_neutral_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@2x/neutral/web_neutral_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@3x/neutral/web_neutral_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@4x/neutral/web_neutral_sq_SU.png'),
            },
        },
        light: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@1x/light/web_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@1x/light/web_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@1x/light/web_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@1x/light/web_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@1x/light/web_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@1x/light/web_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@1x/light/web_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@1x/light/web_light_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@2x/light/web_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@2x/light/web_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@2x/light/web_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@2x/light/web_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@2x/light/web_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@2x/light/web_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@2x/light/web_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@2x/light/web_light_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@3x/light/web_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@3x/light/web_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@3x/light/web_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@3x/light/web_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@3x/light/web_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@3x/light/web_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@3x/light/web_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@3x/light/web_light_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@4x/light/web_light_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@4x/light/web_light_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@4x/light/web_light_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@4x/light/web_light_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@4x/light/web_light_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@4x/light/web_light_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@4x/light/web_light_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@4x/light/web_light_sq_SU.png'),
            },
        },
        dark: {
            'png@1x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@1x/dark/web_dark_sq_SU.png'),
            },
            'png@2x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@2x/dark/web_dark_sq_SU.png'),
            },
            'png@3x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@3x/dark/web_dark_sq_SU.png'),
            },
            'png@4x': {
                rd_ctn: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_rd_ctn.png'),
                rd_na: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_rd_na.png'),
                rd_SI: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_rd_SI.png'),
                rd_SU: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_rd_SU.png'),
                sq_ctn: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_sq_ctn.png'),
                sq_na: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_sq_na.png'),
                sq_SI: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_sq_SI.png'),
                sq_SU: require('../../assets/images/signin-assets/web/png@4x/dark/web_dark_sq_SU.png'),
            },
        },
    },
};

// Función para seleccionar la densidad correcta
const getDensity = () => {
    const scale = PixelRatio.get();
    if (scale >= 4) return 'png@4x';
    if (scale >= 3) return 'png@3x';
    if (scale >= 2) return 'png@2x';
    return 'png@1x';
};

const ContinueWithGoogleButton = ({ theme = 'light', styleType = 'rd_ctn', onPress=() => console.log('Google Sign-In Pressed') }) => {
    const platform = Platform.OS; // 'android', 'ios', or 'web'
    const density = getDensity();

    // Obtener la imagen correcta, ahora también para web con densidades
    const imageSource =
        images[platform]?.[theme]?.[density]?.[styleType] || images.web.neutral['@1x'];

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
//         width: 200,
//         height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 180,
        height: 45,
    },
});

export default ContinueWithGoogleButton;
