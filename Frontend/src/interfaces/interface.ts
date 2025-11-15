import { type IconProp, type SizeProp } from '@fortawesome/fontawesome-svg-core';
import { type JSX, type ReactElement, type ReactEventHandler } from 'react';
import type { CartDeviceDTO, DeviceDTO, OrderDTO } from '@shared/types';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface ICartDevice extends CartDeviceDTO, IComponentProps {
	quantity: number;
}
export interface IApp {
	wasLogout: boolean;
	modalCartIsOpen: boolean;
	modalNavigationIsOpen: boolean;
	updateDeviceList: boolean;
	modal: IModal;
}

export interface IModal {
	isOpen: boolean;
	text: string;
	type: 'unknown' | 'deleteDevice';
	info: string | number | null;
}

export interface IButton {
	className?: string;
	onClick?: ReactEventHandler;
	children?: ReactElement | string;
	icon?: IconProp;
	active?: boolean | undefined;
	disabled?: boolean | undefined;
	width?: string;
	height?: string;
}

export interface IGreenButton extends IButton {
	children: ReactElement | string;
	right?: boolean;
	left?: boolean;
	place?: number;
	$inсart?: boolean;
	type?: 'button' | 'reset' | 'submit' | undefined;
}

export interface ICardButton extends IButton {
	margin?: string;
}

export interface IComponentProps {
	className?: string;
}

export interface ICardItem extends IComponentProps, DeviceDTO {
	key?: string;
	loading?: boolean;
}

export interface ICounter extends IComponentProps {
	specId: string;
	price: number;
}

export interface IBreadCrumb {
	className?: string;
	lastName?: string;
}

export interface IError {
	error: string;
}

export interface ILink extends IComponentProps {
	to: string;
	key?: number;
	onClose?: ReactEventHandler;
	children?: JSX.Element;
	icon?: IconProp;
	size?: SizeProp;
}
export interface IItemsInCart extends IComponentProps {
	quantity: number;
}
export interface IInput
	extends IComponentProps,
		React.InputHTMLAttributes<HTMLInputElement> {
	icon?: IconProp;
	width: number;
	registerProps?: UseFormRegisterReturn;
	height?: number;
	errorMessage?: string;
}

export interface DeviceForm {
	category: string;
	name: string;
	basePrice: number | null;
	variants: {
		color: string;
		colorName: string;
		imageUrl: string;
		specs: {
			storage?: string | null;
			ram?: string | null;
			simType?: string | null;
			diagonal?: string | null;
			price: number | null;
		}[];
	}[];
}
export interface IPrivateContent {
	children: JSX.Element;
	access: number[];
	serverError?: null | string;
}
export interface ITableRow extends IComponentProps {
	children: JSX.Element;
	onClick?: () => void;
	$withBorder?: string;
	$isEdit?: boolean;
}
export interface IDeviceRow extends IComponentProps, DeviceDTO {
	key?: string;
	onDelete: React.ReactEventHandler;
}
export interface IOrderComponent extends IComponentProps, OrderDTO {}
