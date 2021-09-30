import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { SearchBar } from "./SearchBar"

export class MiniSearchBar extends React.Component {

    state = {
        isClicked: false
    }



    onSearchBarClicked = () => {
        this.setState({ isClicked: true })
    }

    render() {
        const { isClicked } = this.state
        if (isClicked) return <SearchBar />
        return (
            <div className="mini-search-bar flex space-between" onClick={this.onSearchBarClicked}>
                <span>Start your search</span>
                <button className="search-bar-submit-mini flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
            </div>
        )
    }
}