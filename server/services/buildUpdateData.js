export const buildUpdateData = (body, allowedFields) => {
    const updateData = {};

    // 1. Extraemos solo los campos permitidos
    for (const field of allowedFields) {
        if (body[field] !== undefined) {
            updateData[field] = body[field];
        }
    }

    // 2. Si no se envió ningún campo válido, retornamos un error
    if (Object.keys(updateData).length === 0) {
        return {
            error: "At least one field must be provided for update",
        };
    }

    // 3. Si todo está bien, retornamos los datos limpios
    return {
        data: updateData,
    };
};
