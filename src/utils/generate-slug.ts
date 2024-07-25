export function generateSlug(text: string) {
    const slug = text
        .replace(/ /g, "-")
        .trim()
        .toLowerCase()

    const removeDiatricts = replaceDiacritics(slug)
    const removedPunctuation = removePunctuation(removeDiatricts)

    return removedPunctuation
}

function removePunctuation(str: string) {
    return str.replace(/[.,\/!?]/g, '');
}

const diacriticsMap = {
    "á": "a",
    "à": "a",
    "ä": "a",
    "â": "a",
    "ã": "a",
    "é": "e",
    "è": "e",
    "ë": "e",
    "ê": "e",
    "í": "i",
    "ì": "i",
    "ï": "i",
    "î": "i",
    "ó": "o",
    "ò": "o",
    "ö": "o",
    "ô": "o",
    "õ": "o",
    "ú": "u",
    "ù": "u",
    "ü": "u",
    "û": "u",
    "ñ": "n",
    "ç": "c"
};

function replaceDiacritics(text: string) {
    return text.replace(/[áàäâãéèëêíìïîóòöôõúùüûñç]/g, function(match) {
        return diacriticsMap[match];
    });
}