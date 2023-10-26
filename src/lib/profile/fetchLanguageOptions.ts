import { Language } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchLanguageOptions = async (
    searchTerm?: string,
): Promise<Language[]> => {
    const res = await fetch(searchTerm ? `${BASE_URL}/api/languages?searchTerm=${searchTerm}` : `${BASE_URL}/api/languages`, {
        mode: "no-cors"
    }).then((res) => res.json());

    return res.languages;
};

export default fetchLanguageOptions;
