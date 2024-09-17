import {User} from '@core/models/user.model';

/**
 * Http request methods
 */
export enum ApiMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

/**
 * Not sure if this is really a good idea. There could be a lot of endpoints and this
 * doesn't take into account endpoint patterns ('/api/something/:id')
 *
 * But, it could be just high level endpoints I guess.
 */
export enum ApiEndpoints {
	LOGIN = '/api/Account/authenticate',
	REGISTER = '/api/Account/register',
	LOGOUT = '/api/Account/logout',
	FORGOT = '/api/Account/forgot',
	CHANGE_PW = '/api/Account/changepw'
}

/**
 * This maps top level api request routes to a class. For example, if a request is
 * made to "/api/person" which returns an array of people, we want each item in that
 * array to be an instance of User. Like wise a request to "/api/person/<id>" returns
 * a single person, we also want that to be an instance of User.
 */
export const ApiRouteToClass = {
	'/api/auth': User,
	'/api/person': User
};

export const CachableRoutePatterns = {
	'/api/person/:id': true,
	'https://pokeapi.co/api/v2/pokemon/:id/': true,
	'https://pokeapi.co/api/v2/pokemon': false,
};
