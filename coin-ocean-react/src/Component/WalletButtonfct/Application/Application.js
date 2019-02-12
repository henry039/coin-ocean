import React,{Component} from 'react';
import Reminder from '../../Reminder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faCogs, faBell, faCrown  } from '@fortawesome/free-solid-svg-icons'
import './Application.css'
library.add(faAddressCard,faCogs,faBell,faCrown);


class Setting extends Component{
    render() {
        return(
            <div className="settingicon">
                <button><FontAwesomeIcon icon="address-card" /></button>
                <button><FontAwesomeIcon icon="cogs" /></button>
                <button><FontAwesomeIcon icon="bell" /></button>
                <button><FontAwesomeIcon icon="crown" /></button>
                <Reminder uid={this.props.uid}/>
            </div>
        )
    }
}

export default Setting;