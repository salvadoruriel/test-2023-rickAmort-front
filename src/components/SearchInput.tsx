import React from 'react';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export type t_SearchInput = {
	/**initial value, state is managed internally */
	value?: string;
	/**returned value */
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	sx?: SxProps;
};

/**styled & debounce searchInput */
export default function SearchInput(props: t_SearchInput) {
	const { value, onChange, label, placeholder = '', sx } = props;
	const [inputValue, setInputValue] = React.useState<string>('');
	const timeoutRef = React.useRef<number | null>(null);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.value;
		setInputValue(nextValue);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			onChange(nextValue);
		}, 350);
	};

	return (
		<TextField
			value={inputValue}
			onChange={handleInputChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<PersonSearchIcon />
					</InputAdornment>
				),
			}}
			label={label}
			placeholder={placeholder}
			sx={{ ...sx }}
		/>
	);
}
