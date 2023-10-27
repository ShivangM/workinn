import { Language } from "@/interfaces/user";
import fetchLanguageOptions from "@/lib/profile/fetchLanguageOptions";
import debounce from "./debounce";

const promiseLanguageOptions = async (inputValue: string, callback: (res: Language[]) => void) => {
    try {
        const res = await fetchLanguageOptions(inputValue);
        callback(res);
    } catch (error) {
        // Todo: Handle error appropriately, e.g., log the error or show a user-friendly message
        console.error('Error fetching language options:', error);
    }
};

const loadLanguageOptions = async (inputValue: string) => {
    try {
        return await new Promise<Language[]>((resolve) => {
            const debouncedPromise = debounce(async () => {
                await promiseLanguageOptions(inputValue, (res) => {
                    resolve(res);
                });
            }, 300);
            debouncedPromise();
        });
    } catch (error) {
        // Todo: Handle error appropriately, e.g., log the error or show a user-friendly message
        console.error('Error loading language options:', error);
        return [];
    }
};

export default loadLanguageOptions;