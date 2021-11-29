import React from 'react'
import { useStore } from '../../ZustandStore/ZustandStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '../../css/TransitionItem.css'

const msgTypes = {
    info: 'alert-info',
    success: 'alert-success',
    danger: 'alert-danger',
    warning: 'alert-warning'
}

function AlertDisplay() {
    const Alerts = useStore(s => s.Alerts)

    return (
        <div
            style={{
                'position': 'fixed',
                'zIndex': 1,
                'left': '50%',
                'top': '5%',
                'opacity': 0.90,
                'transform': 'translate(-50%, -5%)',

            }}
        >
            <div >
                <TransitionGroup >
                    {Alerts.map(Alert =>
                        <CSSTransition
                            key={Alert.key}
                            timeout={500}
                            classNames="TransitionItem1"
                        >
                            <div
                                className={"alert mt-1 " + msgTypes[Alert.type]}
                                style={{ 'boxShadow': "0px 5px 5px" }}
                                role="alert"
                                key={Alert.key}
                            >
                                {Alert.content}
                            </div>
                        </CSSTransition>

                    )}
                </TransitionGroup >
            </div>
        </div>)
}

export default AlertDisplay