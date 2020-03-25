import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
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

//
// ─── UTILS ──────────────────────────────────────────────────────────────────────
//
import * as Func from '../../utils/Functions';
// ────────────────────────────────────────────────────────────────────────────────

import MainBg from './img/main.jpg';
import ComsPic from './img/comms.jpg';
const MainContainer = styled.div`
	/* position: fixed; */
	position: relative;
	font-family: 'Courier New', Courier, monospace;
	@media (min-width: 768px) {
		height: 100vh; /* For the form controlled */
		weight: 100vw;
		overflow: hidden;
	}
`;

const BackgroundAbs = styled.div`
	background-image: url(${MainBg});
	background-size: cover;
	background-repeat: no-repeat;
	filter: blur(4px);
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	overflow: hidden;
	position: fixed;
`;

// const FormContainer = styled.div`
// 	background-color: rgb(0, 0, 0); /* Fallback color */
// 	background-color: rgba(0, 0, 0, 0.3); /* Black w/opacity/see-through */
// 	color: white;
// 	font-weight: bold;
// 	border: 3px solid #f1f1f1;
// 	position: relative;
// 	z-index: 2;
// 	width: 40vw;
// 	height: 60vh;
// 	padding: 20px;
// 	text-align: center;
// `;

const LabelText = styled.div`
	background: white;
	padding: 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0.9;
	transform: translate(-50%, -50%);
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: rgba(255, 255, 255, 0.589);
	user-select: none;
	width: 30rem;
	text-align: center;
	border-radius: 5rem;
`;

const ParallaxContainer = styled.div`
	@media (max-width: 576px) {
		margin-top: 3rem;
	}
	@media (min-width: 576px) {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
	@media (min-width: 768px) {
		height: 100vh;
		margin-top: 15%;
	}
`;

const FormContainer = styled.div`
	@media (max-width: 576px) {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
	@media (min-width: 576px) {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
	@media (min-width: 768px) {
		height: 100vh;
		margin-top: 30%;
	}
`;

function Login() {
	useEffect(() => {
		document.title = '👁‍🗨 Who are you?';
	}, []);

	//
	// ─── HOOK ───────────────────────────────────────────────────────────────────────
	//
	const [ credentials, setCredential ] = useState({
		email: '',
		password: ''
	}); // Will be storing the credential
	const [ errors, setError ] = useState({});
	// ────────────────────────────────────────────────────────────────────────────────

	const handleSubmit = async (next) => {};

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;

		setCredential((prevState) => {
			return { ...prevState, [key]: value };
		});
	};

	return (
		<React.Fragment>
			<BackgroundAbs />
			<MainContainer>
				<Container fluid>
					<Row>
						<Col sm={12} md={6}>
							<ParallaxContainer>
								<Parallax
									className="parallax-img"
									bgImage={ComsPic}
									strength={500}
									blur={{ min: -15, max: 25 }}
									style={{ borderRadius: '1rem' }}
								>
									<div style={{ height: 500 }}>
										<LabelText>Think Everywhere , Work Every Places</LabelText>
									</div>
								</Parallax>
							</ParallaxContainer>
						</Col>
						<Col sm={12} md={6}>
							<FormContainer className="fuck">
								<Card style={{ padding: '1rem' }}>
									<Form onSubmit={(e) => e.preventDefault()}>
										<Form.Group controlId="formBasicEmail">
											<Form.Label>Email address</Form.Label>
											<Form.Control
												type="email"
												autoComplete="off"
												placeholder="Enter email"
												value={credentials.email}
												onChange={formInputHandler}
												name="email"
												isInvalid={
													!Func.validateEmail(credentials.email) &&
													credentials.email.length > 0
												}
												required
											/>
											<Form.Control.Feedback type="invalid">
												{!errors.email ? credentials.email.length > 0 ? (
													'Invalid Email'
												) : null : (
													errors.email
												)}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												value={credentials.password}
												onChange={formInputHandler}
												name="password"
											/>
										</Form.Group>
										<Form.Group controlId="formBasicCheckbox">
											<Form.Check type="checkbox" label="Remember me?" />
										</Form.Group>
										<AwesomeButtonProgress
											style={{ width: '100%' }}
											type="secondary"
											size="medium"
											action={(element, next) =>
												setTimeout(() => {
													//awesome_button_middleware = next;
													handleSubmit(next);
												}, 500)}
											loadingLabel="Logging In , Please be patient . . ."
											resultLabel="👍🏽"
										>
											Sign In
										</AwesomeButtonProgress>
									</Form>
								</Card>
							</FormContainer>
						</Col>
					</Row>
				</Container>
			</MainContainer>
		</React.Fragment>
	);
}

export default Login;
