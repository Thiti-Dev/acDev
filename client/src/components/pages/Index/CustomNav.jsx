import React from 'react';
import { Button, Jumbotron, Container, Spinner, Breadcrumb, Toast } from 'react-bootstrap';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { Parallax, Background } from 'react-parallax';
import styled from 'styled-components';

const image1 =
	'https://images.unsplash.com/photo-1556767230-449a4049ba05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80';
const CenterText = styled.div`
	background: white;
	padding: 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0.7;
	transform: translate(-50%, -50%);
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: rgba(255, 255, 255, 0.589);
	user-select: none;
`;

const NavMinContainer = styled.div`
	position: absolute;
	top: 0%;
	left: 0%;
	padding: 1rem;
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: white;
`;

const NavAuthContainer = styled.div`
	position: absolute;
	top: 0%;
	right: 0%;
	padding: 1rem;
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: white;
`;

export default function CustomNav({ scrollTo }) {
	return (
		<Parallax bgImage={image1} strength={500} blur={{ min: -15, max: 25 }}>
			<div style={{ height: 500 }}>
				<CenterText>Welcome To acDev "A place where an active developer exist"</CenterText>
				<NavAuthContainer>
					<Breadcrumb>
						<Breadcrumb.Item onClick={scrollTo.bind(this, 'register')}>Sign Up</Breadcrumb.Item>
						<Breadcrumb.Item>Sign In</Breadcrumb.Item>
					</Breadcrumb>
				</NavAuthContainer>
				<NavMinContainer>
					<Breadcrumb>
						<Breadcrumb.Item href="#" active>
							Home
						</Breadcrumb.Item>
						<Breadcrumb.Item onClick={scrollTo.bind(this, 'discord')}>Discord</Breadcrumb.Item>
						<Breadcrumb.Item onClick={scrollTo.bind(this, 'dev')}>Developers</Breadcrumb.Item>
					</Breadcrumb>
				</NavMinContainer>
			</div>
		</Parallax>
	);
}
