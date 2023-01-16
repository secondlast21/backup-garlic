import storage from "../storage";

const defaultAction = {
  type: "",
  payload: null,
};

const auth = storage.get("auth", {});

const initialState = {
  isSessionExpired: false,
  token: auth.token,
  user: auth.user,
};

const mapUserObject = (authObject, profileObject) => {
  return {
    isSessionExpired: false,
    token: authObject,
    user: {
      nama: profileObject.resultProfile.nama,
      email: profileObject.resultProfile.email,
      nomorTelepon: profileObject.resultProfile.nomorTelepon,
      alamat: profileObject.resultProfile.alamat,
      kelurahan: profileObject.resultProfile.kelurahan,
      kecamatan: profileObject.resultProfile.kecamatan,
      kota: profileObject.resultProfile.kota,
      kebutuhan: profileObject.resultProfile.kebutuhan,
      jenisUnitIPB: profileObject.resultProfile.jenisUnitIPB,
      tipe: profileObject.resultProfile.tipe,
      aktif: profileObject.resultProfile.aktif,
    },
  };
};

const authReducer = (state = initialState, action = defaultAction) => {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "SET_EXPIRED_SESSION":
      return {
        ...state,
        isSessionExpired: true,
      };
    case "SET_FULL_NAME":
      if (state.user) {
        newState = {
          ...state,
          user: {
            ...state.user,
            nama: payload,
          },
        };
        storage.set("auth", newState);
        return newState;
      }
      return state;
    case "SET_AUTH":
      newState = {
        ...state,
        ...mapUserObject(payload.authData, payload.userData),
      };
      storage.set("auth", newState);
      return newState;
    case "CLEAR_AUTH":
      storage.set("auth", null);
      return state;
    case "SET_DEFAULT_USER":
      newState = {
        ...state,
        userDefault: state.user,
      };
      storage.set("auth", newState);
      return newState;
    case "SET_USER_TO_DEFAULT":
      newState = {
        ...state,
        user: state.userDefault,
      };
      storage.set("auth", newState);
      return newState;
    default:
      return state;
  }
};

export default authReducer;
