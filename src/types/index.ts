import { AnyAction } from '@reduxjs/toolkit';

export interface IModel {
  id: string;
  title: string;
  description: string;
  isFinished: boolean;
  createdAt?: string;
  updatedAt?: string;
  isTextShowed?: boolean;
}

export interface IColumnLayoutProps {
  labelText?: string;
  addHandler: any;
  removeHandler: (v: string) => AnyAction;
  completedHandler: (v: any) => AnyAction;
  selectorState: IModel[];
  droppableId: string;
  updateTextShowed: (v: any) => AnyAction;
  updateHandler?: any;
  showTextField?: boolean;
}
