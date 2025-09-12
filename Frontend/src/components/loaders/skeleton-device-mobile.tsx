import ContentLoader from 'react-content-loader';

export const SkeletonDeviceMobile = () => (
	<ContentLoader
		speed={2}
		width={356}
		height={818}
		viewBox="0 0 356 818"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="158" y="349" rx="0" ry="0" width="1" height="0" />
		<rect x="37" y="325" rx="0" ry="0" width="0" height="3" />
		<rect x="22" y="296" rx="0" ry="0" width="3" height="9" />
		<rect x="1" y="19" rx="15" ry="15" width="356" height="384" />
		<rect x="4" y="435" rx="15" ry="15" width="347" height="349" />
	</ContentLoader>
);
