import {STAKEHOLDER_VIEW,STAKEHOLDER_MEMBER,STAKEHOLDER_GROUP,STAKEHOLDER_ACC} from '../../actions/types'

const initialState = {
    stakeholderDetail:[],
    stakeholderMember:[],
    stakeholderGroup:[],
    stakeholderAcc:[],   
}

export default (state = initialState, action) => {
  switch (action.type) {

  case STAKEHOLDER_VIEW:
    return { ...state,
        stakeholderDetail:action.payload,
    }
  case STAKEHOLDER_MEMBER:
    return { ...state,
      stakeholderMember:action.payload,
    }
  case STAKEHOLDER_GROUP:
    return { ...state,
      stakeholderGroup:action.payload,
    }
  case STAKEHOLDER_ACC:
    return { ...state,
      stakeholderAcc:action.payload,
    }   
  default:
    return state
  }
}


