import { Component } from 'react'
import { connect } from 'react-redux'

import { CloudService } from '../../services/cloudinary-service'

class _AddStay extends Component {

    state = {
        asset: {
            imgUrls: ['', '', '', '', ''],
            name: '',
            price: '',
            type: '',
            capacity: '',
            rating: '',
            loc: {
                address: '',
                country: '',
                countryCode: '',
                lat: '',
                lng: '',
                city: ''
            },
            amenities: [],
            tags: [],
            host: {
                _id: this.props.host._id,
                fullname: this.props.host.fullname,
                imgUrl: this.props.host.imgUrl
            },
            description: '',
            reviews: [],

        },
        propertyType: ['Loft', 'Villa', 'Studio', 'Appartment', 'Private room', 'Room in hotel', 'Home', 'Condominium'],
        amenitiesType: ['TV', 'Wifi', 'Air conditioning', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'Kitchen', 'Washer', 'Dryer', 'Hair dryer', 'Crib', 'Self check-in']

    }

    onUploadImg = async (ev) => {
        let { imgUrls } = this.state
        const urlImg = await CloudService.uploadImg(ev)
        imgUrls.push(urlImg)
        this.setState({ imgUrls })
    }

    // saveStayDetails = (ev) => {
    handleChange = (ev) => {
        const { asset } = this.state
        const property = ev.target.name
        const { value } = ev.target
        this.setState({ asset: { ...asset, [property]: value } })
    }

    saveChecked = (ev) => {
        let { amenities } = this.state.asset
        const { asset } = this.state
        const { value } = ev.target
        if (ev.target.checked) {
            const isExist = amenities.some(currAmenities => currAmenities === value)
            if (isExist) return
            amenities.push(value)
        } else {
            let idx = amenities.indexOf(value)
            amenities.splice(idx, 1)
        }
        this.setState({ asset: { ...asset, amenities } },()=>{
            console.log('amenities',this.state.asset.amenities);
        })

    }

    render() {
        const { imgUrls } = this.state.asset
        const { propertyType, amenitiesType } = this.state
        return (
            <section className='add-stay-grid'>
                <form>
                    <div>
                        <input onKeyUp={this.handleChange} name='name' type='text' placeholder='Stay Name' />
                        <input onKeyUp={this.handleChange} name='country' type='text' placeholder='Country' />
                        <input onKeyUp={this.handleChange} name='city' type='text' placeholder='City' />
                    </div>
                    {imgUrls.map((src, idx) => (
                        <div key={idx} className={`grid-img${idx} pointer`}>
                            <label>
                                {!src && <input onChange={this.onUploadImg} className={`img${idx}`} type='file' accept='img/*' className='img-upload-btn' id='imgUpload' />}
                                Upload Image
                            </label>
                            {src && <img src={src} alt='add image' />}
                        </div>
                    ))
                    }
                    <div>
                        <label>
                            Capacity
                            <input onKeyUp={this.handleChange} name='capacity' type='number' />
                        </label>
                        <label htmlFor="type">
                            PropertyType
                            {/* <input onKeyUp={this.handleChange} name='type' type='text' /> */}
                            <select id="type">
                                {
                                    propertyType.map((type, idx) => {
                                        return <option key={idx} value={type}>{type}</option>
                                    })
                                }


                            </select>
                        </label>
                        <label>
                            Price
                            <input onKeyUp={this.handleChange} name='price' type='number' />
                        </label>

                    </div>
                    <div>
                        {amenitiesType.map((amenitie, idx) => (
                            <label key={idx}>
                                <input type="checkbox" name={amenitie} value={amenitie}
                                    onChange={this.saveChecked}
                                />
                                {amenitie}
                            </label>
                        ))}
                    </div>
                </form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {

}
export const AddStay = connect(mapStateToProps, mapDispatchToProps)(_AddStay)