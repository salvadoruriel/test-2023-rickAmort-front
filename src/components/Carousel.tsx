import React from 'react';
import { t_Character } from '../types/api_types';
import { Stack, SxProps } from '@mui/material';
import CharAvatar from './CharAvatar';

export type t_Carousel = {
	chars?: t_Character[];
	sx?: SxProps;
};
/**fullWidth carousel to display the chars of each character */
export default function Carousel(props: t_Carousel) {
	const { chars = [], sx } = props;
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const gap = 20;

	//handling automatic scrolling,
	//	beware DOM manipulation here 👻~BOO
	//	to keep the initial positions of elements this was the best idea
	//	although it could be possible to handle all this in CSS
	//	but keeping the initial order became trickier than expected :P
	React.useEffect(() => {
		console.log('Carousel started!');
		let childWidth = 0;
		if (carouselRef.current && carouselRef.current.firstChild) {
			childWidth = (carouselRef.current.firstChild as HTMLElement).offsetWidth + gap;
			//carouselRef.current.scrollLeft = childWidth * chars.length;
		}
		if(childWidth - gap <= 0) return;

		let isHovering = false;
		const onMouseEnter = () => {
			console.log('onMouseEnter')
			isHovering = true;
		};
		const onMouseLeave = () => {
			console.log('onMouseLeave')
			isHovering = false;
		};

		//scroll interval
		const interval = setInterval(() => {
			const parent = carouselRef.current;
			if (parent && !isHovering) {
				parent.scrollLeft += 4; //scroll speed

				// if we reached the furthest scroll to the right
				if (parent.scrollLeft === parent.scrollWidth - parent.offsetWidth) {
					parent.appendChild(parent.firstChild as Node);
					parent.scrollLeft -= childWidth;
					console.log(
						'moving Left!',
						childWidth,
						' parent vals: ',
						parent.scrollWidth,
						parent.offsetWidth,
						parent.scrollLeft
					);
				}

				//going backwards (& reached 0)
				if (!parent.scrollLeft) {
					parent.insertBefore(parent.lastChild as Node, parent.firstChild);
					parent.scrollLeft += childWidth;
					console.warn(`moving backwards, which shouldn't be possible with current implementation!`)
				}
			}
		}, 16);

		if (carouselRef.current) {
			carouselRef.current.addEventListener('mouseenter', onMouseEnter);
			carouselRef.current.addEventListener('mouseleave', onMouseLeave);
		}
		//cleaning up!
		return () => {
			clearInterval(interval);
			if (carouselRef.current) {
				carouselRef.current.removeEventListener('mouseenter', onMouseEnter);
				carouselRef.current.removeEventListener('mouseleave', onMouseLeave);
			}
		};
	}, [chars]);

	return (
		<Stack
			ref={carouselRef}
			direction="row"
			sx={{
				gap: `${gap}px`,
				overflowX: 'auto',
				width: '100%',
				height: '250px',
				background: 'rgb(28, 29, 38)',
				alignItems: 'center',
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				//firefox scrollbar
				'& *': {
					scrollbarColor: 'transparent',
				},
				//animation
				/* 
				'& > *': {
					animation: 'scroll 10s linear infinite',
					'@keyframes scroll': {
						from: { transform: 'translateX(0%)' },
						to: { transform: `translateX(-${100 * chars.length}%)` },
					},
				}, */
				...sx,
			}}
		>
			{chars.map((val, idx) => (
				<CharAvatar
					key={idx}
					char={val}
					sx={{
						height: '180px',
						width: 'auto',
					}}
				/>
			))}
		</Stack>
	);
}
