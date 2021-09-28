import { EnhancedClean } from "./svgs/EnhancedClean";
import { HouseTag } from "./svgs/HouseTag";
import { SelfCheckIn } from "./svgs/SelfCheckin";

export function Tags({tag,type}) {

switch (tag) {
    case 'entire to yourself':
        return <div className="tag-container flex">
       <HouseTag/>
       <div className="flex column">
           <p className="tag-header">{`Entire ${type}`}</p>
           <p>{`You'll have the entire ${type} to yourself.`}</p>
       </div>
        </div>
    case 'enhanced clean':
        return <div className="tag-container flex">
       <EnhancedClean/>
       <div className="flex column">
           <p className="tag-header">Enhanced Clean</p>
           <p>The host committed to Homeaway's 5-step enhanced cleaning process.</p>
       </div>
        </div>
    case 'self check-in':
        return <div className="tag-container flex">
       <SelfCheckIn/>
       <div className="flex column">
           <p className="tag-header">Self Check-in</p>
           <p>Check yourself in with the key safe.</p>
       </div>
        </div>

}

}