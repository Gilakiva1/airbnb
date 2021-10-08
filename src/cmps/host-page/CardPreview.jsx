export function CardPreview({ type }) {
    return (

        <div className={`preview ${type.property} flex column gap10`}>
            <h1>{type.property}</h1>
            <h1>{type?.info || 0}</h1>
        </div>
    )

}