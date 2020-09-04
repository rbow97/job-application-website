import * as actionTypes from './actionTypes';

export const setJob = roleInfo => {
    return {
        type: actionTypes.ROLE_ADDED,
        payload: roleInfo
    }
}

export const deleteRole = id => {
    return {
        type: actionTypes.ROLE_DELETED,
        payload: id,
    }
}

export const editJob = roleInfo => {
    return {
        type: actionTypes.ROLE_EDITED,
        payload: roleInfo
    }
}