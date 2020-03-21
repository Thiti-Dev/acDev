import React, { Component } from 'react';
import {
	//Button,
	//Jumbotron,
	Container,
	Spinner,
	//Breadcrumb,
	Toast,
	Row,
	Col,
	Card,
	Image,
	Badge
} from 'react-bootstrap';

//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── USEFUL LIB ─────────────────────────────────────────────────────────────────
//
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Iframe from 'react-iframe';

import { Parallax, Background } from 'react-parallax';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── CUSTOM Component ─────────────────────────────────────────────────────────────────────
//
import CustomNav from './CustomNav';
import SectionSep from '../../utils/SectionSep';
import Developers from './Developers';
import Register from './Register';

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UTILS ──────────────────────────────────────────────────────────────────────
//
import * as Func from '../../utils/Functions';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── MY LIBRARY ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
// ────────────────────────────────────────────────────────────────────────────────

const CenterText = styled.div`
	background: white;
	padding: 1rem;
	position: absolute;
	top: 25%;
	left: 50%;
	opacity: 0.7;
	transform: translate(-50%, -50%);
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: rgba(255, 255, 255, 0.589);
	user-select: none;
`;
const devImg =
	'https://images.unsplash.com/photo-1564606121372-d310470df1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

//
// ─── ADJUSTABLE OPTIONS ─────────────────────────────────────────────────────────
//

const foreverRegisterAnimationEntrance = true; // forever re-render the animation when being scrolled pass or in
// ────────────────────────────────────────────────────────────────────────────────

export class IndexPage extends Component {
	constructor() {
		super();
		this.setParentState = this.setParentState.bind(this);
		this.state = {
			widgetLoaded: false,
			discordFocus: false,
			devFocus: false,
			regisFocus: false,
			regisFocusNeeded: true
		};
	}

	setParentState(key, value) {
		// Rendering sensored animation only once
		if (this.state.regisFocusNeeded) {
			// Useful for passing in the prop and then set its parent state
			this.setState({ [key]: value, regisFocusNeeded: foreverRegisterAnimationEntrance }, () => {
				console.log(`Done setting [${key}] to value of [${value}]`);
			});
		}
	}

	componentDidMount() {
		//Custom scroll event

		Events.scrollEvent.register('begin', function(to, element) {
			console.log('begin', arguments);
		});

		Events.scrollEvent.register('end', function(to, element) {
			console.log('end', arguments);
		});

		scrollSpy.update();
	}

	componentWillUnmount() {
		Events.scrollEvent.remove('begin');
		Events.scrollEvent.remove('end');
	}

	scrollTo(section) {
		// Rendering dynamic calls
		scroller.scrollTo(section, {
			duration: 1500,
			delay: 0,
			smooth: 'easeInOutQuart'
		});
	}

	scrollToTop() {
		scroll.scrollToTop();
	}

	scrollToBottom() {
		scroll.scrollToBottom();
	}

	render() {
		let _parallaxImgElement = document.getElementsByClassName('parallax-img');
		let { widgetLoaded, discordFocus, devFocus, regisFocus } = this.state;
		let renderedIframe;
		if (!widgetLoaded) {
			renderedIframe = <Spinner animation="border" />;
		} else {
			renderedIframe = null;
		}
		return (
			<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationInDuration={1500}>
				<Container fluid style={{ margin: 0, padding: 0 }}>
					<CustomNav scrollTo={this.scrollTo} />

					<SectionSep />

					{/* Discord Section */}
					<Element name="discord" className="element">
						<Container fluid style={{ display: 'flex', padding: 50, justifyContent: 'space-evenly' }}>
							<div style={{ marginTop: 150 }}>
								<OnScreenSensor onChange={(isVisible) => this.setState({ discordFocus: isVisible })}>
									<Animated
										animationIn="fadeIn"
										animationOut="fadeOut"
										isVisible={discordFocus}
										animationInDuration={1500}
									>
										<Toast onClose={() => console.log('closing')} show={true} animation={false}>
											<Toast.Header>
												<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
												<strong className="mr-auto">aaw0kenn</strong>
												<small>a momment ago</small>
											</Toast.Header>
											<Toast.Body>
												Yooo, why don't you join one of our best discord channel?
											</Toast.Body>
										</Toast>
									</Animated>
								</OnScreenSensor>
							</div>

							<div>
								{renderedIframe}
								<Iframe
									className="justify-content-md-center"
									url="https://discordapp.com/widget?id=685130117827002442&theme=dark"
									width="500px"
									height="500px"
									id="iframeDiscordWidget"
									display={this.state.widgetLoaded ? 'block' : 'none'}
									position="relative"
									allowtransparency="true"
									frameBorder="0"
									onLoad={() => this.setState({ widgetLoaded: true })}
								/>
							</div>
						</Container>
					</Element>
					{/* End of Discord Section */}
					<SectionSep />
					<Element name="dev" className="element">
						<Container fluid style={{ padding: 60 }}>
							<Row>
								<Col>
									<OnScreenSensor onChange={(isVisible) => this.setState({ devFocus: isVisible })}>
										<Parallax
											className="parallax-img"
											bgImage={devImg}
											strength={500}
											blur={{ min: -15, max: 25 }}
										>
											<div style={{ height: 500 }}>
												<CenterText>✨ Our interesting developers</CenterText>
											</div>
										</Parallax>
									</OnScreenSensor>
								</Col>
								<Col>
									<Animated
										animationIn="bounceInRight"
										animationOut="bounceOutRight"
										isVisible={devFocus}
										animationInDuration={1500}
									>
										<Developers />
									</Animated>
								</Col>
							</Row>
						</Container>
					</Element>
					<SectionSep />
					<Element name="register" className="element">
						<Animated
							animationIn="slideInRight"
							animationOut="slideOutRight"
							isVisible={regisFocus}
							animationInDuration={1500}
						>
							<Register setParentState={this.setParentState} />
						</Animated>
					</Element>
				</Container>
			</Animated>
		);
	}
}

export default IndexPage;
