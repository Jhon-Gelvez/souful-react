import { useState } from "react";

export const handleModal = (initialValue = false) => {
    const [isOpenModal, setIsOpenModal] = useState(initialValue);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setIsOpenModal(true);
        setSelectedItem(item);
    };
    const closeModal = () => {
        setIsOpenModal(false);
        setSelectedItem(null);
    };

    return { isOpenModal, openModal, closeModal, selectedItem };
};