import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { JSX, ReactElement, ReactEventHandler, SetStateAction } from 'react';

export interface IUser {
	id: string;
	login: string;
	roleId: number;
}

export interface IDevice {
	id: string;
	category: string;
	name: string;
	imageUrl: string;
	price: number;
}
export interface ICartDevice extends IDevice, IComponentProps {
	quantity: number;
}

export interface IOrderItem {
	_id: string;
	name: string;
	price: number;
	quantity: number;
}

export interface IOrder {
	_id: string;
	login: string;
	createdAt: string;
	items: IOrderItem[];
}

export interface ICart {
	devices: ICartDevice[];
	amount: number;
}

export interface IApp {
	wasLogout: boolean;
	modalCartIsOpen: boolean;
	modalNavigationIsOpen: boolean;
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
}

export interface IGreenButton extends IButton {
	children: ReactElement | string;
	right?: boolean;
	left?: boolean;
	place?: number;
	inсart?: boolean;
	type?: 'button' | 'reset' | 'submit' | undefined;
}

export interface ICardButton extends IButton {
	color?: string;
	isLoading?: boolean;
	margin?: string;
}

export interface IComponentProps {
	className?: string;
}

export interface ICardItem extends IComponentProps, IDevice {
	key?: number;
	loading?: boolean;
}

export interface ICounter extends IComponentProps {
	id: string;
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
	icon: IconProp;
	width: number;
}
export interface IPagination extends IComponentProps {
	page: number;
	lastPage: number;
	setPage: React.Dispatch<SetStateAction<number>>;
}
export interface IPrivateContent {
	children: JSX.Element;
	access: number[];
	serverError?: null | string;
}
export interface ITableRow extends IComponentProps {
	children: JSX.Element[];
	withborder?: string;
}
export interface IDeviceRow extends IComponentProps, IDevice {
	key?: string;
	onDelete: React.ReactEventHandler;
	shouldUpdateDeviceList: boolean;
	setShouldUpdateDeviceList: React.Dispatch<SetStateAction<boolean>>;
}
export interface IOrderComponent extends IComponentProps, IOrder {}
