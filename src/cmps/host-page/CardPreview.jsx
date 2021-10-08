export function CardPreview({ type }) {
    console.log(type);
    return (

        <div className={`preview ${type.property.split(' ').join('-').toLowerCase()} flex column gap10`}>
            <h1>{type.property}</h1>
            {type.price && <h1>{type.price}</h1>}
            {type.status &&
                <div className="order-status">
                    <h1>Approved:{type.status.Approved}</h1>
                    <h1>Declined:{type.status.Declined}</h1>
                    <h1>Pending:{type.status.Pending}</h1>
                </div>}
        </div>

    )

}