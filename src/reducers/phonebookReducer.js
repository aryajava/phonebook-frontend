export const initialState = {
  phonebookItems: [],
  isFetching: false,
  hasMore: true,
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  isDeleteModalVisible: false,
  itemToDelete: null,
};

export const phonebookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        phonebookItems: action.payload.page === 1 ?
          action.payload.items :
          [...state.phonebookItems, ...action.payload.items],
        hasMore: action.payload.hasMore,
      };
    case 'SET_FETCHING':
      return { ...state, isFetching: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SEARCH_KEYWORD':
      return { ...state, searchKeyword: action.payload };
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };
    case 'RESET':
      return {
        ...state,
        phonebookItems: [],
        page: 1,
        searchKeyword: action.payload.keyword,
        sortOrder: action.payload.order,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        phonebookItems: state.phonebookItems.map((item) =>
          item.id === action.payload.id ? action.payload.updatedItem : item
        ),
      };
    case 'SHOW_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalVisible: true,
        itemToDelete: action.payload,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalVisible: false,
        itemToDelete: null,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        phonebookItems: state.phonebookItems.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};