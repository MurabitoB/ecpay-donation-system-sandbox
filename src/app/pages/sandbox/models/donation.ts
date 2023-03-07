import { ToForm } from 'src/app/utils/form-utils';

export interface Donation {
  amount: number;
  author: string;
  message: string;
  authorProfileImageUrl: string;
  createTime: string;
}
