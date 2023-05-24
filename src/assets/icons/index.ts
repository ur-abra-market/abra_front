
interface IconComponents {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const kebabToCamel = (title: string): string => {
    const newTitle = title.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    return newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
}

const importAll = (files: __WebpackModuleApi.RequireContext): IconComponents => {
    const icons: IconComponents = {};
    files.keys().forEach((key: string) => {
        const componentName = kebabToCamel(key);
        icons[componentName] = files(key).default;
    });
    console.log("ICONS", icons)
    return icons;
}

export default importAll(require.context('./files/', false, /\.svg$/));
