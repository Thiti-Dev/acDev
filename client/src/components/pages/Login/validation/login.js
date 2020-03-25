import * as Func from '../../../utils/Functions';

const _isLoginCredentialValid = (credentials) => {
	//let _valid = true; // true at default // no need
	if (!Func.validateEmail(credentials.email) || credentials.password.length === 0) {
		return false;
	}
	return true; // if not meet one of those above
};

export default _isLoginCredentialValid;
