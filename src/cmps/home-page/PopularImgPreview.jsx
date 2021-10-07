import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router";
import { utilService } from "../../services/util.service"
import { onSetOrder } from '../../store/order.action'


export class _PopularImgPreview extends React.Component {

    state = {
        order: {
            address: this.props.link.city
        }

    }

    onImgClick = async () => {
        const { order } = this.state
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }

    render() {
        const { link, idx } = this.props
        return (

            <div className="popular-list flex" onClick={this.onImgClick}>
                 <img className={`popular-img round-edge link-${idx}`} src={link.img} alt="" />
                <div className="popular-txt fs16  flex column justify-center wide ">
                    <h3 className="city">{link.city}</h3>
                    <h4 className="country">{link.country}</h4>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}
const mapDispatchToProps = {
    onSetOrder
}
export const PopularImgPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_PopularImgPreview))
