import { CardPreview } from "./CardPreview"
export function CardList({ types }) {

    return (
        <ul className="card-list flex gap10">
            {types.map((type, idx) => <CardPreview type={type} key={idx} />)}
        </ul>
    )

}