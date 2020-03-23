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
	InputGroup
} from 'react-bootstrap';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
import { Parallax, Background } from 'react-parallax';
import DatePicker from 'react-date-picker';

import axios from 'axios';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
// ────────────────────────────────────────────────────────────────────────────────

// ─── MY LIBRARY ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
import valueWatcher from '../../utils/JsValueWatcher';
// ────────────────────────────────────────────────────────────────────────────────
//
// ─── FUNC ───────────────────────────────────────────────────────────────────────
//
import * as Func from '../../utils/Functions';
// ────────────────────────────────────────────────────────────────────────────────
//
// ─── VALIDATOR ──────────────────────────────────────────────────────────────────
//
import _isRegistrationValid from './validation/register';

const FullButtonField = styled(Button)`
    width: 100%;
`;

const LabelText = styled.div`
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
	width: 30rem;
	text-align: center;
	border-radius: 5rem;
`;

const RegisterHolder = styled.div`
	position: absolute;
	top: 0%;
	left: -3%;
	width: 100%;
`;

const CustomErrorFeedback = styled.p`
	color: red;
	font-size: 0.9rem;
`;

const regisBg =
	'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

function Register({ setParentState }) {
	const myForm = useRef(); // Referencing to our form
	const [ validated, setValidated ] = useState(false); // always validate by deafult ==> for now false
	const [ errors, setError ] = useState({}); // empty error at first
	const [ credentials, setCredential ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
		firstName: '',
		lastName: '',
		dateOfBirth: new Date('1998-01-01T14:48:00.000Z'),
		gender: ''
	});
	const sleep = (m) => new Promise((r) => setTimeout(r, m));
	var awesome_button_middleware = undefined; // Function will be added later when the button is clicked

	const waitUntilGotNext = async () => {
		await sleep(300);
		return new Promise((resolve, reject) => {
			if (!awesome_button_middleware) {
				resolve(waitUntilGotNext());
			} else {
				let _cached = awesome_button_middleware;
				awesome_button_middleware = undefined; // reset
				console.log('return');
				resolve(_cached);
			}
		});
	};

	const validateCredential = () => {
		//Validating the credential before sending a real req by axios / fetch
		// No need for now , using bulit in react-bootstrap for the validation
	};

	/*const handleSubmit = async (event) => {
		event.preventDefault(); // Preventing by deafult behavior
		const form = event.currentTarget;
		let next; // An awaiter => using this for avoid synthetic re-used performance isisue
		if (form.checkValidity() === false || !credentials.dateOfBirth) {
			//event.preventDefault();
			event.stopPropagation();
			console.log('[ERROR] : Credentials are not valid yet');
			setValidated(true);

			next = await waitUntilGotNext(); // wait for the beautify button callback
			next(false, '💢 Could not proceed . . . ');
		} else {
			//Validate will be rendering on server side this time
			try {
				const res = await axios.post('/api/users/register', credentials);
				console.log(res);
			} catch (error) {
				console.log(error.response);
			}

			next = await waitUntilGotNext(); // wait for the beautify button callback
			next();
		}

		console.log(credentials);
	};*/

	const handleSubmit = async (next) => {
		if (!_isRegistrationValid(credentials)) {
			return next(false, '💢 Could not proceed . . . ');
		}
		next(); // Thumbing up
	};

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		setCredential((prevState) => {
			return { ...prevState, [key]: value };
		});
	};

	return (
		<React.Fragment>
			<Container fluid style={{ padding: 60, fontFamily: 'Courier New' }}>
				<Row>
					<Col>
						<RegisterHolder>
							<Form
								ref={myForm}
								noValidate
								validated={false}
								onSubmit={(event) => event.preventDefault()}
							>
								<Form.Row>
									<Form.Group as={Col} md="6" controlId="validationCustom01">
										<Form.Label>First name</Form.Label>
										<Form.Control
											name="firstName"
											// onChange={(e) => {
											// 	let _value = e.target.value;
											// 	setCredential((prevState) => {
											// 		return { ...prevState, firstName: _value };
											// 	});
											// }}
											value={credentials.firstName}
											onChange={formInputHandler}
											required
											type="text"
											placeholder="First name"
											autoComplete="off"
											maxLength={20}
											isValid={credentials.firstName.length >= 3}
											isInvalid={credentials.firstName.length < 3}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											{credentials.firstName.length === 0 ? null : 'It is too short'}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group as={Col} md="6" controlId="validationCustom02">
										<Form.Label>Last name</Form.Label>
										<Form.Control
											autoComplete="off"
											required
											type="text"
											placeholder="Last name"
											name="lastName"
											value={credentials.lastName}
											onChange={formInputHandler}
											maxLength={20}
											isValid={credentials.lastName.length >= 3}
											isInvalid={credentials.lastName.length < 3}
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											{credentials.lastName.length === 0 ? null : 'It is too short'}
										</Form.Control.Feedback>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} md="5" controlId="validationCustomUsername">
										<Form.Label>Username</Form.Label>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												type="text"
												placeholder="Username"
												aria-describedby="inputGroupPrepend"
												required
												autoComplete="off"
												name="username"
												value={credentials.username}
												onChange={formInputHandler}
												maxLength={12}
												isInvalid={
													credentials.username.length === 0 || credentials.username.length < 3
												}
												isValid={credentials.username.length >= 3}
											/>
											<Form.Control.Feedback type="invalid">
												{credentials.username.length === 0 ? null : 'Little bit short!'}
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
									<Form.Group as={Col} md="7" controlId="validationCustomEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control
											autoComplete="off"
											required
											type="email"
											placeholder="example@xxx.com"
											name="email"
											value={credentials.email}
											onChange={formInputHandler}
											isValid={Func.validateEmail(credentials.email)}
											isInvalid={!Func.validateEmail(credentials.email)}
										/>
										<Form.Control.Feedback>Looks valid!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											{credentials.email.length === 0 ? null : 'Invalid Email!'}
										</Form.Control.Feedback>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} md="6" controlId="validationCustomPassword">
										<Form.Label>Password</Form.Label>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend2">🔑</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												type="password"
												placeholder="Password"
												aria-describedby="inputGroupPrepend2"
												required
												autoComplete="off"
												name="password"
												value={credentials.password}
												onChange={formInputHandler}
												maxLength={50}
												isValid={
													credentials.password.length > 0 &&
													credentials.password === credentials.confirmPassword
												}
												isInvalid={
													(credentials.confirmPassword.length > 0 &&
														credentials.password !== credentials.confirmPassword) ||
													credentials.password.length === 0
												}
											/>
											<Form.Control.Feedback type="invalid">{null}</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
									<Form.Group as={Col} md="6" controlId="validationCustomConfirmPassword">
										<Form.Label>Confirm Password</Form.Label>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend3">🔑</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												type="password"
												placeholder="Confirm password"
												aria-describedby="inputGroupPrepend3"
												required
												autoComplete="off"
												name="confirmPassword"
												value={credentials.confirmPassword}
												onChange={formInputHandler}
												maxLength={50}
												isValid={
													credentials.password.length > 0 &&
													credentials.password === credentials.confirmPassword
												}
												isInvalid={
													(credentials.password.length > 0 &&
														credentials.password !== credentials.confirmPassword) ||
													credentials.confirmPassword.length === 0
												}
											/>
											<Form.Control.Feedback type="invalid">{null}</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} md="6" controlId="validationCustomDob">
										<Form.Label>Date Of Birth</Form.Label>
										<br />
										<DatePicker
											onChange={(date) =>
												setCredential((prevState) => {
													return { ...prevState, dateOfBirth: date };
												})}
											value={credentials.dateOfBirth}
											required
										/>
										<br />
										<CustomErrorFeedback>
											{!credentials.dateOfBirth ? 'Please select your birthdate' : null}
										</CustomErrorFeedback>
									</Form.Group>
									<Form.Group as={Col} md="6" controlId="validationCustomGender">
										<Form.Check.Label>Gender</Form.Check.Label>
										<Form.Check
											required
											custom
											type="radio"
											id="male"
											label="Male"
											name="gender"
											onChange={(ee) => {
												setCredential((prevState) => {
													return { ...prevState, gender: 'male' };
												});
											}}
											value="male"
										/>
										<Form.Check
											required
											custom
											type="radio"
											id="female"
											label="Female"
											name="gender"
											onChange={(ee) => {
												setCredential((prevState) => {
													return { ...prevState, gender: 'female' };
												});
											}}
											value="female"
										/>
									</Form.Group>
								</Form.Row>

								<Form.Group>
									<Form.Check
										required
										label="Agree to terms and conditions"
										feedback="You must agree before submitting."
									/>
								</Form.Group>
								{/* <FullButtonField type="submit" variant="outline-primary">
									Create account!
								</FullButtonField> */}
								<AwesomeButtonProgress
									style={{ width: '100%' }}
									type="secondary"
									size="medium"
									action={(element, next) =>
										setTimeout(() => {
											//awesome_button_middleware = next;
											handleSubmit(next);
										}, 500)}
									loadingLabel="Creating Account , Please be patient . . ."
									resultLabel="👍🏽"
								>
									Register
								</AwesomeButtonProgress>
							</Form>
						</RegisterHolder>
					</Col>
					<Col>
						<OnScreenSensor onChange={(isVisible) => setParentState('regisFocus', isVisible)}>
							<Parallax
								className="parallax-img"
								bgImage={regisBg}
								strength={500}
								blur={{ min: -15, max: 25 }}
							>
								<div style={{ height: 500 }}>
									<LabelText>🧭 Let us be your compass , Register now</LabelText>
								</div>
							</Parallax>
						</OnScreenSensor>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Register;
