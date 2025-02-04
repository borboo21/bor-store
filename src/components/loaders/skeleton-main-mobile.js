import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonMainMobile = (props) => (
	<ContentLoader
		speed={1}
		width={107}
		height={227}
		viewBox="0 0 200 367"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="15" y="270" rx="0" ry="0" width="170" height="21" />
		<rect x="148" y="330" rx="10" ry="10" width="32" height="32" />
		<rect x="15" y="21" rx="0" ry="0" width="170" height="211" />
		<rect x="15" y="330" rx="0" ry="0" width="72" height="37" />
	</ContentLoader>
);
