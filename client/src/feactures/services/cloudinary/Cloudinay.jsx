import { useCloudinary } from "../../../hook/useCloudinary";

export const Cloudinary = () => {
    
    const { loading, imageBeenUpload, image, uploadImage } = useCloudinary();
    
    return (
        <div className="backdrop-blur-xs flex items-center justify-center flex-col my-4">
            <h1 className="text-white font-bold underline tracking-wide text-2xl">Upload Image</h1>

            {/*1 - El siguiente input type file envia la imagen por el evento al handler uploadImage */}

            <input
                className="text-white rounded-md p-1 m-3 cursor-pointer hover:scale-103 transition-all mx-auto border-3 border-primary/70 max-w-[80%]"
                type="file"
                name="file"
                required
                // accept='image/png, image/jpeg'
                onChange={(e) => uploadImage(e)}
            />

            {/* ------------------------------------------------------------------------------------ */}

            {/* 9 - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */}
            {loading && <h3 className="text-white">Loading...</h3>}

            {imageBeenUpload && <img className="w-125 h-auto text-white" src={image} alt="imagen subida" />}
            {/* ------------------------------------------------------------------------------------ */}
        </div>
    );
};

// AHORA EN CLOUDINARY:

// 17 - Entrá en https://cloudinary.com

// 18 - Registrate con tu gmail y logueate.

// 19 - Una vez en la primer pantalla, tocar el segundo boton de arriba hacia abajo ( contra la izquierda de la pantalla) "Programmable media"

// 20 - Click en "Dashboard". Copia el "Cloud name" de los "Product Environment Credentials"

// 21 - Pegá el nombre recien copiado en el punto 16.2 como valor de la const cloudName.

// 22 - Volviendo a Cloudinary, hay una ruedita abajo a la izquierda de "settings" Click ahi y depsues en "Upload Presets"

// 23 - Click en "Add upload Preset"

// 24 - Le dejamos el "name" como está. ( este es el name que le pegamos despues a upload_preset en punto 16)

// 25 - En "Signing Mode" seleccionamos "Unsigned"

// 26 - Le damos a "Save", el botón enorme verde a la derecha arriba

// 27 - No te olvides de darle formato a el img para que muestre las imagenes con el tamaño y estilo que vos quieras.

// 28 - Con todo esto ya deberia funcionar.

// EXTRA:

//     Para importar los valores cloud name y upload preset desde el archivo ".env" podes hacerlo así:

//     const cloudName = import.meta.ev.cloudName

//     (recordá definirlo tambien en el archivo ".env" a cloudName)
//     Y para la otra variable exactamente lo mismo.

//     <!-- David Ezequiel Cunha Quinteros 26/07/2023 //ultima modif: 15/05/2024 -->
