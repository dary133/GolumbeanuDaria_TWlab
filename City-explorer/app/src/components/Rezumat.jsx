export default function Rezumat({ total, nevizitate, zile }) {
    return (
        <p className="rezumat">
            {total} destinatii disponibile • {nevizitate} de explorat • {zile} zile recomandate
        </p>
    );
}