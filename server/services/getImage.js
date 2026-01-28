const  id = "sg-11134202-7rdvc-lz0mspa9of3o5a"
export async function getImage(id) {
    const res = await fetch(`https://res.cloudinary.com/dnucajsxn/image/upload/${id}`);
    const url = URL.createObjectURL(res.blob())
    const img = document.createElement("img")
    img.src = url
    document.body.appendChild(img)
}
