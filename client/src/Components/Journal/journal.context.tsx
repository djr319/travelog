import { Journal } from 'Types/index';
import {
	createContext,
	Dispatch,
	SetStateAction
} from 'react';

type ContextType = {
	journals: Journal[];
	setJournals: Dispatch<SetStateAction<Journal[]>>;
	page: JSX.Element;
	setPage: Dispatch<SetStateAction<JSX.Element>>;
};
const mockContext = {
	journals: [],
	setJournals: () => 0,
	page: <div />,
	setPage: () => 0
};

export const JournalContext = createContext<ContextType>(mockContext);
export const JournalProvider = JournalContext.Provider;