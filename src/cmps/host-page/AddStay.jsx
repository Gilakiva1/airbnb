import { Component } from 'react'
import { connect } from 'react-redux'

import { addAsset, loadAssets } from '../../store/host.action'
import { CloudService } from '../../services/cloudinary-service'

class _AddStay extends Component {

    state = {
        asset: {
            imgUrls: ['', '', '', '', ''],
            name: '',
            price: '',
            type: 'Villa',
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
            likedByUserIds: [],


        },
        propertyType: ['Villa', 'Studio', 'Apartment', 'Room in hotel', 'House'],
        amenitiesType: ['TV', 'Wifi', 'Air conditioning', 'Smoking allowed', 'Pets allowed', 'Cooking basics', 'Kitchen', 'Washer', 'Dryer', 'Hair dryer', 'Crib'],
        tagType: ['entire to yourself', 'enhanced clean', 'self check-in', 'free cancellation'],
        isEdit: false

    }
    componentDidMount() {
        if (this.props.currAsset) {
            this.editAsset()

        }
    }
    editAsset = () => {
        this.setState({ asset: this.props.currAsset, isEdit: true }, () => {
            console.log('this.state.asset', this.state.asset);
        })

    }

    onUploadImg = async (ev) => {
        let { imgUrls } = this.state.asset
        const urlImg = await CloudService.uploadImg(ev)
        const idx = imgUrls.findIndex(img => img === '')
        imgUrls[idx] = urlImg
        this.setState({ imgUrls })
    }

    handleChange = (ev) => {
        const { asset } = this.state
        const property = ev.target.name
        const { value } = ev.target
        this.setState({ asset: { ...asset, [property]: value } })
    }

    handleChangeLoc = (ev) => {
        const { asset } = this.state
        const { loc } = asset
        const property = ev.target.name
        const { value } = ev.target
        this.setState({ asset: { ...asset, loc: { ...loc, [property]: value } } }, () => {
            this.createAddress()
        })

    }

    createAddress() {
        const { asset } = this.state
        const { loc } = asset
        const { city, country } = loc
        const address = `${city}, ${country}`
        this.setState({ asset: { ...asset, loc: { ...loc, address } } })
    }

    saveCheckedAmenities = (ev) => {
        const { asset } = this.state
        let { amenities } = asset
        const { value } = ev.target
        if (ev.target.checked) {
            const isExist = amenities.some(currAmenities => currAmenities === value)
            if (isExist) return
            amenities.push(value)
        } else {
            let idx = amenities.indexOf(value)
            amenities.splice(idx, 1)
        }
        this.setState({ asset: { ...asset, amenities } })

    }

    saveCheckedTags = (ev) => {
        let { tags } = this.state.asset
        const { asset } = this.state
        const { value } = ev.target
        if (ev.target.checked) {
            const isExist = tags.some(currTag => currTag === value)
            if (isExist) return
            tags.push(value)
        } else {
            let idx = tags.indexOf(value)
            tags.splice(idx, 1)
        }
        this.setState({ asset: { ...asset, tags } })
    }

    isChecked = (property, value) => {
        const { asset } = this.state
        return asset[property].find(currValue => currValue === value)
    }

    onAddStay = async (ev) => {
        ev.preventDefault()
        const { asset, isEdit } = this.state
        const { amenities, tags } = asset
        let { imgUrls } = asset
        imgUrls = imgUrls.filter(img => img !== '')

        if (imgUrls.length === 5 && amenities && tags) {
            await this.props.addAsset(asset)
            await this.props.loadAssets(this.props.host._id)
        }

    }

    render() {
        const { asset } = this.state
        const { imgUrls, amenities } = asset
        const { propertyType, amenitiesType, tagType, isEdit } = this.state
        return (
            <section className='add-stay-continer'>
                <form >
                    <div className="flex gap10 wrap">
                        <label className="flex column wrap">
                            Stay Name
                            <input onChange={this.handleChange} name='name' type='text' value={asset.name} />
                        </label>
                        <div className="flex gap10 wrap">
                            <label className="flex column">
                                Country
                                <input onChange={this.handleChangeLoc} name='country' type='text' value={asset.loc.country} />
                            </label>
                            <label className="flex column">
                                City
                                <input onChange={this.handleChangeLoc} name='city' type='text' value={asset.loc.city} />
                            </label>
                        </div>
                    </div>
                    <div className="add-stay-grid">
                        {imgUrls.map((src, idx) => (
                            <div  key={idx} className={`grid-img grid-img${idx} medium pointer flex justify-center align-center relative`}>
                                <label className={`upload-img pointer wide high flex justify-center align-center absolute ${isEdit?'f-white':'f-black'} `}>
                                    <input onChange={this.onUploadImg} className={`img${idx}`} type='file' accept='img/*' className='img-upload-btn' id='imgUpload' />
                                    Upload Image
                                </label>
                                {console.log(src)}
                                {src && <img src={src} alt='add image' />}
                            </div>
                        ))
                        }
                    </div>
                    <div className="flex wrap gap15">
                        <label className="flex column" >
                            Capacity
                            <input onChange={this.handleChange} value={asset.capacity} name='capacity' type='number' />
                        </label>
                        <label htmlFor="type" className="flex column">
                            PropertyType
                            {/* <input onChange={this.handleChange} name='type' type='text' /> */}
                            <select id="type" name="type" value={asset.type} onChange={this.handleChange}>
                                {
                                    propertyType.map((type, idx) => {
                                        return <option key={idx} value={type}>{type}</option>
                                    })
                                }
                            </select>
                        </label>
                        <label className="flex column">
                            Price
                            <input onChange={this.handleChange} name='price' value={asset.price} type='number' />
                        </label>
                    </div>
                    <div className="flex gap30 wrap">
                        <div className="flex column gap5 wrap">
                            <span className="fs20 medium fw-unset ">Amenities</span>
                            {amenitiesType.map((amenitie, idx) => (
                                <label key={idx}>
                                    <input type="checkbox" name={amenitie} value={amenitie}
                                        onChange={this.saveCheckedAmenities} checked={this.isChecked('amenities', amenitie)}
                                    />
                                    {amenitie}
                                </label>
                            ))}
                        </div>
                        <div className="flex column gap5 wrap">

                            <span className="fs20 medium fw-unset ">Tags</span>

                            {tagType.map((tag, idx) => (
                                <label key={idx}>
                                    <input type="checkbox" name={tag} value={tag} checked={this.isChecked('tags', tag)}
                                        onChange={this.saveCheckedTags}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="description flex column " >
                        <textarea onChange={this.handleChange} type="text" name="description" autoComplete="off" value={asset.description}  ></textarea>
                    </div>
                    <button onClick={this.onAddStay}>Save</button>
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
    addAsset,
    loadAssets
}
export const AddStay = connect(mapStateToProps, mapDispatchToProps)(_AddStay)