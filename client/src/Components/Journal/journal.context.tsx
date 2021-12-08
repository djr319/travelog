import { Journal } from 'Types/index';
import {
	createContext,
	Dispatch,
	SetStateAction
} from 'react';

type ContextType = {
	journals: Journal[];
	setJournals: Dispatch<SetStateAction<Journal[]>>;
};
const mockContext = {
	journals: [],
	setJournals: () => 0,
};

export const JournalContext = createContext<ContextType>(mockContext);
export const JournalProvider = JournalContext.Provider;