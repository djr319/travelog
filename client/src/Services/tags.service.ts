import { fetchRequest } from './index';
import { Journal } from 'Types/index';

function parseTags (text: string): string[] {
	const matches = text.match(/#\S+\b/g);
  console.log(matches);
	if (matches === null) return [];
  
  const res = matches.map((match) =>
		match.substr(1).toLowerCase().replace(/\W/g, '')
	);
  console.log('res', res);
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
