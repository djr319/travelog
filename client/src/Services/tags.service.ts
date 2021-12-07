import { fetchRequest } from './index';
import { Journal } from 'Types/index';

function parseTags (text: string): string[] {
	const matches = text.match(/#\S+\b/g);
	if (matches === null) return [];
  
  const res = matches.map((match) =>
		match.substr(1).toLowerCase().replace(/\W/g, '')
	);
  return res;
}

function getMatchingJournals(userId: string, tags: string[]): Promise<Journal[]> {
	return fetchRequest(`/journals/match/${userId}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags })
  });
}

const TagsApi = {
	parseTags,
	getMatchingJournals
};

export default TagsApi;
