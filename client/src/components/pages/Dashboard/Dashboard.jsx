import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
	const _dState = useSelector((state) => state.dashboard);
	console.log(_dState);
	return (
		<div>
			<h1>This is the dashboard</h1>
			<p>{_dState.test}</p>
		</div>
	);
}

export default Dashboard;
