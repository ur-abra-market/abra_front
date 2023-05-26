
export const kebabToCamel = (title: string): string => {
    const newTitle = title.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    return newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
}
