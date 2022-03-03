import { blue, gray, orange, red } from '@radix-ui/colors';
import { createStitches, PropertyValue } from '@stitches/react';

export const { css, styled, globalCss, getCssText } = createStitches({
	theme: {
		colors: {
			...gray,
			...blue,
			...red,
			accent: orange.orange9,
		},
		fonts: {
			ui: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
		},
	},
	utils: {
		marginX: (value: PropertyValue<'marginLeft'>) => ({
			marginLeft: value,
			marginRight: value,
		}),
		marginY: (value: PropertyValue<'marginTop'>) => ({
			marginTop: value,
			marginBottom: value,
		}),
		paddingX: (value: PropertyValue<'paddingLeft'>) => ({
			paddingLeft: value,
			paddingRight: value,
		}),
		paddingY: (value: PropertyValue<'paddingTop'>) => ({
			paddingTop: value,
			paddingBottom: value,
		}),
		transition: (value: PropertyValue<'transitionProperty'>) => ({
			transitionProperty: value,
			transitionDuration: '0.1s',
		}),
	},
});
