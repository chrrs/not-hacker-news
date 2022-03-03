import { css } from 'stitches.config';

// TODO: Do this in a better way.
const Spacer: React.VFC<{
	size?: number | string;
	width?: number | string;
	height?: number | string;
}> = ({ size, width, height }) => {
	// @ts-ignore
	return <div className={css({ minWidth: width ?? size, minHeight: height ?? size })()} />;
};

export default Spacer;
