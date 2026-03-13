import { CategoryManager } from "../components/admin/CategoryManager";
import { Form } from "../components/admin/Form";
import { ItemManager } from "../components/admin/ItemManager";

export const Admin = () => {
    return (
        <>
            <Form />
            <ItemManager />
            <CategoryManager />
        </>
    );
};
