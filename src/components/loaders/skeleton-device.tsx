import ContentLoader from 'react-content-loader';

export const SkeletonDevice = () => (
	<ContentLoader
		speed={2}
		width={756}
		height={400}
		viewBox="0 0 756 400"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="158" y="349" rx="0" ry="0" width="1" height="0" />
		<rect x="37" y="325" rx="0" ry="0" width="0" height="3" />
		<rect x="22" y="296" rx="0" ry="0" width="3" height="9" />
		<rect x="1" y="1" rx="15" ry="15" width="310" height="384" />
		<rect x="376" y="55" rx="0" ry="0" width="340" height="43" />
		<rect x="376" y="168" rx="0" ry="0" width="340" height="32" />
		<rect x="376" y="286" rx="15" ry="15" width="230" height="55" />
	</ContentLoader>
);
