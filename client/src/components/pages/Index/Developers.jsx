import React from 'react';
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
import styled from 'styled-components';
// ────────────────────────────────────────────────────────────────────────────────

const ProfilePicContainer = styled.div`
	top: 28%;
	left: 5%;
	position: absolute;
`;

const ProfileDescContainer = styled.div`
	width: 72%;
	height: 80%;
	/* background-color: black; */
	margin-top: 1.2rem;
	margin-left: 4.5rem;

	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
`;

const CustomBadge = styled(Badge)`display: inline;margin-left:0.3rem;`;

export default function Developers() {
	return (
		<React.Fragment>
			<Row>
				<Col>
					<Card className="hvr-grow" style={{ width: '18rem', height: '5rem', marginBottom: '2rem' }}>
						<ProfilePicContainer>
							<Image
								src="https://sophosnews.files.wordpress.com/2013/11/anon-250.png?w=250"
								roundedCircle
								width="50rem"
							/>
						</ProfilePicContainer>
						<Badge style={{ width: '100%', position: 'absolute' }} variant="secondary">
							Anonymous Dev
						</Badge>
						<ProfileDescContainer>
							<CustomBadge pill variant="info">
								Level: 59
							</CustomBadge>
							<br />
							<CustomBadge pill variant="success">
								Security
							</CustomBadge>
							<CustomBadge pill variant="success">
								Backend-Dev
							</CustomBadge>
						</ProfileDescContainer>
					</Card>
					<Card className="hvr-grow" style={{ width: '18rem', height: '5rem', marginBottom: '2rem' }}>
						<ProfilePicContainer>
							<Image
								src="https://sophosnews.files.wordpress.com/2013/11/anon-250.png?w=250"
								roundedCircle
								width="50rem"
							/>
						</ProfilePicContainer>
						<Badge style={{ width: '100%', position: 'absolute' }} variant="secondary">
							Anonymous Dev
						</Badge>
						<ProfileDescContainer>
							<CustomBadge pill variant="info">
								Level: 52
							</CustomBadge>
							<br />
							<CustomBadge pill variant="success">
								UX/UI Designer
							</CustomBadge>
						</ProfileDescContainer>
					</Card>
				</Col>
				<Col>
					<Card className="hvr-grow" style={{ width: '18rem', height: '5rem' }}>
						<ProfilePicContainer>
							<Image
								src="https://avatars1.githubusercontent.com/u/36455825?s=460&u=7d01e09a590eba9ac70883c31990afeaf30d4b95&v=4"
								roundedCircle
								width="50rem"
							/>
						</ProfilePicContainer>
						<Badge style={{ width: '100%', position: 'absolute' }} variant="secondary">
							Thiti Dev
						</Badge>
						<ProfileDescContainer>
							<CustomBadge pill variant="info">
								Level: 2
							</CustomBadge>
							<br />
							<CustomBadge pill variant="success">
								Full-Stack Dev
							</CustomBadge>
						</ProfileDescContainer>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	);
}
