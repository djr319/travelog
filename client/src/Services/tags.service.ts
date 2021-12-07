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

const TagsApi = {
	parseTags
};

export default TagsApi;
