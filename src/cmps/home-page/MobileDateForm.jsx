import { DatePicker } from "../header/DatePicker";
export const MobileDateForm = ({ onChangeForm, onGoBack, handlePickingDates, onClearInputs, checkIn, checkOut, preventPropagation }) => {
    return (
        <form action="" onSubmit={(ev) => onChangeForm(ev, 'guest')}>
            <div className="margin40 flex gap10">
                <button onClick={() => onGoBack('home')}></button>
            </div>
            <DatePicker order={{}} preventPropagation={preventPropagation} handlePickingDates={handlePickingDates} />
            <div className="btn flex space-between">
                <button onClick={onClearInputs}>clear</button>
                <button type="submit" onClick={onChangeForm}>next</button>
            </div>
        </form>
    )

}

{/* <div className="input-container flex column" onClick={() => this.activeInput('date')}>
                <span>Check in</span>
                <input
                  type="text"
                  placeholder="Add dates"
                  name="checkIn"
                  value={this.getDateValue(checkIn)}
                  autoComplete="off"
                  disabled
                  onChange={this.handleChange}
                />
              </div>
              <div className="seperation-line-vertical"></div>
              <div className="input-container flex column"
                onClick={() => this.activeInput('date')}>
                <span>Check out</span>
                <input
                  type="text"
                  placeholder="Add dates"
                  autoComplete="off"
                  name="checkOut"
                  value={this.getDateValue(checkOut)}
                  disabled
                  onChange={this.handleChange}

                /> */}