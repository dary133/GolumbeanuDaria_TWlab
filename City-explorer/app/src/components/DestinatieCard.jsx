
export default function DestinatieCard({ destinatie, onToggle, onDelete }) {
    const { id, oras, tara, zile, vizitat } = destinatie;

    return (
        <article className={vizitat ? 'card vizitat' : 'card'}>
            <h3>{oras}</h3>

            <p className="tara">{tara}</p>

            <p className="zile">
                Sejur recomandat: {zile} zile
            </p>

            <div className="card-actions">
                <button
                    className="btn-toggle"
                    type="button"
                    onClick={() => onToggle(id)}
                >
                    {vizitat ? 'Vizitata' : 'Marcheaza ca vizitata'}
                </button>

                <button
                    className="btn-delete"
                    type="button"
                    onClick={() => onDelete(id)}
                >
                    Sterge
                </button>
            </div>
        </article>
    );
}
