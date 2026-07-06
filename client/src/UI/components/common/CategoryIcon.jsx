export const CategoryIcon = ({ icon: Icon }) => {
    if (!Icon) return null;
    return <Icon className="text-white group-focus:text-black" />;
};
