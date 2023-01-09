export type Ctor<T> = {
	new (...args: any[]): T;
};

export type GenericClassDecorator<T> = (target: T) => void;

export type Token<T = any> = Ctor<T> | symbol;

export enum ServiceLifetimes {
	Singleton,
	Transient,
	Scoped,
}

interface Registration<T> {
	readonly id: Token;
	readonly ctor: Ctor<T>;
	readonly settings: {
		lifeTime: ServiceLifetimes;
	};
}

const registry = new Map<Token, Registration<any>>();

function register<T>(token: Ctor<T>): void {
	registry.set(token, {
		ctor: token,
		id: token,
		settings: {
			lifeTime: ServiceLifetimes.Scoped,
		},
	});
}

// Registers a class symbol into a global registry.
export function Injectable(): GenericClassDecorator<Ctor<any>> {
	return function decorate<T>(ctor: Ctor<T>) {
		register(ctor);
	};
}

class Scope {
	public __register(symbl: Token, deps: []): void {
		// Empty
	}
}

export function instantiate<T>(ctor: Ctor<T>): T {
	return new ctor();
}

export const test_scope = new Scope();

// function useInjectable<T>(ctor: Ctor<T>): T {
// 	return ctor as T;
// }

// function App(): JSX.Element {
// 	const controller = useInjectable(Controller);

// 	return (
// 		<button
// 			onClick={() => {
// 				controller.count++;
// 			}}
// 		>
// 			{controller.count}
// 		</button>
// 	);
// }
