import { ValueFormatterParams } from 'ag-grid-community/types/valueFormatterParams';
import { formatDistanceToNowStrict } from 'date-fns';

export const formatFullName = ({ data }: ValueFormatterParams): string => {
  if (data) return `${data.first_name} ${data.last_name}`;
	return '';
};

export const formatDSR = ({ data }: ValueFormatterParams): string => {
  if (data) return formatDistanceToNowStrict(new Date(data.registered_at), { addSuffix: true, unit: 'day' });
	return '';
};
