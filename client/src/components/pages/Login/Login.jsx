import React, { useState, useRef, useEffect } from 'react';
import {
	Button,
	//Jumbotron,
	Container,
	Spinner,
	//Breadcrumb,
	Toast,
	Row,
	Col,
	Card,
	Image,
	Badge,
	Form,
	InputGroup,
	Alert
} from 'react-bootstrap';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
import { Parallax, Background } from 'react-parallax';

//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
// ────────────────────────────────────────────────────────────────────────────────

import MainBg from './img/main.jpg';

const MainContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
`;

const BackgroundAbs = styled.div`
	background-image: url(${MainBg});
	background-size: cover;
	background-repeat: no-repeat;
	filter: blur(5px);
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	overflow: hidden;
	position: fixed;
`;

const FormContainer = styled.div`
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
	color: white;
	font-weight: bold;
	border: 3px solid #f1f1f1;
	position: relative;
	z-index: 2;
	width: 40vw;
	height: 60vh;
	padding: 20px;
	text-align: center;
`;

function Login() {
	useEffect(() => {
		document.title = '👁‍🗨 Who are you?';
	}, []);
	return (
		<React.Fragment>
			<BackgroundAbs />
			<MainContainer>
				<FormContainer />
			</MainContainer>
		</React.Fragment>
	);
}

export default Login;
